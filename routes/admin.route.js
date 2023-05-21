const router = require("express").Router();
const admin = require("../controllers/admin.controller.js");

router.get("/etudiant", admin.etudient);
router.post("/addEtudiant", admin.addEtudiant);
router.get("/import", admin.import);
router.get("/getEtudiant", admin.getEtudiant);
router.get("/editetudiant/:id", admin.getEditEtudiant);
router.post("/updateetudient/:id", admin.editEtudiant);
router.delete("/deleteetudient/:id", admin.deleteEtudiant);


router.get("/enseignant", admin.enseignant);
router.post("/addenseignant", admin.addEnseignant);
// router.get("/getEtudiant", admin.getEtudiant);
router.get("/editenseignant/:id", admin.getEditEnseignant);
router.post("/updateenseignant/:id", admin.editEnseignant);
router.delete("/deleteenseignant/:id", admin.deleteEnseignant);


router.get("/organisme", admin.organisme);
router.post("/addOrganisme", admin.addOrganisme);
router.get("/editorganisme/:id", admin.getEditOrganisme);
// router.get("/editenseignant/:id", admin.getEditEnseignant);
router.post("/updateorganisme/:id", admin.editOrganisme);
router.delete("/deleteOrganisme/:id", admin.deleteOrganisme);



router.get("/stage", admin.stage);
router.post("/addStage", admin.addStage);
router.get("/editstage/:id", admin.getEditStage);
// router.get("/editestage/:id", admin.getStage);
 router.post("/updatestage/:id", admin.editStage);
 router.delete("/deleteStage/:id", admin.deleteStage);


 router.get("/departement", admin.departement);
 router.post("/addDepartement", admin.addDepartement);
 router.get("/editdepartement/:id", admin.getEditDepartement);
 //router.get("/editedepartement/:id", admin.getDepartement);
 router.post("/updatedepartement/:id", admin.editDepartement);
 router.delete("/deleteDepartement/:id", admin.deleteDepartement);


 router.get("/responsable_stage", admin.responsable_stage);
 router.post("/addResponsable_stage", admin.addResponsable_stage);
 router.get("/editresponsable_stage/:id", admin.getEditResponsable_stage);
 //router.get("/editeresponsable_stage/:id", admin.getResponsable_stage);
 router.post("/updateresponsable_stage/:id", admin.editResponsable_stage);
 router.delete("/deleteresponsable_stage/:id", admin.deleteResponsable_stage);


 router.get("/stats",admin.getStats)


module.exports = router;
