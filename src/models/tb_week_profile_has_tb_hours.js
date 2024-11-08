// models/tb_week_profile_has_tb_hours.js
module.exports = (sequelize, DataTypes) => {
  const tb_week_profile_has_tb_hours = sequelize.define('tb_week_profile_has_tb_hours', {
    tb_week_profile_id_week_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_week_profile',
        key: 'id_week_profile',
      },
    },
    tb_hours_id_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_hours',
        key: 'id_hours',
      },
    },
  }, {
    schema: 'PeDeByteSchema',
    timestamps: false,
  });
  
  return tb_week_profile_has_tb_hours;
};
