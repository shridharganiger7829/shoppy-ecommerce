import Connect_DB from "./db/index.js";
import dotenv from 'dotenv';
import dns from "dns"
import app from "./app.js";

dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config({path:'./.env'});

Connect_DB()
  .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on the port of ${process.env.PORT}`)
    })
  })
  .catch((err)=>{
     console.error("Error during server listening on the port= ",err)
  })
      

