// models/tb_available_time.js
module.exports = (sequelize, DataTypes) => {
    const tb_available_time = sequelize.define('tb_available_time', {
      Member_idMember: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Member_tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tb_hours_id_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Scheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_available_time;
  };
  