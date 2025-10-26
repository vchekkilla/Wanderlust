function wrapAsync(fn){
return function(req,res,next){
    fn(req,res,next).catch(next);//here we will pass our async callbacks n execute n if any error occurs in them 
    //then it is passed to next via catch n it's passed in error handling middleware
}
}
module.exports=wrapAsync;