'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      staff.hasOne(models.staffProfile, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      staff.hasMany(models.blog, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUPDATE: 'CASCADE'
      })

      staff.hasMany(models.userGuide, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUPDATE: 'CASCADE'
      })
    }
  }
  staff.init({
    //TODO validate length
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
          args: true
        },
        notEmpty: {
          msg: 'Username cannot be empty',
          args: true
        }
      }
    },
    //TODO validate length
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null',
          args: true
        },
        NotEmpty: {
          msg: 'Password cannot be empty',
          args: true
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
    //TODO allow acceptable bday only
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
        msg: 'phoneNumber is already in use',
        args: true
      },
      validate: {
        notNull: {
          msg: 'PhoneNumber cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'PhoneNumber cannot be empty',
          args: true,
        }
      }
    }
  }, {
    sequelize,
    modelName: 'staff',
  });
  return staff;
};