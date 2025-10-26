
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,

    },
    //username and password field u dont need to add manually passport local mongooses adds it for us we just plugin it in user's Schema
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);