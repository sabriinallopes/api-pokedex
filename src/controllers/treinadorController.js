// Controller: Lida apenas com requisição e resposta HTTP
const treinadorService = require('../services/treinadorService');
const pokemonService = require('../services/pokemonService');

exports.listarTodos = (req, res) => {
  try {
    const treinadores = treinadorService.listarTodos();
    res.json(treinadores);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.buscarPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const treinador = treinadorService.buscarPorId(id);
    res.json(treinador);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.cadastrar = (req, res) => {
  try {
    const novoTreinador = treinadorService.cadastrar(req.body);
    res.status(201).json(novoTreinador);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.atualizar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const treinadorAtualizado = treinadorService.atualizar(id, req.body);
    res.json(treinadorAtualizado);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.listarPokemons = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemons = pokemonService.listarPorTreinador(id);
    res.json(pokemons);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};
