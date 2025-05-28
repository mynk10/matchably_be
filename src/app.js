const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express(); //making an instance of an express server
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("connection established successfully");
    //listening to port
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });
