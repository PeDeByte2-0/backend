// models/tb_speciality.js
module.exports = (sequelize, DataTypes) => {
    const tb_speciality = sequelize.define('tb_speciality', {
      idtb_speciality: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_speciality;
  };
  