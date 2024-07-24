'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { 
        foreignKey: 'userId'
      });
    }
  }
  UserProfile.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: 'User profile already exists for this user'
      },
      validate: {
        notNull: {
          msg: 'User ID cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'User ID cannot be empty',
          args: true,
        }
      }
    },
    /*
    TO DO:
    - add character limit for description
    */
    profileDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile description cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Profile description cannot be empty',
          args: true,
        }
      }
    },
    /*
    TO DO:
    - Before Insert: add default profile picture if not url is empty
    */
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile picture URL cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Profile picture URL cannot be empty',
          args: true,
        },
        isUrl: {
          msg: 'Profile picture URL must be a valid URL',
          args: true,
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};