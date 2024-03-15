/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns {import('sequelize').Model}
*/
module.exports = (sequelize, DataTypes) => {
    const Advertising = sequelize.define("Advertising", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "advertising",
        timestamps: false,
    });

    Advertising.associate = function(models) {
        Advertising.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id",
        });
    };

    return Advertising;
};
