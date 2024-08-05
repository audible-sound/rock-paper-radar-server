'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blog.belongsTo(models.staff, {
        foreignKey: 'staffID'
      })
    }
  }
  blog.init({
    staffID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'StaffID cannot be null',
          args: true
        },
        notEmpty: {
          msg: 'staffID cannot be empty',
          args: true
        }
      }
    },
    blogPicture: DataTypes.STRING,
    blogContent: DataTypes.STRING,
    blogLikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};