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
      userGuide.belongsTo(models.staff, {
        foreignKey: 'staffID'
      })
    }
  }
  userGuide.init({
    staffID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: 'Staff profile already exists for this user',
        args: true
      },
      validate: {
        notNull: {
          msg: 'StaffID cannot be null',
          args: true
        },
        notEmpty: {
          msg: 'StaffID cannot be empty',
          args: true
        }
      }
    },
    forUserType: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Type cannot be null',
          args: true},
        notEmpty: {
          msg: 'User Type cannot be empty',
          args: true
        }
      }
    },
    pictureUrl: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Type cannot be null',
          args: true},
        notEmpty: {
          msg: 'User Type cannot be empty',
          args: true
        }
      }
    },
    content: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Type cannot be null',
          args: true},
        notEmpty: {
          msg: 'User Type cannot be empty',
          args: true
        }
      }
    },
  }, {
    sequelize,
    modelName: 'userGuide',
  });
  return userGuide;
};