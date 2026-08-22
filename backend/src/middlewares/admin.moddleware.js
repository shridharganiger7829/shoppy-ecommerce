const admin=async (req , res , next)=>{
    try {
        if(req.user.role=== "admin"){
            next();
        }
    } catch (error) {
         console.log("Error during admin access is : ",error);
         throw error;
    }
}

export default admin;
