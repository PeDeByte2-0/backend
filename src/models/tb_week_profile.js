// models/tb_week_profile.js
module.exports = (sequelize, DataTypes) => {
    const tb_week_profile = sequelize.define('tb_week_profile', {
      id_week_profile: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_week_profile;
  };
  