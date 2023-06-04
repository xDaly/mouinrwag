const router = require("express").Router();
const tuteur = require("../controllers/tuteur.controller.js");

router.get("/listedesstage", tuteur.stages);
router.get("/respstages", tuteur.respstages);
// router.get("/dashboardorganisme", organisme.dashboard); 
// router.get("/demandestageorganisme", organisme.demandestageorganisme);
// router.get("/stages", organisme.stages); 
// router.delete("/deletestage/:id", organisme.deletestage);
// router.post("/addstage", organisme.addstage);
// router.put("/updatestage", organisme.updatestage);


module.exports = router;
