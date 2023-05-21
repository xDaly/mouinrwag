module.exports = (sequelize, Sequelize) => {
    const Blocked = sequelize.define("blocked", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        FingerPrint: {
            type: Sequelize.STRING,
        }
    });

    return Blocked;
};