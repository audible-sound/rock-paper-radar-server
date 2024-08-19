'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
      Post.hasMany(models.UserLike, {
        foreignKey: 'postId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
      Post.hasMany(models.PostTag, {
        foreignKey: 'postId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
      Post.hasMany(models.ReportPost, {
        foreignKey: 'postId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      });
    }
  }
  Post.init({
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
    pictureUrl: {
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
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Post Title cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Post Title cannot be empty',
          args: true,
        }
      }
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Post content cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Post content cannot be empty',
          args: true,
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'location cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'location cannot be empty',
          args: true,
        }
      }      
    },
    postLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Post likes cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'Post likes cannot be empty',
          args: true,
        },
        isInt: {
          msg: 'Post likes must be an integer',
          args: true,
        },
        min: {
          args: [0],
          msg: 'Post likes must be a positive integer or zero'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};