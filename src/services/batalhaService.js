// Service: Contém a lógica de negócio de batalhas
const pokemonRepository = require('../repositories/pokemonRepository');

class BatalhaService {
  batalhar(dados) {
    const { pokemon_atacante_id, pokemon_defensor_id } = dados;

    // Validar se os IDs foram fornecidos
    if (!pokemon_atacante_id || !pokemon_defensor_id) {
      throw { status: 400, message: 'IDs dos pokémons são obrigatórios' };
    }

    // Não permitir batalha de um pokémon contra ele mesmo
    if (pokemon_atacante_id === pokemon_defensor_id) {
      throw { status: 400, message: 'Um pokémon não pode batalhar contra si mesmo' };
    }

    // Buscar os pokémons
    const atacante = pokemonRepository.findById(pokemon_atacante_id);
    const defensor = pokemonRepository.findById(pokemon_defensor_id);

    // Validar se ambos existem
    if (!atacante) {
      throw { status: 404, message: 'Pokémon atacante não encontrado' };
    }

    if (!defensor) {
      throw { status: 404, message: 'Pokémon defensor não encontrado' };
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
      const resultado = this._determinarVencedorPorTipo(atacante, defensor);

      if (resultado === 'empate') {
        return {
          resultado: 'empate',
          mensagem: 'Os Pokémon possuem força equivalente'
        };
      }

      vencedor = resultado.vencedor;
      perdedor = resultado.perdedor;
    }

    return {
      resultado: 'vitoria',
      vencedor: { id: vencedor.id, nome: vencedor.nome },
      perdedor: { id: perdedor.id, nome: perdedor.nome }
    };
  }

  // Método privado para determinar vencedor por tipo
  _determinarVencedorPorTipo(pokemon1, pokemon2) {
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
}

module.exports = new BatalhaService();
