const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();

// Set origin for CORS
const corsOptions = {
  origin: "*",
};

// Set up app to use cors, json and urlEncoded body
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import all models
const db = require("./models");

// Initialize Sequelize to fill DB with tables from models (Turn of force: true to not reset DB)
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// Routes
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const messageRouter = require("./routes/message.routes");

// use Routes
app.use(userRouter);
app.use(profileRouter);
app.use(messageRouter);

// Set PORT
const PORT = process.env.PORT || 8080;

// Start server on PORT
app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
