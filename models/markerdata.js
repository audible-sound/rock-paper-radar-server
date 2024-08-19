'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkerData extends Model {
    static associate(models) {
      // Define association with User model
      MarkerData.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  MarkerData.init({
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Latitude is required' },
        isFloat: { msg: 'Latitude must be a float' },
        min: { args: [-90], msg: 'Latitude must be greater than or equal to -90' },
        max: { args: [90], msg: 'Latitude must be less than or equal to 90' }
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Longitude is required' },
        isFloat: { msg: 'Longitude must be a float' },
        min: { args: [-180], msg: 'Longitude must be greater than or equal to -180' },
        max: { args: [180], msg: 'Longitude must be less than or equal to 180' }
      }
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Type is required' },
        notEmpty: { msg: 'Type cannot be empty' },
        isIn: { args: [['garbage', 'traffic', 'camera']], msg: 'Type must be restaurant, hotel, or activity' }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User ID is required' },
        isInt: { msg: 'User ID must be an integer' }
      }
    }
  }, {
    sequelize,
    modelName: 'MarkerData',
  });
  return MarkerData;
};