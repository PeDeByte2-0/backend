// models/tb_school.js
module.exports = (sequelize, DataTypes) => {
    const tb_school = sequelize.define('tb_school', {
      id_school: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tb_week_profile_id_week_profile: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_school;
  };
  