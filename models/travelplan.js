'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TravelPlan.init({
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelPlan',
  });
  return TravelPlan;
};