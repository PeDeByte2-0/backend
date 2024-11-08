// models/tb_student.js
module.exports = (sequelize, DataTypes) => {
    const tb_student = sequelize.define('tb_student', {
      tb_member_tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_student;
  };
  