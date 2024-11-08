// models/tb_hours.js
module.exports = (sequelize, DataTypes) => {
  const tb_hours = sequelize.define('tb_hours', {
    id_hours: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    weekday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starttime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endtime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    schema: 'PeDeByteSchema',
    timestamps: false,
  });
  return tb_hours;
};
