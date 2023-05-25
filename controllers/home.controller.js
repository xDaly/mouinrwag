// const db = require("../models");
// const crypt = require("../utils/flow")
// const imagec = require("./image.controller.js");
// const fs = require('fs');
// const Image = db.image
// const Announce = db.announces
// const Anninfo = db.anninfo
// const Op = db.Sequelize.Op;
// const moment = require('moment');
// exports.createAnnounce = async (req, res) => {
//     const token = req.body.token
//     const bctoken = req.body.FingerPrint
//     const bctoken_hash = crypt.crypt(bctoken)
//     try {
//         if (!req.body.title) {
//             res.status(200).json({success: false, message: "Please fill all the fields"})
//         }
//         else {
//             if (bctoken_hash === token) {
//                 const announce = await Announce.create({
//                     title: req.body.title,
//                     name: req.body.name,
//                     description: req.body.description,
//                     address: req.body.address,
//                     location: req.body.location,
//                     price: req.body.price,
//                     category: req.body.category,
//                     sub_category: req.body.sub_category,
//                     end_date: moment().add(10, 'days'),
//                     phone: req.body.phone,
//                     pub_image: req.body.pub_image,
//                     whatsapp: req.body.whatsapp,
//                     FingerPrint: req.body.FingerPrint,
//                     Device_Info: req.body.Device_Info,
//                     User_Agent: req.body.User_Agent,
//                 }).then(async announce => {
//                     const anninfo = await Anninfo.create({
//                         announce_id: announce.id,
//                         pub_image: announce.pub_image,
//                         title: announce.title,
//                         location: announce.location,
//                         price: announce.price,
//                         category: announce.category,
//                         sub_category: announce.sub_category,
//                         end_date: announce.end_date,
//                     }).then(async (anninfo) => {
//                         const extention = await anninfo.pub_image.substring("data:image/".length, anninfo.pub_image.indexOf(";base64"))
//                         const base64Data = await anninfo.pub_image.replace(/^data:image\/\w+;base64,/, "");
//                         const buffer = Buffer.from(base64Data, "base64");
//                         fs.writeFileSync('./productimages/' + anninfo.id + '.' + extention, buffer);
//                         await Anninfo.update({
//                             pub_image: anninfo.id + '.' + extention
//                         }, {
//                             where: {
//                                 announce_id: announce.id
//                             }
//                         })
//                         res.status(200).json({
//                             success: true,
//                             message: "Announce created successfully",
//                             announce_id: anninfo.announce_id
//                         })
//                     })
//                 }).catch(err => {
//                     res.status(200).json({
//                         success: false,
//                         message: err.message
//                     })
//                 })
//             } else {
//                 res.status(200).json({ success: "true" })
//             }
//         }
//     } catch (error) {
//         res.json({ success: error })
//     }
// };

// exports.getAnnounces = async (req, res) => {
//     let title
//     if (req.body.title) {
//         title = { [Op.substring]: req.body.title }
//     }
//     else {
//         title = { [Op.ne]: null }
//     }
//     try {
//         const announce = await Anninfo.findAll({
//             where: {
//                 title: title
//                 // location : {[Op.substring]:req.body.location},
//                 // category : {[Op.substring]:req.body.category},
//                 // sub_category : {[Op.substring]:req.body.sub_category},
//             },
//             order: [
//                 ['price', 'ASC']
//             ],
//         })
//         res.status(200).json({
//             success: true,
//             announce: announce
//         })

//     } catch (error) {
//         res.status(200).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// exports.getAnnounceById = async (req, res) => {
//         const announce = await Announce.findByPk(req.params.id)
//      .then(async (announce) => {
//             const images = await Image.findAll({
//                 where: {
//                     announce_id: announce.id
//                 }
//             })
//             res.status(200).json({
//                 success: true,
//                 announce: announce,
//                 images: images
//             })
//         })
// }

const db = require("../models");
const User = db.user;
const Etudiant = db.etudiant;
const Enseignant = db.enseignant;
const Tuteur = db.tuteur
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
