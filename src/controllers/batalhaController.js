// Controller: Lida apenas com requisição e resposta HTTP
const batalhaService = require('../services/batalhaService');

exports.batalhar = (req, res) => {
  try {
    const resultado = batalhaService.batalhar(req.body);
    res.json(resultado);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};
