import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import pkg from "colors";
const {Color} = pkg;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
 
export default connectDB