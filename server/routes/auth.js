const express = require("express");
const { Register, Login, getUsers } = require("../controllers/auth");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", getUsers);

module.exports = router;
