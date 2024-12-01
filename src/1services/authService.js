const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { client } = require('../0config/database'); // Importar o cliente configurado

const JWT_SECRET = 'sua-chave-secreta-aqui'; // Use variáveis de ambiente em produção

module.exports = {
  async authenticate(email, password) {
    try {
      // Buscar o login no banco pelo email
      const loginQuery = 'SELECT * FROM "PeDeByteSchema".tb_login WHERE email = $1;';
      const loginResult = await client.query(loginQuery, [email]);

      if (loginResult.rows.length === 0) {
        throw new Error('Usuário ou senha inválidos');
      }

      const loginData = loginResult.rows[0];
      console.log(loginResult.rows[0]);

      // Verificar a senha utilizando o bcrypt
      const isPasswordValid = bcrypt.compareSync(password, loginData.token); // Supondo que "token" é a senha criptografada
      if (!isPasswordValid) {
        throw new Error('Usuário ou senha inválidos');
      }

      // Buscar o usuário associado
      const userQuery = 'SELECT * FROM "PeDeByteSchema".tb_user WHERE login_id = $1;';
      const userResult = await client.query(userQuery, [loginData.id_login]);

      if (userResult.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      const userData = userResult.rows[0];

      // Gerar um token JWT
      const token = jwt.sign({ id: userData.person_id }, JWT_SECRET, { expiresIn: '1h' });

      return { token, username: userData.username };
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error.message);
      throw new Error(error.message);
    }
  },
};
