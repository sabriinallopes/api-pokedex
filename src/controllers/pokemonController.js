const { pokemons, getProximoId } = require('../data/pokemons');
const { treinadores } = require('../data/treinadores');

// Listar todos os pokémons
exports.listarTodos = (req, res) => {
  res.json(pokemons);
};

// Buscar pokémon por ID
exports.buscarPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === id);
  
  if (!pokemon) {
    return res.status(404).json({ erro: "Pokémon não encontrado" });
  }
  
  res.json(pokemon);
};

// Cadastrar novo pokémon
exports.cadastrar = (req, res) => {
  const { nome, tipo, nivel, treinador_id } = req.body;
  
  // Validações
  if (!nome || nome.trim() === '') {
    return res.status(400).json({ erro: "Nome do pokémon é obrigatório" });
  }
  
  if (!tipo || tipo.trim() === '') {
    return res.status(400).json({ erro: "Tipo do pokémon é obrigatório" });
  }
  
  // Verificar se o treinador existe
  const treinador = treinadores.find(t => t.id === treinador_id);
  if (!treinador) {
    return res.status(400).json({ erro: "Treinador não encontrado" });
  }
  
  // Validar nível (deve ser >= 1)
  const nivelPokemon = nivel || 1;
  if (nivelPokemon < 1) {
    return res.status(400).json({ erro: "Nível do pokémon deve ser maior ou igual a 1" });
  }
  
  const novoPokemon = {
    id: getProximoId(),
    nome: nome.trim(),
    tipo: tipo.trim(),
    nivel: nivelPokemon,
    treinador_id
  };
  
  pokemons.push(novoPokemon);
  res.status(201).json(novoPokemon);
};

// Atualizar pokémon
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, tipo, nivel, treinador_id } = req.body;
  
  const index = pokemons.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: "Pokémon não encontrado" });
  }
  
  // Validações
  if (nome !== undefined && (!nome || nome.trim() === '')) {
    return res.status(400).json({ erro: "Nome do pokémon é obrigatório" });
  }
  
  if (tipo !== undefined && (!tipo || tipo.trim() === '')) {
    return res.status(400).json({ erro: "Tipo do pokémon é obrigatório" });
  }
  
  if (treinador_id !== undefined) {
    const treinador = treinadores.find(t => t.id === treinador_id);
    if (!treinador) {
      return res.status(400).json({ erro: "Treinador não encontrado" });
    }
    pokemons[index].treinador_id = treinador_id;
  }
  
  if (nivel !== undefined) {
    if (nivel < 1) {
      return res.status(400).json({ erro: "Nível do pokémon deve ser maior ou igual a 1" });
    }
    pokemons[index].nivel = nivel;
  }
  
  if (nome) pokemons[index].nome = nome.trim();
  if (tipo) pokemons[index].tipo = tipo.trim();
  
  res.json(pokemons[index]);
};
