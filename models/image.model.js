module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        announce_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: false
        },
        extention: {
            type: Sequelize.TEXT,
        },
        
    });
    return Image;
};