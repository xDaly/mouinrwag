module.exports = (sequelize, Sequelize) => {
  const Organisme = sequelize.define("organismes", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code_organisme: {
      type: Sequelize.STRING,
    },
    nom_organisme : {
        type: Sequelize.STRING,
    },
    adresse_organisme: {
      type: Sequelize.TEXT,
    },
    telephone_organisme: {
      type: Sequelize.TEXT,
    },
    email_organisme: {
      type: Sequelize.TEXT,
    },
    secteur_activite: {
      type: Sequelize.TEXT,
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

  return Organisme;
};

// organisme
// responsable
// tuteur
