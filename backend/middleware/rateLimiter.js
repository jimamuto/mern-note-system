
const ratelimit=require('../config/upstash');

const ratelimiter=async(req,res,next)=>{
    try{
        const {success}= await ratelimit.limit("my-limit_key");
        if(!success){
            return res.status(429).json({message:"Too many requests, please try again later"});
        }
        return next();
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
   
}

module.exports = ratelimiter;