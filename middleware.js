const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated())
    {
    req.session.redirectUrl=req.originalUrl;//coz this has the path user tries to access before its interuptted with login page,
    // so after login i wanna make sure user is redirected to the url again hence saving this in req.session

    req.flash("error","you must be logged in to create listing!");
    return res.redirect("/login");
    }
    next();

};

module.exports.saveRedirectUrl=(req,res,next)=>{
//This is coz passport will delete req.session info once it loggs in toh the original url which i saved in redirectUrl req.session
//that will be deleted hence i made this  middleware to save the req.session.redirectUrl in res.locals ka redirectUrl variable
//so this middleware ill call in /login route before the passport.authenticate works n loggs in user
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
//authorization for listing updation,deletion middleware
let {id}=req.params;
let listing=await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
req.flash("error","You are not the owner of this listing");
return res.redirect(`/listings/${id}`);
}
next();
};

//MIDDLEWARE FOR SCHEMA VALIDATIONS VIA JOI(It either throws error or passes control using next to other functions)
//then we pass this middleware in create route app.post,app.put function so request first goes through this middleware to validate
module.exports.validateListing=(req,res,next)=>{
let {error}=listingSchema.validate(req.body);//validating req.body from server side via joi schema named listingSchema
if(error){
   let errMsg=error.details.map((el)=>el.message).join(",");
   throw new ExpressError(400,errMsg);
}
else{
    next();
}
};

module.exports.validateReview=(req,res,next)=>{
let {error}=reviewSchema.validate(req.body);//validating req.body from server side via joi schema named reviewSchema
if(error){
   let errMsg=error.details.map((el)=>el.message).join(",");
   throw new ExpressError(400,errMsg);
}
else{
    next();
}
}

module.exports.isReviewAuthor=async(req,res,next)=>{
//authorization for review deletion middleware
let {id,reviewId}=req.params;
let review=await Review.findById(reviewId);
if(!review.author.equals(res.locals.currUser._id)){
req.flash("error","You are not the author of this review");
return res.redirect(`/listings/${id}`);
}
next();
};