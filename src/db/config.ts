import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.DATABASE_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Your Application connected successfully");
    });
    connection.on("error", () => {
      console.log("Na valla..!");
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
