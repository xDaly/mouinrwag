const router = require('express').Router()
const image = require("../controllers/image.controller.js");

router.post("/", image.createImage);

module.exports = router