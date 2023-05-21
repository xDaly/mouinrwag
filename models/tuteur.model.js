module.exports = (sequelize, Sequelize) => {
    const Tuteur = sequelize.define("tuteurs", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nom_et_prenom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        telephone: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        addresse: {
            type: Sequelize.TEXT,
            allowNull: false 
        },
        fonctionnalite: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        secteur_activite: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        mot_de_passe: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });

    return Tuteur;
};


// organisme 
// responsable
// tuteur 