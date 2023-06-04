const e = require("express");
const db = require("../models");
const Stage = db.stage;
const Demande = db.demandestage;
const Organisme = db.organisme;
const Task = db.task;
const User = db.user;
const Etudiant = db.etudiant;
const Docs = db.docstage;
const Remarque = db.remarque

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
    let stage;
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
      res.render("etudiantdocstage", {
        locals: { stage: stage },
      });
    } else {
      res.render("etudiantdocstage", {
        locals: { stage: null },
      });
    }
  } else {
    res.redirect("/auth/loginPage");
  }
};

exports.taches = async (req, res) => {
  const docs = await Docs.findOne({
    where: {
      stageId: req.params.id,
    },
  });

  const tasks = await Task.findAll({
    where: {
      stageId: req.params.id,
    },
  });

  console.log(docs);
  res.render("stage_tasks_resp", {
    locals: {
      docs: docs,
      tasks: tasks,
      stageId: req.params.id,
    },
  });
};

exports.tasksetudiant = async (req, res) => {
  if (await req.isAuthenticated()) {
    let stage;
    let tasks = []
    const user = await req.user;
    const etudiant = await Etudiant.findOne({
      include: {
        required: false,
        model: db.demandestage,
        as: "demandes",
        where: {
          etat: "accepter",
        },
      },
      where: {
        userId: user.dataValues.id,
      },
    });
    if (etudiant.demandes.length > 0) {
      tasks = await Task.findAll({
        where: {
          stageId: etudiant?.dataValues?.demandes[0]?.dataValues?.stageId,
        },
      });
    }



    res.render("stage_tasks_etudiant", {
      locals: { tasks: tasks },
    });
  } else {
    res.redirect("/auth/loginPage");
  }
};

exports.addTask = async (req, res) => {
  // console.log(req.body);
  try {
    await Task.create(req.body);
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

exports.update = async (req, res) => {
  try {
    await Task.update(
      {
        etat: req.body.etat,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

exports.remarque = async (req, res) => {
  const rs = await Remarque.findAll({
    stageId: req.params.id
  })
  res.render("remarque", {
    locals: {
      stageId: req.params.id,
      rs: rs
    }
  })
}

exports.addremarque = async (req, res) => {
  try {
    await Remarque.create({
      remarque: req.body.remarque,
      stageId: req.body.id
    })
    res.json({
      success: true
    })
  } catch (error) {
    res.json({
      error: error,
      success: true
    })
  }

}