'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: 'userId'})
      Booking.hasMany(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,

    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,

    }
  }, {
    sequelize,
    modelName: 'Booking',
    indexes: [{ // creates a unique input from the three arguments in fields array
      unique: true,
      fields: ['spotId', 'startDate', 'endDate']
    }]
  });
  return Booking;
};
