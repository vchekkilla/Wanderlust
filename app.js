if(process.env.NODE_ENV != "production"){
 require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

//Requring express routeer routes 
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const dbUrl=process.env.ATLASDB_URL;

main()
.then(()=>{
console.log("Connected to DB");
})
.catch((err)=>{
console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());


app.listen(8080,()=>{
    console.log("App is listening to port 8080");
});

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600
});

store.on("error",()=>{
console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for res.locals variable to render in templates
app.use((req,res,next)=>{
res.locals.success=req.flash("success");//storing success mssg in res.locals.success variable 
res.locals.error=req.flash("error");
res.locals.currUser=req.user; //not able to use req.user in ejs so storing it in res.locals ka currUser vairable
next();
});

/*
//demo user for authentication testing
app.get("/demouser",async(req,res)=>{
let fakeUser=new User({
  email:"student@gmail.com",
  username:"delta-student",
});
let registeredUser=await User.register(fakeUser,"helloworld"); 
//register() method which takes username n password n saves/register in db & also checks if username is unique
res.send(registeredUser);
});
*/

//EXPRESS ROUTER 
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


// Static Info Pages
app.get("/privacy", (req, res) => {
  res.render("includes/privacy");
});

app.get("/terms", (req, res) => {
  res.render("includes/terms");
});

//Middleware for wrong path-bad request 404 error 
app.use((req,res,next)=>{
next(new ExpressError(404,"Page Not Found!"));//This err will be thrown to error handling middleware using next
});

//ERROR HANDLING MIDDLEWARE
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
   res.status(statusCode).render("listings/error.ejs",{message});
});


