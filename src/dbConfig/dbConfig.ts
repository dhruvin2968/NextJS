import mongoose from "mongoose";
export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!) //! for telling u dont worry url will always be available
        const connection=mongoose.connection;
//based on the string that gets in connection const 
//u can listen to variety of events
//every event is being listened by the word .on
        connection.on('connected',()=>{   //connected is an event
            console.log("MongoDB connected");
        })
        connection.on('error',(err)=>{
            console.log(err+' is the error. ');
            process.exit();
        })
    }
    catch(error){
        console.log("went wrong");
        console.log(error);
    }
    
}