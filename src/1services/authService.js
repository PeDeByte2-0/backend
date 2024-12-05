const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { client } = require('../0config/database'); // Importar o cliente configurado

const JWT_SECRET = process.env.JWT_SECRET; // Use variáveis de ambiente em produção

module.exports = {
  async authenticate(username, password) {
    try {
      // Buscar o usuário na tabela tb_user pelo username
      const userQuery = 'SELECT * FROM "PeDeByteSchema".tb_user WHERE username = $1;';
      const userResult = await client.query(userQuery, [username]);

      if (userResult.rows.length === 0) {
        throw new Error('Usuário ou senha inválidos');
      }

      const userData = userResult.rows[0];
      console.log(userData);

      // Buscar o login associado ao usuário na tabela tb_login
      const loginQuery = 'SELECT * FROM "PeDeByteSchema".tb_login WHERE id_login = $1;';
      const loginResult = await client.query(loginQuery, [userData.login_id]);

      if (loginResult.rows.length === 0) {
        throw new Error('Usuário ou senha inválidos');
      }

      const loginData = loginResult.rows[0];

      // Verificar a senha utilizando o bcrypt
      const isPasswordValid = bcrypt.compareSync(password, loginData.token); // Supondo que "token" é a senha criptografada
      if (!isPasswordValid) {
        throw new Error('Usuário ou senha inválidos');
      }

      // Gerar um token JWT
      const token = jwt.sign({ id: userData.person_id }, JWT_SECRET, { expiresIn: '1h' });

      return { token, username: userData.username };
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error.message);
      throw new Error(error.message);
    }
  },
};
