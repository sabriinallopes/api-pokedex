// Controller: Lida apenas com requisição e resposta HTTP
const pokemonService = require('../services/pokemonService');

exports.listarTodos = (req, res) => {
  try {
    const pokemons = pokemonService.listarTodos();
    res.json(pokemons);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.buscarPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemon = pokemonService.buscarPorId(id);
    res.json(pokemon);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.cadastrar = (req, res) => {
  try {
    const novoPokemon = pokemonService.cadastrar(req.body);
    res.status(201).json(novoPokemon);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};

exports.atualizar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemonAtualizado = pokemonService.atualizar(id, req.body);
    res.json(pokemonAtualizado);
  } catch (error) {
    res.status(error.status || 500).json({ erro: error.message });
  }
};
