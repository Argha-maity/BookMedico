import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(`${process.env.MONGO_URI}/BookMedico`)
        .then(()=>{console.log("mongodb connected...")})
        .catch((err)=>{console.log("mongodb connection Error: ", err)});
}

export default connectDB;