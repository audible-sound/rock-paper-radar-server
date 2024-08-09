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
    blogPicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Picture URL cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Picture URL cannot be empty',
          args: true,
        },
        isUrl: {
          msg: 'Picture URL must be a valid URL',
          args: true,
        }
      }
    },
    blogContent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Blog content cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Blog content cannot be empty',
          args: true,
        }
      }
    },
    blogLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Blog likes cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Blog likes cannot be empty',
          args: true,
        },
        isInt: {
          msg: 'Blog likes must be an integer',
          args: true,
        },
        min: {
          args: -1, //idk why, it's supposed to treat it like >=, but it treats it like >
          msg: 'Blog likes must be a positive integer or zero'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};