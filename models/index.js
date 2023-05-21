const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.warn("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.organisme = require("./organisme.model.js")(sequelize, Sequelize);
db.etudiant = require("./etudiant.model.js")(sequelize, Sequelize);
db.stage = require("./stage.model.js")(sequelize, Sequelize);
db.departement = require("./departement.js")(sequelize, Sequelize);
db.responsablesstage = require("./responsable_stage.js")(sequelize, Sequelize);
db.enseignant = require("./enseignant.model.js")(sequelize, Sequelize);
db.demandestage = require("./demande_stage.model.js")(sequelize, Sequelize);
db.docstage = require("./doc_stage.model.js")(sequelize, Sequelize);

//relations
// db.organisme.hasMany(db.stage, { as: "stages" });
// db.user.hasOne(db.etudiant, { as: "etudiant" });
db.etudiant.belongsTo(db.user, { as: "user"  });
db.organisme.belongsTo(db.user, { as: "user"  });
db.enseignant.belongsTo(db.user, { as: "user"  });
db.stage.belongsTo(db.organisme, { as: "organisme"  });

// db.user.hasOne(db.enseignant, { as: "enseignant" });

db.etudiant.belongsTo(db.departement, {
  as: "departement",
  optional: true,
});
db.departement.hasMany(db.etudiant, {
  as: "etudiant",
  optional: true,
});
// db.etudiant.belongsTo(db.departement, { as: "etudiant",  });


db.enseignant.belongsTo(db.departement, {
  as: "departement",
  optional: true,
});
db.departement.hasMany(db.enseignant, {
  as: "enseignants",
  optional: true,
});

db.stage.hasMany(db.demandestage, {as : "demandes" });
db.demandestage.belongsTo(db.stage, {as : "stage" });
db.etudiant.hasMany(db.demandestage, {as : "demandes" }); 
db.demandestage.belongsTo(db.etudiant, {as : "etudiant" });

db.stage.hasOne(db.docstage, {as : "stage" });

module.exports = db;
  