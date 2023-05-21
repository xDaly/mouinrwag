module.exports = (sequelize, Sequelize) => {
  const Responsablestage = sequelize.define("responsablesstages", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cin: {
      type: Sequelize.STRING,
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.TEXT,
    },

    telephone: {
      type: Sequelize.TEXT,
    },
    specialite: {
      type: Sequelize.TEXT,
    },
    adresse: {
      type: Sequelize.TEXT,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  return Responsablestage;
};
