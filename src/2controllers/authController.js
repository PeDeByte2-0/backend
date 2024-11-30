const authService = require('../1services/authService');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const data = await authService.authenticate(email, password);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};
