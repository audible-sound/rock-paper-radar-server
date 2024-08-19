'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReportPost.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      ReportPost.belongsTo(models.Post, {
        foreignKey: 'postId'
      });
      ReportPost.hasMany(models.BannedPost, {
        foreignKey: 'reportId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
    }
  }
  ReportPost.init({
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'PostID cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'PostID cannot be empty',
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
    modelName: 'ReportPost',
  });
  return ReportPost;
};