const router = require('express').Router()
const user = require("../controllers/user.controller.js");

router.get("/", user.getAllUser)
router.get("/:id", user.getUser)
router.get("/verify/:id", user.verifyUser)
module.exports = router