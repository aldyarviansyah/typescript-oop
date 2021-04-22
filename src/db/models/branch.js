'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class branch extends Model {
    static associate(models) {
      branch.hasMany(models.meal, {
        foreignKey: 'brachId',
        sourceKey: 'id',
        as: 'meals'
      });
  
    }
  };
  branch.init({
    name: DataTypes.STRING,
    latitude: DataTypes.NUMERIC,
    longitude: DataTypes.NUMERIC,
    openingHours: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'branch',
    timestamps: true
  });
  branch.sync();
  return branch;
};