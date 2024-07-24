'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userGuide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userGuide.init({
    staffID: DataTypes.INTEGER,
    forUserType: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userGuide',
  });
  return userGuide;
};