const router = require("express").Router();
const organisme = require("../controllers/organisme.controller.js");

router.get("/loginOrganisme", organisme.loginOrganismePage);
router.post("/addorganisme", organisme.createOrganisme);
router.get("/dashboardorganisme", organisme.dashboard); 
router.get("/demandestageorganisme", organisme.demandestageorganisme);
router.get("/stages", organisme.stages); 
router.delete("/deletestage/:id", organisme.deletestage);
router.post("/addstage", organisme.addstage);
router.put("/updatestage", organisme.updatestage);



router.post("/addresp" ,organisme.addResponsableOrganisme)
module.exports = router;
