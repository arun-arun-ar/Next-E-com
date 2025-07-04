import mongoose from "mongoose";

//defining object i.e. connection string
interface ConnectionObject {
  isConnected?: number;
}

//creating an object to track database connection state
const connection: ConnectionObject = {};

//function for mobgodb connection
export async function connectDatabase(): Promise<void> {
  //if databse alredy connected, return immediately
  if (connection.isConnected) {
    return;
  }
  // ensure mongodb connection is defined in environment variable
  if (!process.env.MONGODB_URL) {
    throw new Error("Missing mongodb url inside .env");
  }

  try {
    //connect to mongodb
    const database = await mongoose.connect(process.env.MONGODB_URL);
    // Store the readyState (1 = connected) in the connection object
    connection.isConnected = database.connection.readyState;
    console.log("Database connection succesfully");
  } catch (error) {
    console.error("database connection failed!", error);
  }
}
