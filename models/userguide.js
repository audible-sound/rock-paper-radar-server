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
        },
        isIn: {
          args: [['Normal User', 'Employee']],
          msg: 'User type must be either user or staff'
        }
      }
    },
    section: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Section cannot be null',
          args: true},
        notEmpty: {
          msg: 'Section cannot be empty',
          args: true
        }
      }
    },
    title: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User guide title cannot be null',
          args: true},
        notEmpty: {
          msg: 'User guide title cannot be empty',
          args: true
        }
      }
    },
    content: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User guide content cannot be null',
          args: true},
        notEmpty: {
          msg: 'User guide content cannot be empty',
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