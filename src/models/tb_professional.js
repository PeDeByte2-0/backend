// models/tb_professional.js
module.exports = (sequelize, DataTypes) => {
    const tb_professional = sequelize.define('tb_professional', {
      tb_member_tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tb_speciality_idtb_speciality: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_professional;
  };
  