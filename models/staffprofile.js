'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staffProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      staffProfile.belongsTo(models.staff, {
        foreignKey: 'staffID'
      })
    }
  }
  staffProfile.init({
    staffID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: 'Staff profile already exists for this user',
        // args: true
      },
      validate: {
        notNull: {
          msg: 'StaffID cannot be null',
          // args: true
        },
        notEmpty: {
          msg: 'StaffID cannot be empty',
          // args: true
        }
      }
    },
    profileDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile description cannot be null',
          // args: true
        },
        notEmpty: {
          msg: 'Profile description cannot be empty',
          // args: true
        }
      }
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile picture URL cannot be null',
          // args: true
        },
        notEmpty: {
          msg: 'Profile picture URL cannot be empty',
          // args: true
        },
        isURL: {
          msg: 'Profile picture URL must be a valid URL',
          // args: true
        }
      }
    },
  }, {
    sequelize,
    modelName: 'staffProfile',
  });
  return staffProfile;
};