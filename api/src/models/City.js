const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('city', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
     },
    country:{
      type: DataTypes.STRING,
      allowNull: false,
     },
    photo: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },

  }, {timestamps: false}  
   );
};
