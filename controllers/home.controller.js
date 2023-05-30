const db = require("../models");
const User = db.user;
const Etudiant = db.etudiant;
const Enseignant = db.enseignant;
const RespOrganisme = db.responsableorganisme;
const Tuteur = db.tuteur;
exports.home = async (req, res) => {
  res.render("home", {
    locals: {
      title: "ES6 ",
    },
    partials: {
      nav: "views/includes/nav.html",
    },
  });
};

exports.dashboard = async (req, res) => {
  try {
    // console.log('exports.dashboard',await req.isAuthenticated());

    // user.dataValues
    // if (user.role === "etudiant") {
    // }
    if (await req.isAuthenticated()) {
      let user = await req.user;
      // let username;

      if (user.dataValues.role == "admin") {
        user.dataValues.username = "admin";
      }
      if (user.dataValues.role == "responsableorganisme") {
        user = await RespOrganisme.findOne({
          where: {
            userId: user.dataValues.id,
          },
        });
        user.dataValues.role = await req.user.dataValues.role;
        user.dataValues.username = user.dataValues.nom;
      }
      if (user.dataValues.role == "enseignant") {
        user = await Enseignant.findOne({
          where: {
            userId: user.dataValues.id,
          },
        });
        user.dataValues.role = await req.user.dataValues.role;
        user.dataValues.username = user.dataValues.nom;
      }
      if (user.dataValues.role == "etudiant") {
        user = await Etudiant.findOne({
          where: {
            userId: user.dataValues.id,
          },
        });
        user.dataValues.role = await req.user.dataValues.role;
        user.dataValues.username = user.dataValues.nom;
      }
      if (user.dataValues.role == "tuteur") {
        user = await Tuteur.findOne({
          where: {
            userId: user.dataValues.id,
          },
        });
        user.dataValues.role = await req.user.dataValues.role;
        user.dataValues.username = user.dataValues.nom;
      }

      res.render("dashboard", {
        locals: {
          title: "ES6 ",
          userData: user.dataValues,
        },
        partials: {
          nav: "views/includes/nav.html",
        },
      });
    } else {
      res
        .writeHead(301, {
          Location: `/auth/loginPage`,
        })
        .end();
    }
  } catch (error) {
    console.log("error dashboard", error);
  }
};
