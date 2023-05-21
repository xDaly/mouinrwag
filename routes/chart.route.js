const router = require('express').Router()
const chart = require("../controllers/chart.controller.js");


router.get("/", chart.Visitors)


module.exports = router