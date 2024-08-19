'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BannedComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BannedComment.belongsTo(models.ReportComment, {
        foreignKey: 'reportId'
      });
    }
  }
  BannedComment.init({
      reportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'ReportID cannot be null',
            args: true,
          },
          notEmpty: {
            msg: 'ReportID cannot be empty',
            args: true,
          }
        }
      },
  }, {
    sequelize,
    modelName: 'BannedComment',
  });
  return BannedComment;
};