import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import conversationRoute from "./routes/conversations.js";
import messagesRoute from "./routes/messages.js";
import cors from "cors";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION, () => {
  console.log("db connected");
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);

//endpoints
app.get("/", (req, res) => {
  res.json({ message: "index" });
});

app.listen(process.env.PORT || 5100, () => {
  console.log("Backend running");
});
