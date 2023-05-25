// const db = require("../models");
// const crypt = require("../utils/crypt")
// const User = db.user
// const Shop = db.shop
// const Admin = db.admin
// const Op  = db.Sequelize.Op;
// exports.createUser = async (req, res) => {

//   // await User.findAll({
//   //      where : {
//   //       username : {[Op.substring]:'efef'}
//   //      }
//   //  }).then(resp => {
//   //   res.send({resp})
//   //  })
//     const user = {
//         CIN: req.body.CIN,
//         password: req.body.password,
//         phone: req.body.phone
//     };
//     if (!user.CIN) {
//         res.json({
//             success: false,
//             message: "Please Provide CIN"
//         })
//     }
//     if (!user.password) {
//         res.json({
//             success: false,
//             message: "Please Provide Password"
//         })
//     }
//     try {
//         User.findOne({ where: { username: user.username } }).then(async data => {
//             if (data) {
//                 res.status(400).json({
//                     success: false,
//                     message: "Username Already in Use",
//                 })
//             } else {
//                 const password = await crypt.crypt(user.password)
//                 user.password = password
//                 console.log(user);
//                 await User.create(user).then(data => {
//                     res.status(200).json({
//                         success: true,
//                         message: `Account ${data.username} Created Successfuly `
//                     })
//                 }).catch(err => {
//                     res.status(500).json({
//                         success: false,
//                         message: "Some error occurred while creating user",
//                         error: err
//                     })
//                 })
//             }
//         })
//     } catch (error) {
//         res.json({ error })
//     }

// };
//  exports.login = async (req, res) => {
//     const user = {
//         username: req.body.username,
//         password: req.body.password
//     };
//     if (!user.username) {
//         res.json({
//             success: false,
//             message: "Please Provide Username"
//         })
//     }
//     if (!user.password) {
//         res.json({
//             success: false,
//             message: "Please Provide Password"
//         })
//     }
//     try {
//         User.findOne({ where: { username: user.username } }).then(data => {
//             if (data) {
//                 const password = crypt.decrypt(data.password)
//                 if (password === user.password) {
//                     res.status(200).json({
//                         success: true,
//                         message: "Login Successfuly",
//                         data: data
//                     })
//                 } else {
//                     res.status(400).json({
//                         success: false,
//                         message: "Password is incorrect"
//                     })
//                 }
//             } else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Username is incorrect"
//                 })
//             }
//         })
//     } catch (error) {
//         res.json({ error })
//     }
// }

const { QueryTypes } = require("sequelize");
const passport = require("passport");
const db = require("../models");
const User = db.user;
const Tuteur = db.tuteur;
const LocalStrategy = require("passport-local").Strategy;

const sequelize = db.sequelize;

exports.loginPage = async (req, res) => {
  if (!(await req.isAuthenticated())) {
    res.render("login");
  } else {
    res
      .writeHead(301, {
        Location: "/dashboard",
      })
      .end();
  }
};

exports.registertype = (req, res) => {
  res.render("registertype");
};
exports.registerPage = async (req, res) => {
  // res.writeHead(301, {
  //   Location: "/auth/loginPage"
  // }).end();

  const organismes = await sequelize.query(`SELECT * FROM organismes`, {
    type: QueryTypes.SELECT,
  });
  res.render("register", {
    locals: {
      selected: req.params.type,
      organismes: organismes,
    },
  });
};

// register lezemha tetsalla7 tna7i tuteur w t7ot User
exports.register = async (req, res) => {
  try {
    const tuteur = req.body;
    const existant = await Tuteur.findOne({ where: { email: tuteur.email } });
    if (existant) {
      res.status(400).json({
        success: false,
        message: "Email deja existant",
      });
    } else {
      const newTuteur = await Tuteur.create({
        email: tuteur.email,
        fonctionnalite: tuteur.fonctionnalite,
        mot_de_passe: tuteur.motpasse,
        addresse: tuteur.addresse,
        nom_et_prenom: tuteur.nom,
        telephone: tuteur.num,
        secteur_activite: tuteur.secteur,
      });
      res.status(200).json({
        success: true,
        message: "Tuteur ajouté avec succés",
        data: newTuteur,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'ajout du tuteur",
    });
  }
};

exports.registertuteur = async (req, res) => {
  try {
  const user = await User.create({
    cin: req.body.code_tuteur,
    email: req.body.code_tuteur,
    mot_de_passe: req.body.code_tuteur,
    role: "tuteur",
  });
  const tuteur = await Tuteur.create({
    code_tuteur: req.body.code_tuteur,
    fonction: req.body.fonction,
    nom: req.body.nom,
    userId : user.id,
    organismeId: req.body.organismeID,
  });

  res.status(200).json({
    success: true,
    message: "Tuteur ajouté avec succés",
  });
} catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
}
};

// exports.login = async (req, res) => {
//   console.log('req');
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   });
// };

// app.post('/logout', function(req, res, next){
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

exports.logout = async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.json({
        success: true,
      });
    });
  } catch (error) {}
};
