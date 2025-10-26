const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
title: {
type:String,
required:true,
},
description: String ,
image:{
url:String,
filename:String,
},
price:Number,
location:String,
country:String,
//showing one to many relationship between listing and reviews
reviews:[
{
    type:Schema.Types.ObjectId,
    ref:"Review",
},
],
owner:{
   type:Schema.Types.ObjectId,
    ref:"User" ,
},
geometry:{
type:{
    type:String,
    enum:['Point'],
    required:true
},
coordinates:{
type:[Number],
required:true
}
}
});

//MAKING POST MONGOOSE MIDDLEWARE FOR PARENT LISTING DELETION TO DELETE ITS CHILD REVIEWS 
listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
await Review.deleteMany({_id:{$in:listing.reviews}});
}
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;