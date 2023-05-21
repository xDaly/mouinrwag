module.exports = (sequelize, Sequelize) => {
    const Announce = sequelize.define("announces", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        phone: {
            type: Sequelize.INTEGER
        },
        pub_image: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        name: {
            type: Sequelize.TEXT,
        },
        title: {
            type: Sequelize.TEXT,
        },
        description: {
            type: Sequelize.TEXT,
        },
        address: {
            type: Sequelize.TEXT,
        },
        location: {
            type: Sequelize.TEXT,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        category: {
            type: Sequelize.TEXT,
        },
        sub_category: {
            type: Sequelize.TEXT,
        },
        whatsapp: {
            type: Sequelize.BOOLEAN,
        },
        end_date: {
            type: Sequelize.DATEONLY,
        },
        FingerPrint: {
            type: Sequelize.STRING,
        },
        Device_Info: {
            type: Sequelize.TEXT,
        },
        User_Agent: {
            type: Sequelize.TEXT,
        },
        // status: {
        //     type: Sequelize.ENUM,
        //     values: ["pending", "approved", "rejected"],
        //     defaultValue: "approved",
        // },
        // user_id: {
        //     type: Sequelize.UUID,
        // },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Announce;
};