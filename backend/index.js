import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import bodyParser from "body-parser";
import {
  compilethecode,
  fullstat_controller,
  sample_question,
} from "./controllers/compiler.controller.js";

dotenv.config();
//express
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
     origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN stack Project");
});
const PORT = process.env.PORT || 8080;

// Auth routes
app.use("/api/user", router);

// Endpoint to fetch question and test cases
app.get("/api/question", sample_question);

// Route to compile and run code
app.post("/api/user/compilecode", compilethecode);

// Route to get full statistics of the compiler
app.get("/fullStat", fullstat_controller);

// Mongoose connection
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// No need to flush temporary files as `compilex` is no longer used
