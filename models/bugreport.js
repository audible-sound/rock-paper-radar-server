'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BugReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BugReport.init({
    userID: DataTypes.INTEGER,
    bugContent: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    bugState: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BugReport',
  });
  return BugReport;
};