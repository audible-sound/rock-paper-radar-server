'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapData.init({
    travelID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MapData',
  });
  return MapData;
};