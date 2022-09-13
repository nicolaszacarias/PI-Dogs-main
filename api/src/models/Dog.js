const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
  }, //esto lo hace la base de datos.
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     weight: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    bred_for: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    breed_group: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     image: {
       type: DataTypes.STRING,
       allowNull: true,
     },
     createdDb: { 
      // facilita ver los que se van creando y los que ya vienen hechos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
   });
 };

