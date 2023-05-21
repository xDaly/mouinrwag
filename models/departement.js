module.exports = (sequelize, Sequelize) => {
  const Departement = sequelize.define("departements", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code_departement: {
      type: Sequelize.STRING,
    },
    nom_departement : {
        type: Sequelize.STRING,
    },
   
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });

  return Departement;
};

