'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userReport.belongsTo(models.User, {
        foreignKey: 'userID'
      })
    }
  }
  userReport.init({
    userID: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID cannot be null',
          args: true},
        notEmpty: {
          msg: 'User ID cannot be empty',
          args: true
        }
      }
    },
    reportState: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Report state cannot be null',
          args: true},
        notEmpty: {
          msg: 'Report state cannot be empty',
          args: true
        }
      }
    },
    reportContent: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Report content cannot be null',
          args: true},
        notEmpty: {
          msg: 'Report content cannot be empty',
          args: true
        }
      }
    }
  }, {
    sequelize,
    modelName: 'userReport',
  });
  return userReport;
};