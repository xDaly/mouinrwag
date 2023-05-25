const router = require('express').Router()
const auth = require("../controllers/auth.controller.js");

router.get("/registerPage/:type", auth.registerPage)
router.get("/loginPage", auth.loginPage)
router.post("/register", auth.register)
router.post("/registertuteur", auth.registertuteur)
router.get("/registertype", auth.registertype)
// router.post("/login", auth.login)
router.post("/logout", auth.logout)
// router.post("/login", auth.login)



module.exports = router