const db = require("../models");
const Device = db.device
const Op = db.Sequelize.Op;
exports.Visitors = async (req, res) => {
    // const Users = await Device.count({}) + 234567
    // res.json({ Visitors: Users })
    console.log(req);
};
