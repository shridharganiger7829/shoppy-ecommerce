import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
         user:process.env.EMAIL_USER,
         pass:process.env.EMAIL_PASS
    }
});


const SendEmail=async (to,subject,text)=>{
    try {
        const info=await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            text
        })

        console.log("Email Sent successfully: ",info);

        return info;


    } catch (error) {
        console.error("Error sending email: ",error)
        throw error;
    }
}

export default SendEmail;