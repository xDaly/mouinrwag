const router = require("express").Router();
const stage = require("../controllers/stage.controller.js");



 
router.get("/stages", stage.getStagePage);
router.get("/demandes",stage.demandes) 
router.get("/docs",stage.docs) 
router.get("/demande/:id", stage.demandeStage);
router.get("/tasksetudiant", stage.tasksetudiant)







module.exports = router;
