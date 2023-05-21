module.exports = (sequelize, Sequelize) => {
  const DemandeStage = sequelize.define("demandestage", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cv_path: {
      type: Sequelize.STRING,
    },
    letter_path: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.STRING,
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

  return DemandeStage;
};

