// models/tb_login.js
module.exports = (sequelize, DataTypes) => {
    const tb_login = sequelize.define('tb_login', {
      idlogin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_login;
  };
  