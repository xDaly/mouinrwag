module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return Admin;
};