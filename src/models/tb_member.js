// models/tb_member.js
module.exports = (sequelize, DataTypes) => {
    const tb_member = sequelize.define('tb_member', {
      tb_person_id_person: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      obs: {
        type: DataTypes.STRING,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_member;
  };
  