import mongoose from "mongoose";



const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,dbName:"Ecommerce"}).then((data)=>console.log(`database connected with server ${data.connection.host}`));
}

export default connectDatabase;