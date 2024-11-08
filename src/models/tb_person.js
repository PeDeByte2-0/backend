// models/tb_person.js
module.exports = (sequelize, DataTypes) => {
    const tb_person = sequelize.define('tb_person', {
      id_person: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tb_school_id_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_person;
  };
  