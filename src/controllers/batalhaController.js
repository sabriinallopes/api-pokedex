const { pokemons } = require('../data/pokemons');

// Realizar batalha entre dois pokémons
exports.batalhar = (req, res) => {
  const { pokemon_atacante_id, pokemon_defensor_id } = req.body;
  
  // Validar se os IDs foram fornecidos
  if (!pokemon_atacante_id || !pokemon_defensor_id) {
    return res.status(400).json({ erro: "IDs dos pokémons são obrigatórios" });
  }
  
  // Não permitir batalha de um pokémon contra ele mesmo
  if (pokemon_atacante_id === pokemon_defensor_id) {
    return res.status(400).json({ erro: "Um pokémon não pode batalhar contra si mesmo" });
  }
  
  // Buscar os pokémons
  const atacante = pokemons.find(p => p.id === pokemon_atacante_id);
  const defensor = pokemons.find(p => p.id === pokemon_defensor_id);
  
  // Validar se ambos existem
  if (!atacante) {
    return res.status(404).json({ erro: "Pokémon atacante não encontrado" });
  }
  
  if (!defensor) {
    return res.status(404).json({ erro: "Pokémon defensor não encontrado" });
  }
  
  // Determinar vencedor
  let vencedor, perdedor;
  
  // Primeiro critério: nível
  if (atacante.nivel > defensor.nivel) {
    vencedor = atacante;
    perdedor = defensor;
  } else if (defensor.nivel > atacante.nivel) {
    vencedor = defensor;
    perdedor = atacante;
  } else {
    // Empate de nível: verificar tipo
    const resultado = determinarVencedorPorTipo(atacante, defensor);
    
    if (resultado === 'empate') {
      return res.json({
        resultado: "empate",
        mensagem: "Os Pokémon possuem força equivalente"
      });
    }
    
    vencedor = resultado.vencedor;
    perdedor = resultado.perdedor;
  }
  
  res.json({
    resultado: "vitoria",
    vencedor: { id: vencedor.id, nome: vencedor.nome },
    perdedor: { id: perdedor.id, nome: perdedor.nome }
  });
};

// Função auxiliar para determinar vencedor por tipo
function determinarVencedorPorTipo(pokemon1, pokemon2) {
  const tipo1 = pokemon1.tipo.toLowerCase();
  const tipo2 = pokemon2.tipo.toLowerCase();
  
  // Fogo vence Planta
  if (tipo1 === 'fogo' && tipo2 === 'planta') {
    return { vencedor: pokemon1, perdedor: pokemon2 };
  }
  if (tipo1 === 'planta' && tipo2 === 'fogo') {
    return { vencedor: pokemon2, perdedor: pokemon1 };
  }
  
  // Planta vence Água
  if (tipo1 === 'planta' && tipo2 === 'agua') {
    return { vencedor: pokemon1, perdedor: pokemon2 };
  }
  if (tipo1 === 'agua' && tipo2 === 'planta') {
    return { vencedor: pokemon2, perdedor: pokemon1 };
  }
  
  // Água vence Fogo
  if (tipo1 === 'agua' && tipo2 === 'fogo') {
    return { vencedor: pokemon1, perdedor: pokemon2 };
  }
  if (tipo1 === 'fogo' && tipo2 === 'agua') {
    return { vencedor: pokemon2, perdedor: pokemon1 };
  }
  
  // Empate (mesmo tipo ou tipos não relacionados)
  return 'empate';
}
