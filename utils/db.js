import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Get MongoDB URI from .env
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI is not defined in your .env file!");
  process.exit(1);
}

// Define a simple schema
const testSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const Test = mongoose.model("Test", testSchema);

const runTest = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB!");

    // Insert a test document
    const doc = await Test.create({
      name: "Geetika Bajpai",
      email: "geetika@example.com",
    });

    console.log("Inserted document:", doc);

    // Fetch all documents
    const allDocs = await Test.find();
    console.log("All documents in Test collection:", allDocs);

    // Close connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
  }
};

runTest();