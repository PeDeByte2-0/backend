// models/tb_admin.js
module.exports = (sequelize, DataTypes) => {
    const tb_admin = sequelize.define('tb_admin', {
      tb_user_tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_admin;
  };
  