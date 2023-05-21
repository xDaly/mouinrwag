const router = require('express').Router()
const homeController = require("../controllers/home.controller.js");

router.get("/", homeController.home);
router.get("/dashboard", homeController.dashboard)

// router.post("/search", announce.getAnnounces);
// router.get("/:id", announce.getAnnounceById);
module.exports = router