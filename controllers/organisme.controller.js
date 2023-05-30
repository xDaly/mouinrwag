const db = require("../models");
const Stage = db.stage;
const DemandeStage = db.demandestage;
const Organisme = db.organisme;
const User = db.user;
const Etudiant = db.etudiant;
const RespOrganisme = db.responsableorganisme;
const Op = db.Sequelize.Op;

exports.loginOrganismePage = async (req, res) => {
  res.render("loginorganisme");
};

exports.createOrganisme = async (req, res) => {
  try {
    const {
      code_organisme,
      nom_organisme,
      adresse_organisme,
      telephone_organisme,
      email_organisme,
      secteur_activite,
    } = req.body;
    const user = await User.create({
      email: email_organisme,
      cin: code_organisme,
      mot_de_passe: code_organisme,
      role: "organisme",
    });
    const organisme = await Organisme.create({
      code_organisme,
      nom_organisme,
      adresse_organisme,
      telephone_organisme,
      email_organisme,
      secteur_activite,
      userId: user.id,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.dashboard = async (req, res) => {
  if (await req.isAuthenticated()) {
    const user = await req.user;

    const organisme = await Organisme.findOne({
      where: { userId: user.id },
    });
    const stages = await Stage.findAll({
      where: { organismeId: organisme.id },
    });

    res.render("dashboardorganisme", { locals: { organisme, stages: stages } });
  } else {
    res.redirect("/organisme/loginOrganisme");
  }
};

exports.stages = async (req, res) => {
  if (await req.isAuthenticated()) {
    const user = await req.user;
    const organisme = await Organisme.findOne({
      where: { userId: user.id },
    });
    const stages = await Stage.findAll({
      where: { organismeId: organisme.id },
    });
    res.render("listestageorganisme", {
      locals: { organisme, stages: stages },
    });
  } else {
    res.redirect("/organisme/loginOrganisme");
  }
};

exports.addstage = async (req, res) => {
  const stage = {
    code_stage: req.body.code_stage,
    type: req.body.type,
    duree: req.body.duree,
    organismeId: req.body.organismeId,
  };
  try {
    await Stage.create(stage);
    res.status(200).json({
      success: true,
      message: "Stage added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
exports.deletestage = async (req, res) => {
  const { id } = req.params;
  try {
    await Stage.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Stage Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.demandestageorganisme = async (req, res) => {
  if (await req.isAuthenticated()) {
    const user = await req.user;
    const organisme = await Organisme.findOne({
      where: { userId: user.dataValues.id },
    });

    const demandes = await DemandeStage.findAll({
      include: [
        {
          model: db.stage,
          as: "stage",
          where: { organismeId: organisme.dataValues.id },
        },
        {
          model: db.etudiant,
          as: "etudiant",
        },
      ],
    });
    // const stages = await Stage.findAll(
    //   {
    //     include: [
    //       {
    //         model: db.demandestage,
    //         as: "demandes",
    //         include: [
    //           {
    //             model: db.etudiant,
    //             as: "etudiant",
    //           },
    //         ],
    //       },
    //     ],
    //     where: { organismeId: organisme.id },
    //   },
    //   { raw: true }
    // );

    // console.log(demandes[0]);
    // console.log(demandes[0].stage);
    // console.log(demandes[0].etudiant);
    res.render("demandestageorganisme", {
      locals: { demandes: demandes },
    });
  } else {
    res.redirect("/organisme/loginOrganisme");
  }
};

exports.demandeStage = async (req, res) => {
  if (await req.isAuthenticated()) {
    let user;
    const { id } = req.params;

    if ((await req.user.role) == "etudiant") {
      user = await Etudiant.findOne({
        include: ["user"],
        where: {
          userId: await req.user.id,
        },
      });
    }
    try {
      const stage = await Stage.findByPk(id);
      res.render("demandestage", { locals: { stage: stage, user: user } });
    } catch (error) {
      res.render("demandestage", { locals: { stage: {} } });
    }
  } else {
    res.redirect("/auth/loginPage");
  }
};

exports.updatestage = async (req, res) => {
  const { id } = req.body;
  const { etat } = req.body;
  try {
    await DemandeStage.update(
      { etat: etat },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
    });
  }
};

// resp organisme

exports.addResponsableOrganisme = async (req, res) => {
  try {
    

  const user = await User.create({
    cin: req.body.code_responsable,
    email: req.body.email,
    mot_de_passe: req.body.code_responsable,
    role : 'responsableorganisme'
  });
  const resp = await RespOrganisme.create({
    ...req.body,
    userId : user.dataValues.id
  })
  res.json({
    success : true
  })
} catch (error) {
  res.json({
    success : false
  })

}

};
