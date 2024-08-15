'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPlan extends Model {
    static associate(models) {
      // define association here
      TravelPlan.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      TravelPlan.hasMany(models.TravelTag, {
        foreignKey: 'travelId'
      });
    }
  }
  TravelPlan.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title cannot be empty' }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Duration must be an integer' },
        min: { args: [1], msg: 'Duration must be at least 1 minute' }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Location cannot be empty' }
      }
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Picture URL cannot be empty' },
        isUrl: { msg: 'Invalid URL format for picture' }
      }
    }
  }, {
    sequelize,
    modelName: 'TravelPlan',
  });
  return TravelPlan;
};