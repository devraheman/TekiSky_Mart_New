import dotenv from "dotenv";
import express from "express";
import connectDB from "./DataBase/db.js";
import router from "./routes/userRoute.js";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
//Middle Ware for json

app.use(express.json());
// Set the port to be used, defaulting to 3000 if not specified in .env
const port = process.env.PORT || 3000;

const dataBaseUrl = process.env.DATABASE_URL;
connectDB(dataBaseUrl);

app.use("/user", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
