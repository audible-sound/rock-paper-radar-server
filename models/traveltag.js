'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TravelTag.belongsTo(models.TravelPlan, {
        foreignKey: 'travelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  TravelTag.init({
    travelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Travel ID is required'
        },
        isInt: {
          msg: 'Travel ID must be an integer'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tag name is required'
        },
        notEmpty: {
          msg: 'Tag name cannot be empty'
        },
        len: {
          args: [1, 50],
          msg: 'Tag name must be between 1 and 50 characters long'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TravelTag',
  });
  return TravelTag;
};