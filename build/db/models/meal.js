'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class meal extends Model {
        static associate(models) {
            meal.belongsTo(models.branch, {
                foreignKey: 'brachId',
                as: 'branch'
            });
        }
    }
    ;
    meal.init({
        brachId: DataTypes.INTEGER,
        mealPlanName: DataTypes.STRING,
        maximumCapacity: DataTypes.NUMERIC,
        price: DataTypes.NUMERIC,
        day: DataTypes.STRING,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'meal',
        timestamps: true
    });
    meal.sync();
    return meal;
};
