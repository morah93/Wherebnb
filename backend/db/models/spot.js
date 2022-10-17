'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // //one to many
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
      // Spot.belongsToMany(models.User, {through: models.Booking , foreignKey: 'spotId', otherKey: 'userId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'})
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'})

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    lng:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',

  });
  return Spot;
};
