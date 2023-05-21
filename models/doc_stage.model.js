module.exports = (sequelize, Sequelize) => {
  const DocStage = sequelize.define("docstage", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rapport_path: {
      type: Sequelize.STRING,
    },
    journal_path: {
      type: Sequelize.STRING,
    },
    cdc_path: {
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

  return DocStage;
};

