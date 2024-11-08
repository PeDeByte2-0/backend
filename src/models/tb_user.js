// models/tb_user.js
module.exports = (sequelize, DataTypes) => {
    const tb_user = sequelize.define('tb_user', {
      tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tb_login_idlogin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_user;
  };
  