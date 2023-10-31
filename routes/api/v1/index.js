const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/users", require("./users"));

module.exports = router;