const router = require("express").Router();
const respstage = require("../controllers/respstage.controller.js");

router.get("/loginrespstage", respstage.loginrespstage);
// router.post("/addorganisme", organisme.createOrganisme);
// router.get("/dashboardorganisme", organisme.dashboard); 
// router.get("/demandestageorganisme", organisme.demandestageorganisme);
// router.get("/stages", organisme.stages); 
// router.delete("/deletestage/:id", organisme.deletestage);
// router.post("/addstage", organisme.addstage);
// router.put("/updatestage", organisme.updatestage);


module.exports = router;
