import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default connectDB;
