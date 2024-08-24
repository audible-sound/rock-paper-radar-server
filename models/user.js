'use strict';
const {
  Model
} = require('sequelize');
const countriesList = require('../helpers/countriesList');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
      });

      User.hasOne(models.userBan, { 
        foreignKey: 'userID', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
      });
      User.hasMany(models.Post, {
        foreignKey: 'userId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
      User.hasMany(models.UserLike, {
        foreignKey: 'userId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    /*
    TO DO: 
    - validate username length
    - validate username format
    */
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username is already taken',
        args: true
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Username cannot be empty',
          args: true,
        },
        len: {
          args: [4, 10],
          msg: 'Username must be between 4 and 10 characters long'
        }
      }
    },
    /*
    TO DO: 
    - validate password length
    - validate password format
    */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Password cannot be empty',
          args: true,
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is already in use',
        args: true
      },
      validate: {
        notNull: {
          msg: 'Email cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Email cannot be empty',
          args: true,
        },
        isEmail: {
          msg: 'Email format is invalid',
          args: true,
        }
      }
    },
    /*
    TO DO:
    - validate acceptable BirthDates (set min and max dates)
    */
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'BirthDate cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'BirthDate cannot be empty',
          args: true,
        },
        isDate: {
          msg: 'BirthDate must be a valid date',
          args: true,
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['male', 'female']],
          msg: 'Gender must be either male or female',
        },
        notNull: {
          msg: 'Gender cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Gender cannot be empty',
          args: true,
        }
      }
    },
    /*
    TO DO:
    - check if country exists
    */
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Country cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Country cannot be empty',
          args: true,
        },
        isIn: {
          args: [countriesList],
          msg: 'Invalid country'
        }
      }
    },
    /*
    TO DO:
    - validate acceptable phone numbers
    */
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Phone number is already in use',
        args: true
      },
      validate: {
        notNull: {
          msg: 'Phone number cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Phone number cannot be empty',
          args: true,
        },
        is: {
          args: /^\+\d{1,3}-\d+$/,
          msg: 'Phone number must be in the format: +[country code]-[number]'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};