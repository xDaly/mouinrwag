const db = require("../models");
const Stage = db.stage;
const DemandeStage = db.demandestage;
const Organisme = db.organisme;
const User = db.user;
const Tuteur = db.tuteur;
const Etudiant = db.etudiant;
const Op = db.Sequelize.Op;

exports.loginrespstage = async (req, res) => {
  res.render("responsable_stage");
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

exports.stages = async (req, res) => {
  if (await req.isAuthenticated()) {
    const user = await req.user;
    const tuteur = await Tuteur.findOne({
      where: {
        userId: user.id,
      },
    });

    const stages = await Stage.findAll({
      where: { organismeId: tuteur.organismeId },
    });

    res.render("tuteurliststage", { locals: {  stages: stages } });
  } else {
    res.redirect("/auth/loginPage");
  }
};

// exports.stages = async (req, res) => {
//   if (await req.isAuthenticated()) {
//     const user = await req.user;
//     const organisme = await Organisme.findOne({
//       where: { userId: user.id },
//     });
//     const stages = await Stage.findAll({
//       where: { organismeId: organisme.id },
//     });
//     res.render("listestageorganisme", {
//       locals: { organisme, stages: stages },
//     });
//   } else {
//     res.redirect("/organisme/loginOrganisme");
//   }
// };

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

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, image, address, phone, firstname, lastname } =
    req.body;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({
      message: "User not found with id " + id,
    });
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = crypt.encrypt(password);
  }
  if (image) {
    user.image = image;
  }
  if (address) {
    user.address = address;
  }
  if (phone) {
    user.phone = phone;
  }
  if (firstname) {
    user.firstname = firstname;
  }
  if (lastname) {
    user.lastname = lastname;
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "User updated successfully!",
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with id " + id,
      });
    }
    if (user) {
      user.status = "Deleted";
      await user.save();
      res.status(200).json({
        success: true,
        message: "User Deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found with id " + id,
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with id " + id,
      });
    }
    if (user.verified !== "Verified") {
      user.verified = "Verified";
      await user.save();
      res.status(200).json({
        success: true,
        message: "User verified successfully!",
      });
    }
    if (user.verified == "Verified") {
      res.status(200).json({
        success: true,
        message: "User Already verified !",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.banUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with id " + id,
      });
    }
    if (user) {
      user.status = "Banned";
      await user.save();
      res.status(200).json({
        success: true,
        message: "User Banned successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with id " + id,
      });
    }
    if (user) {
      user.status = "Active";
      await user.save();
      res.status(200).json({
        success: true,
        message: "User Activated successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.suspendUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with id " + id,
      });
    }
    if (user) {
      user.status = "Suspended";
      await user.save();
      res.status(200).json({
        success: true,
        message: "User Suspended successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
