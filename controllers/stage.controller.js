const e = require("express");
const db = require("../models");
const Stage = db.stage;
const Demande = db.demandestage;
const Organisme = db.organisme;
const User = db.user;
const Etudiant = db.etudiant;
const Docs = db.docstage;
const Op = db.Sequelize.Op;

exports.getStagePage = async (req, res) => {
  try {
    const stage = await Stage.findAll({
      include: ["organisme"],
    });
    res.render("displaystageetudiant", {
      locals: {
        stages: stage,
      },
    });
  } catch (error) {
    res.render("displaystageetudiant", {
      locals: { stages: [] },
    });
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

exports.demandes = async (req, res) => {
  if (await req.isAuthenticated()) {
    const user = await req.user;
    const etudiant = await Etudiant.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });
    const demandes = await db.demandestage.findAll({
      include: [
        {
          model: db.stage,
          as: "stage",
          include: ["organisme"],
        },
      ],
      where: {
        etudiantId: etudiant.dataValues.id,
      },
    });

    res.render("historiquedemande", {
      locals: { demandes: demandes },
    });
  } else {
    res.redirect("/auth/loginPage");
  }
};

exports.docs = async (req, res) => {
  if (await req.isAuthenticated()) {
    let stage
    const user = await req.user;
    const etudiant = await Etudiant.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });
    const demande = await Demande.findOne({
      where: {
        etudiantId: etudiant.dataValues.id,
        etat: "accepter",
      },
    });
    if (demande) {  
       stage = await Stage.findByPk(demande.dataValues.stageId, {
        include: ["organisme"],
      });
    }
    else {
      stage : {}
    }

    res.render("etudiantdocstage", {
      locals: { stage: stage },
    });
  } else {
    res.redirect("/auth/loginPage");
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
