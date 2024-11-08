// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'PeDeByteSchema',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tb_admin = require('./tb_admin')(sequelize, DataTypes);
db.tb_available_time = require('./tb_available_time')(sequelize, DataTypes);
db.tb_hours = require('./tb_hours')(sequelize, DataTypes);
db.tb_login = require('./tb_login')(sequelize, DataTypes);
db.tb_member = require('./tb_member')(sequelize, DataTypes);
db.tb_necessity = require('./tb_necessity')(sequelize, DataTypes);
db.tb_person = require('./tb_person')(sequelize, DataTypes);
db.tb_person_data = require('./tb_person_data')(sequelize, DataTypes);
db.tb_professional = require('./tb_professional')(sequelize, DataTypes);
db.tb_school = require('./tb_school')(sequelize, DataTypes);
db.tb_speciality = require('./tb_speciality')(sequelize, DataTypes);
db.tb_student = require('./tb_student')(sequelize, DataTypes);
db.tb_user = require('./tb_user')(sequelize, DataTypes);
db.tb_week_profile = require('./tb_week_profile')(sequelize, DataTypes);
db.tb_week_profile_has_tb_hours = require('./tb_week_profile_has_tb_hours')(sequelize, DataTypes);

// Definindo associações se necessário
db.tb_person.hasOne(db.tb_user, { foreignKey: 'tb_person_id_person' });
db.tb_person.hasOne(db.tb_member, { foreignKey: 'tb_person_id_person' });
db.tb_member.belongsTo(db.tb_person, { foreignKey: 'tb_person_id_person' });

// Adicione outras associações conforme necessário

module.exports = db;
