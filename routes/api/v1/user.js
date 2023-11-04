const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/UsersController");

router.post("/create-session", usersController.createSession);
router.post("/create-user", usersController.createUser);

module.exports = router;