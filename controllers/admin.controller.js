const { QueryTypes } = require("sequelize");
const passport = require("passport");
const db = require("../models");
const User = db.user;
const Etudiant = db.etudiant;
const Stage = db.stage;
const Organisme = db.organisme;
const Departement = db.departement;
const Enseignant = db.enseignant;
const ResponsableStage = db.responsablesstage;

const LocalStrategy = require("passport-local").Strategy;

const sequelize = db.sequelize;

exports.etudient = async (req, res) => {
  const data = await getEtudiants();
  res.render("etudiant", {
    locals: {
      etudiants: data,
    },
  });
};

exports.addEtudiant = async (req, res) => {
  try {
    const etudiant = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      ville: req.body.ville,
      filiere: req.body.filiere,
      role: "etudiant",
    };

    // const etudiantValues = [
    //   "UUID()",
    //   `"${etudiant.cin}"`,
    //   `"${etudiant.email}"`,
    //   `"${etudiant.mot_de_passe}"`,
    //   `"${etudiant.role}"`,
    // ];
    // const etudiantQuery = `INSERT INTO users (id, cin,  email, mot_de_passe, role, createdAt, updatedAt) VALUES (${etudiantValues.join(
    //   ", "
    // )},NOW(),NOW())`;

    // const etudiantResult = await sequelize.query(etudiantQuery,{
    //   raw: true,
    //   type: QueryTypes.INSERT,
    // });
    const newUser = await User.create({
      cin: etudiant.cin,
      email: etudiant.email,
      mot_de_passe: etudiant.cin,
      role: "etudiant",
    });

    console.log(Etudiant);

    const newEtudiant = await Etudiant.create({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      telephone: etudiant.telephone,
      ville: etudiant.ville,
      filiere: etudiant.filiere,
      userId: newUser.id,
    });
    // await Etudiant.create({

    //   nom	: etudiant.nom,
    //   prenom	 : etudiant.prenom,
    //   email	 : etudiant.email,
    //   telephone	 : etudiant.telephone,
    //   ville	 : etudiant.ville,
    //   userId : etudiantResult.id,
    //   });
    res.json({
      success: true,
    }); 
  } catch (error) {
    console.log(error);
    res.json({ error });
  } 
};

exports.getEtudiant = async (req, res) => {
  try {
    const etudiantQuery = `SELECT * FROM users WHERE role = "etudiant"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });
    res.json({
      success: true,
      data: etudiantResult,
    });
  } catch (error) {
    res.json({ error });
  }
}; 

exports.import = async (req, res) => {
  res.render("importetudient");
};

exports.getEditEtudiant = async (req, res) => {
  const etudiantResult = await getEtudiantById(req.params.id);

  res.render("editetudiant", {
    locals: {
      etudiant: etudiantResult[0],
    },
  });
};

exports.editEtudiant = async (req, res) => {
  try {
    const etudiant = {
      // cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      // email: req.body.email,
      // mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      ville: req.body.ville,
      filiere: req.body.filiere,
      role: "etudiant",
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE etudiants SET  nom = "${etudiant.nom}", prenom = "${etudiant.prenom}",  telephone = "${etudiant.telephone}", ville = "${etudiant.ville}", filiere = "${etudiant.filiere}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const del = await Etudiant.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getEtudiants = async () => { 
  try {
    const etudiantQuery = `SELECT * FROM etudiants `;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });

    const etudiantResults = await Etudiant.findAll({
      include: ["user"],
    });
    return etudiantResults;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getEtudiantById = async (id) => {
  try {
    const etudiantQuery = `SELECT * FROM etudiants WHERE id = "${id}"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });

    return etudiantResult;
  } catch (error) {
    return error;
  }
};

// enseignant

exports.enseignant = async (req, res) => {
  const data = await getEnseignants();
  res.render("enseignant", {
    locals: {
      enseignants: data,
    },
  });
};

exports.addEnseignant = async (req, res) => {
  try {
    // console.log(enseignant);
    //const enseignantValues = [
    // "UUID()",
   //  `"${enseignant.cin}"`,
   //`"${enseignant.nom}"`,
   //  `"${enseignant.prenom}"`,
   //   `"${enseignant.email}"`,
     // `"${enseignant.mot_de_passe}"`,
     // `"${enseignant.telephone}"`,
    //   `"${enseignant.ville}"`,
    // `"${enseignant.specialite}"`,
   //  `"${enseignant.role}"`,
   // ];
    //const enseignantQuery = `INSERT INTO users (id, cin, nom, prenom, email, mot_de_passe, telephone, ville, specialite, role, createdAt, updatedAt) VALUES (${enseignantValues.join(
    //  ", "
    //)},NOW(),NOW())`;
     //const enseignantResult = await sequelize.query(enseignantQuery);

    const newEnseignantLoginData = await User.create({
      cin: req.body.cin,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      role: "enseignant",
    });

    const newEnseignant = await Enseignant.create({
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      ville: req.body.ville,
      telephone: req.body.telephone,
      specialite: req.body.specialite,
      role: "enseignant",
      userId: newEnseignantLoginData.id,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEnseignant = async (req, res) => {
  try {
    const etudiantQuery = `SELECT * FROM  enseignants WHERE role = " enseignant"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });
    res.json({
      success: true,
      data: etudiantResult,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditEnseignant = async (req, res) => {
  const Result = await getEnseignantById(req.params.id);

  res.render("editeenseignant", {
    locals: {
      enseignant: Result[0],
    },
  });
};

exports.editenseignant = async (req, res) => {
  try {
    const update = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      ville: req.body.ville,
      specialite: req.body.specialite,
      role: "enseignant",
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE users SET cin = "${update.cin}", nom = "${update.nom}", prenom = "${update.prenom}", email = "${update.email}", mot_de_passe = "${update.mot_de_passe}", telephone = "${update.telephone}", ville = "${update.ville}", specialite = "${update.specialite}", role = "${update.role}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteEnseignant = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM  enseignants WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getEnseignants = async () => {
  try {
    const enseignantResult = Enseignant.findAll({
      include: ["user"],
    });
    return enseignantResult;
  } catch (error) {
    return error;
  }
};

const getEnseignantById = async (id) => {
  try {
    const Query = `SELECT * FROM  enseignants WHERE id = "${id}"`;
    const Result = await sequelize.query(Query, {
      type: QueryTypes.SELECT,
    });

    return Result;
  } catch (error) {
    return error;
  }
};


// organisme//

exports.organisme = async (req, res) => {
  const data = await getAllOrganismes();
  res.render("organisme", { locals: { organismes: data } });
};

exports.addOrganisme = async (req, res) => {
  console.log(req.body);
  try {
    const organisme = {
      code_organisme: req.body.code_organisme,
      nom_organisme: req.body.nom_organisme,
      adresse_organisme: req.body.adresse_organisme,
      telephone_organisme: req.body.telephone_organisme,
      email_organisme: req.body.email_organisme,
      secteur_activite: req.body.secteur_activite,
    };

    // console.log(organisme);
    const organismeValues = [
      "UUID()",
      `"${organisme.code_organisme}"`,
      `"${organisme.nom_organisme}"`,
      `"${organisme.adresse_organisme}"`,
      `"${organisme.telephone_organisme}"`,
      `"${organisme.email_organisme}"`,
      `"${organisme.secteur_activite}"`,
    ];
    const Query = `INSERT INTO organismes (id, code_organisme, nom_organisme, adresse_organisme, telephone_organisme, email_organisme, secteur_activite, createdAt, updatedAt) VALUES (${organismeValues.join(
      ", "
    )},NOW(),NOW())`;
    const Result = await sequelize.query(Query);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditOrganisme = async (req, res) => {
  const Result = await getOrganismeById(req.params.id);
  res.render("editeorganisme", {
    locals: {
      e: Result[0],
    },
  });
};
exports.editOrganisme = async (req, res) => {
  try {
    const update = {
      code_organisme: req.body.code_organisme,
      nom_organisme: req.body.nom_organisme,
      adresse_organisme: req.body.adresse_organisme,
      telephone_organisme: req.body.telephone_organisme,
      email_organisme: req.body.email_organisme,
      secteur_activite: req.body.secteur_activite,
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE organismes SET code_organisme = "${update.code_organisme}", nom_organisme = "${update.nom_organisme}", adresse_organisme = "${update.adresse_organisme}", telephone_organisme = "${update.telephone_organisme}", email_organisme = "${update.email_organisme}", secteur_activite = "${update.secteur_activite}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteOrganisme = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM organismes WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
};

const getAllOrganismes = async () => {
  try {
    const organismeQuery = `SELECT * FROM organismes`;
    const organismeResult = await sequelize.query(organismeQuery, {
      type: QueryTypes.SELECT,
    });
    return organismeResult;
  } catch (error) {
    return error;
  }
};

const getOrganismeById = async (id) => {
  const Query = `SELECT * FROM organismes WHERE id = "${id}"`;
  const Result = await sequelize.query(Query, {
    type: QueryTypes.SELECT,
  });
  return Result;
};

// stage

exports.stage = async (req, res) => {
  const organismes = await getAllOrganismes();
  const stages = await getAllStages();
  res.render("stage", { locals: { stages: stages, organismes: organismes } });
};

exports.addStage = async (req, res) => {
  try {
    const stage = {
      code_stage: req.body.code_stage,
      type: req.body.type,
      duree: req.body.duree,
      organismeId: req.body.organismeId,
    };

    const stageeValues = [
      "UUID()",
      `"${stage.code_stage}"`,
      `"${stage.type}"`,
      `"${stage.duree}"`,
      `"${stage.organismeId}"`,
    ];
    const Query = `INSERT INTO stages (id, code_stage, type, duree, organismeId, createdAt, updatedAt) VALUES (${stageeValues.join(
      ", "
    )},NOW(),NOW())`;
    const Result = await sequelize.query(Query);
    // console.log(stage);
    //     await Stage.create(stage);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditStage = async (req, res) => {
  const Result = await getStageById(req.params.id);
  res.render("editestage", {
    locals: {
      e: Result[0],
    },
  });
};
exports.editStage = async (req, res) => {
  try {
    const update = {
      code_stage: req.body.code_stage,
      type: req.body.type,
      duree: req.body.duree,
    };
    // update stage to database using raw query
    const updated = await sequelize.query(
      `UPDATE stages SET code_stage = "${update.code_stage}", type = "${update.type}", duree = "${update.duree}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteStage = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM stages WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
};

const getAllStages = async () => {
  try {
    // const stageQuery = `SELECT * FROM stages`;
    // const stageResult = await sequelize.query(stageQuery, {
    //   type: QueryTypes.SELECT,
    // });

    const stageResult = await Stage.findAll({
      include: ["organisme"],
    });

    return stageResult;
  } catch (error) {
    return error;
  }
};

const getStageById = async (id) => {
  const Query = `SELECT * FROM stages WHERE id = "${id}"`;
  const Result = await sequelize.query(Query, {
    type: QueryTypes.SELECT,
  });
  return Result;
};
// departement//
exports.departement = async (req, res) => {
  const data = await getAllDepartements();
  console.log(data);
  res.render("departement", { locals: { departements: data } });
};

exports.addDepartement = async (req, res) => {
  try {
    const departement = {
      code_departement: req.body.code_departement,
      nom_departement: req.body.nom_departement,
    };

    const departementeValues = [
      "UUID()",
      `"${departement.code_departement}"`,
      `"${departement.nom_departement}"`,
    ];
    const Query = `INSERT INTO departements (id, code_departement, nom_departement,  createdAt, updatedAt) VALUES (${departementeValues.join(
      ", "
    )},NOW(),NOW())`;
    const Result = await sequelize.query(Query);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditDepartement = async (req, res) => {
  const Result = await getDepartementById(req.params.id);
  res.render("editedepartement", {
    locals: {
      e: Result[0],
    },
  });
};
exports.editDepartement = async (req, res) => {
  try {
    const update = {
      code_departement: req.body.code_departement,
      nom_departement: req.body.nom_departement,
    };
    // update departement to database using raw query
    const updated = await sequelize.query(
      `UPDATE departements SET code_departement = "${update.code_departement}", nom_departement = "${update.nom_departement}"  WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

exports.deleteDepartement = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM departements WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
};

const getAllDepartements = async () => {
  try {
    const departmentQuery = `SELECT * FROM departements`;
    const departementResult = await sequelize.query(departmentQuery, {
      type: QueryTypes.SELECT,
    });
    return departementResult;
  } catch (error) {
    return error;
  }
};

const getDepartementById = async (id) => {
  const Query = `SELECT * FROM departements WHERE id = "${id}"`;
  const Result = await sequelize.query(Query, {
    type: QueryTypes.SELECT,
  });
  return Result;
};

//responsable_stage//
exports.responsable_stage = async (req, res) => {
  const data = await getAllResponsable_stage();
  console.log("data", data);
  res.render("responsable_stage", { locals: { responsables: data } });
};

exports.addResponsable_stage = async (req, res) => {
  try {
    const responsable_stage = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      specialite: req.body.specialite,
      adresse: req.body.adresse,
    };
    console.log(responsable_stage);
    const responsable_stageeValues = [
      "UUID()",
      `"${responsable_stage.cin}"`,
      `"${responsable_stage.nom}"`,
      `"${responsable_stage.prenom}"`,
      `"${responsable_stage.email}"`,
      `"${responsable_stage.telephone}"`,
      `"${responsable_stage.specialite}"`,
      `"${responsable_stage.adresse}"`,
    ];
    const Query = `INSERT INTO responsablesstages (id, cin, nom, prenom, email, telephone	, specialite, adresse, createdAt, updatedAt) VALUES (${responsable_stageeValues.join(
      ", "
    )}, NOW(), NOW())`;

    const Result = await sequelize.query(Query);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log("add resp err", error);
    res.json({ error });
  }
};

exports.getEditResponsable_stage = async (req, res) => {
  const Result = await getResponsable_stageById(req.params.id);
  res.render("editeresponsable_stage", {
    locals: {
      e: Result[0],
    },
  });
};
exports.editResponsable_stage = async (req, res) => {
  try {
    const update = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      specialite: req.body.specialite,
      adresse: req.body.adresse,
    };

    console.log(update);
    // update responsable de stage to database using raw query
    const updated = await sequelize.query(
      `UPDATE responsablesstages SET cin = "${update.cin}", nom = "${update.nom}",prenom = "${update.prenom}",
      email = "${update.email}",telephone	 = "${update.telephone}",specialite = "${update.specialite}",
      adresse = "${update.adresse}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteResponsable_stage = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM responsablesstages WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
};

const getAllResponsable_stage = async () => {
  try {
    const responsable_stageQuery = `SELECT * FROM responsablesstages`;
    const responsable_stageResult = await sequelize.query(
      responsable_stageQuery,
      {
        type: QueryTypes.SELECT,
      }
    );
    return responsable_stageResult;
  } catch (error) {
    return error;
  }
};

const getResponsable_stageById = async (id) => {
  const Query = `SELECT * FROM responsablesstages WHERE id = "${id}"`;
  const Result = await sequelize.query(Query, {
    type: QueryTypes.SELECT,
  });
  return Result;
};

// statisitque //
exports.getStats = async (req, res) => {
  const etudiants = await sequelize.query(
    `SELECT COUNT(*) AS count FROM etudiants`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const responsablesstages = await sequelize.query(
    `SELECT COUNT(*) AS count FROM responsablesstages`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const organismes = await sequelize.query(
    `SELECT COUNT(*) AS count FROM organismes`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const stages = await sequelize.query(`SELECT COUNT(*) AS count FROM stages`, {
    type: QueryTypes.SELECT,
  });
  const departements = await sequelize.query(
    `SELECT COUNT(*) AS count FROM departements`,
    {
      type: QueryTypes.SELECT,
    }
  );

  const users = await sequelize.query(`SELECT COUNT(*) AS count FROM users  `, {
    type: QueryTypes.SELECT,
  });

  res.render("stat", {
    locals: {
      etudiants: etudiants[0].count,
      responsablesstages: responsablesstages[0].count,
      organismes: organismes[0].count,
      stages: stages[0].count,
      departements: departements[0].count,
      users: users[0].count,
    },
  });
};