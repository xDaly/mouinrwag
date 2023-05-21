module.exports = (sequelize, Sequelize) => {
  const Stage = sequelize.define("stages", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code_stage: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    duree: {
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

  return Stage;
};

