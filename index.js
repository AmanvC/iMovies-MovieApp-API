const express = require('express');
const dotenv = require("dotenv").config();
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-strategy");
const db = require("./config/mongoose");
const cors = require("cors");
const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));

const server = app.listen(port, (err) => {
	if (err) {
    console.log(`Error in starting the express server: ${err}`);
    return;
	}
	console.log(`Server is running on port: ${port}`);
})

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
})

io.on('connection', (socket) => {
  // socket.on('userSetup', (userData) => {
  //   console.log(userData);
  // })
})