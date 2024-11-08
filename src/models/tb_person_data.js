// models/tb_person_data.js
module.exports = (sequelize, DataTypes) => {
    const tb_person_data = sequelize.define('tb_person_data', {
      tb_person_id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      schema: 'PeDeByteSchema',
      timestamps: false,
    });
    return tb_person_data;
  };
  