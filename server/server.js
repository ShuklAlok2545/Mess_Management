import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("pass:", process.env.EMAIL_PASS);

app.use(express.json());

// app.get('/',(req,res)=>{
//   //console.log(req.body);
//   res.send('hi')
// })

// routes
app.use("/api/auth", authRoutes);
// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});