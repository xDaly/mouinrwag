module.exports = (sequelize, Sequelize) => {
    const Tuteur = sequelize.define("tuteurs", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        code_tuteur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nom: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fonction: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });

    return Tuteur;
};


// organisme 
// responsable
// tuteur 