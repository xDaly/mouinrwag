module.exports = (sequelize, Sequelize) => {
  const Enseignant = sequelize.define("enseignant", {
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
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    ville: {
      type: Sequelize.STRING,
    },
    specialite: {
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

  return Enseignant;
};

// organisme
// responsable
// tuteur