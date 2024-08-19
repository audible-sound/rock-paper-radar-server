'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReportComment.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      ReportComment.belongsTo(models.Comment, {
        foreignKey: 'commentId'
      });
      ReportComment.hasOne(models.BannedComment, {
        foreignKey: 'reportId'
      });
    }
  }
  ReportComment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'UserId cannot be empty',
          args: true,
        }
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'CommmentId cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'CommmentId cannot be empty',
          args: true,
        }
      }
    },
    reportState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'reportState cannot be null',
          isin:['unverified','ban','false report']
        },
        notEmpty: {
          msg: 'reportState cannot be empty',
          args: true,
        }
      }
    },
    reportContent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'reportContent cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'reportContent cannot be empty',
          args: true,
        }
      }
    },
  }, {
    sequelize,
    modelName: 'ReportComment',
  });
  return ReportComment;
};