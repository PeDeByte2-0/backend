// models/tb_necessity.js
module.exports = (sequelize, DataTypes) => {
    const tb_necessity = sequelize.define('tb_necessity', {
      tb_student_tb_member_idMember: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tb_speciality_idtb_speciality: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tb_student_tb_member_tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_necessity;
  };
  