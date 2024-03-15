/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns {import('sequelize').Model}
*/
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "category",
        timestamps: false,
    });

    Category.associate = function(models){
        Category.hasMany(models.Advertising, {
            as: "advertisings",
            foreignKey: "category_id",
        });
    };

    return Category;
};
