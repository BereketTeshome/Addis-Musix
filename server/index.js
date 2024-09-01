require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/Connect");
const authRouter = require("./routes/auth");
const songRouter = require("./routes/songs");
const favoriteRouter = require("./routes/favRoute");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user", authRouter);
app.use("/api/song", songRouter);
app.use("/api/song", favoriteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  const port = 3001;
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
