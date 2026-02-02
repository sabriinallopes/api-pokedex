const { treinadores, getProximoId } = require('../data/treinadores');
const { pokemons } = require('../data/pokemons');

// Listar todos os treinadores
exports.listarTodos = (req, res) => {
  res.json(treinadores);
};

// Buscar treinador por ID
exports.buscarPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const treinador = treinadores.find(t => t.id === id);
  
  if (!treinador) {
    return res.status(404).json({ erro: "Treinador não encontrado" });
  }
  
  res.json(treinador);
};

// Cadastrar novo treinador
exports.cadastrar = (req, res) => {
  const { nome } = req.body;
  
  // Validação: nome é obrigatório
  if (!nome || nome.trim() === '') {
    return res.status(400).json({ erro: "Nome do treinador é obrigatório" });
  }
  
  const novoTreinador = {
    id: getProximoId(),
    nome: nome.trim()
  };
  
  treinadores.push(novoTreinador);
  res.status(201).json(novoTreinador);
};

// Atualizar treinador
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  
  const index = treinadores.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: "Treinador não encontrado" });
  }
  
  // Validação: nome é obrigatório
  if (!nome || nome.trim() === '') {
    return res.status(400).json({ erro: "Nome do treinador é obrigatório" });
  }
  
  treinadores[index].nome = nome.trim();
  res.json(treinadores[index]);
};

// Listar pokémons de um treinador
exports.listarPokemons = (req, res) => {
  const id = parseInt(req.params.id);
  const treinador = treinadores.find(t => t.id === id);
  
  if (!treinador) {
    return res.status(404).json({ erro: "Treinador não encontrado" });
  }
  
  const pokemonsDoTreinador = pokemons.filter(p => p.treinador_id === id);
  res.json(pokemonsDoTreinador);
};
