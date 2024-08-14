'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostTag.belongsTo(models.Post, {
        foreignKey: 'postId'
      }); // This is the association between a post and a tag.  The tag name is the primary key.  The post ID is the foreign key.  The "onDelete" and "onUpdate" options define how the relationships are handled when a post or tag is deleted or updated.  In this case, if a post is deleted, all associated tags will also be deleted.  If a tag is updated, all associated posts will also be updated.  The "allowNull" option specifies whether the foreign key can be null.  In this case, it cannot.  The "validate" option is used to validate the data before it is saved.  In this case, it checks that the userId is not null and not empty.  If any of these validations fail, an error
    }
  }
  PostTag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      validate: {
        notNull: {
          msg: 'name cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'name cannot be empty',
          args: true,
        },
        isIn: {
          args: [['Historical', 'Scenery', 'Food', 'Adventure', 'Nature']],
          msg: 'name must be one of the following: Historical, Scenery, Food, Adventure'
        }
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: {
          msg: 'postId cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'postId cannot be empty',
          args: true,
        }
      }
    },
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};