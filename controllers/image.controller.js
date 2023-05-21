const db = require("../models");

const fs = require('fs');
const Image = db.image
const Op = db.Sequelize.Op;

exports.createImage = async (req, res) => {
  let imagesarray = []
  imagesarray = req.body.images
  try {
    imagesarray.map(async (element) => {
      const extention = await element.substring("data:image/".length, element.indexOf(";base64"))
      const base64Data = await element.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const img = await Image.create({
        announce_id: req.body.announce_id,
        extention : extention
      }).then( async img => {
        fs.writeFileSync('./productimages/' + img.id + '.' + extention, buffer);
      })
    });
  } catch (error) {  
    console.log(error)
  }
res.status(200).send({
  message: "Announce Image is created"
})
}





