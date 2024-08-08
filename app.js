import dotenv from "dotenv";
import express from "express";
import connectDB from "./DataBase/db.js";
import router from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

const dataBaseUrl = process.env.DATABASE_URL;
connectDB(dataBaseUrl);

app.use("/user", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
