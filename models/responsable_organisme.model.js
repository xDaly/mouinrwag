module.exports = (sequelize, Sequelize) => {
  const Responsableorganisme = sequelize.define("responsablesorganisme", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code_responsable: {
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
    fonction: {
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

  return Responsableorganisme;
};
