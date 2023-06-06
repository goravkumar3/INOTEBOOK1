const JWT=require('jsonwebtoken')
const JWT_Secert="GoravisSecert";


const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try {
    const data=JWT.verify(token,JWT_Secert)
    req.user=data.user;
next()
}catch (error) {
    res.status(401).send({error:"Please authenticate using valid token"})
}
}

module.exports=fetchUser