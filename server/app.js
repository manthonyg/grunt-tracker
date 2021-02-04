// app.js

const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

// routes
const marines = require("./routes/api/marines");
const squads = require("./routes/api/squads");
const path = require("path");

//define global vars
const app = express();
const port = process.env.PORT || 8082;

// Connect Database
connectDB();

app.use(express.static(path.join(__dirname, "build")));

// cors
app.use(cors({ origin: true, credentials: true }));

// init middleware
app.use(express.json({ extended: false }));

// declare routes
app.use("/api/marines", marines);
app.use("/api/squads", squads);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));

// app.js

// const express = require("express");
// const connectDB = require("./config/db");

// const app = express();

// // Connect Database
// connectDB();

// app.get("/", (req, res) => res.send("Hello world!"));

// const port = process.env.PORT || 8082;

// app.listen(port, () => console.log(`Server running on port ${port}`));
