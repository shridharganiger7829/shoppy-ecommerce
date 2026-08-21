import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const Connect_DB=async()=>{
      try {
         const ConnectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
         console.log(`MongoDB is connected and DB is hosted in ${ConnectionInstance.connection.host}`)
      } catch (error) {
          console.error("Error during mongodb connection is= ",error);
          process.exit(1)
      }
}

export default Connect_DB;