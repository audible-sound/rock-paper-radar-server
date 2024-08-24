'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BugReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BugReport.init({
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserID cannot be null',
          args: true},
        notEmpty: {
          msg: 'UserID cannot be empty',
          args: true
        }
      }
    },
    userType: {
      type: DataTypes.STRING,
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
    bugTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bug title cannot be null',
          args: true},
        notEmpty: {
          msg: 'But title cannot be empty',
          args: true
        }
      }
    }, 
    bugDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bug description cannot be null',
          args: true},
        notEmpty: {
          msg: 'But content cannot be empty',
          args: true
        }
      }
    }, 
    bugSteps: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bug steps cannot be null',
          args: true},
        notEmpty: {
          msg: 'Bug steps cannot be empty',
          args: true
        }
      }
    }, 
    bugState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bug state cannot be null',
          args: true},
        notEmpty: {
          msg: 'Bug state cannot be empty',
          args: true
        }
      }
    }
  }, {
    sequelize,
    modelName: 'BugReport',
  });
  return BugReport;
};