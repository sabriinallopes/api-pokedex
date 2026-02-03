// Service: Contém a lógica de negócio de pokémons
const pokemonRepository = require('../repositories/pokemonRepository');
const treinadorRepository = require('../repositories/treinadorRepository');

class PokemonService {
  listarTodos() {
    return pokemonRepository.findAll();
  }

  buscarPorId(id) {
    const pokemon = pokemonRepository.findById(id);
    if (!pokemon) {
      throw { status: 404, message: 'Pokémon não encontrado' };
    }
    return pokemon;
  }

  cadastrar(dados) {
    const { nome, tipo, nivel, treinador_id } = dados;

    // Validações
    if (!nome || nome.trim() === '') {
      throw { status: 400, message: 'Nome do pokémon é obrigatório' };
    }

    if (!tipo || tipo.trim() === '') {
      throw { status: 400, message: 'Tipo do pokémon é obrigatório' };
    }

    // Verificar se o treinador existe
    const treinador = treinadorRepository.findById(treinador_id);
    if (!treinador) {
      throw { status: 400, message: 'Treinador não encontrado' };
    }

    // Validar nível (deve ser >= 1)
    const nivelPokemon = nivel || 1;
    if (nivelPokemon < 1) {
      throw { status: 400, message: 'Nível do pokémon deve ser maior ou igual a 1' };
    }

    return pokemonRepository.create({
      nome: nome.trim(),
      tipo: tipo.trim(),
      nivel: nivelPokemon,
      treinador_id
    });
  }

  atualizar(id, dados) {
    const { nome, tipo, nivel, treinador_id } = dados;

    // Verificar se pokémon existe
    const pokemonExistente = pokemonRepository.findById(id);
    if (!pokemonExistente) {
      throw { status: 404, message: 'Pokémon não encontrado' };
    }

    // Validações
    if (nome !== undefined && (!nome || nome.trim() === '')) {
      throw { status: 400, message: 'Nome do pokémon é obrigatório' };
    }

    if (tipo !== undefined && (!tipo || tipo.trim() === '')) {
      throw { status: 400, message: 'Tipo do pokémon é obrigatório' };
    }

    if (treinador_id !== undefined) {
      const treinador = treinadorRepository.findById(treinador_id);
      if (!treinador) {
        throw { status: 400, message: 'Treinador não encontrado' };
      }
    }

    if (nivel !== undefined && nivel < 1) {
      throw { status: 400, message: 'Nível do pokémon deve ser maior ou igual a 1' };
    }

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome.trim();
    if (tipo) dadosAtualizados.tipo = tipo.trim();
    if (nivel !== undefined) dadosAtualizados.nivel = nivel;
    if (treinador_id !== undefined) dadosAtualizados.treinador_id = treinador_id;

    return pokemonRepository.update(id, dadosAtualizados);
  }

  listarPorTreinador(treinadorId) {
    // Verificar se treinador existe
    const treinador = treinadorRepository.findById(treinadorId);
    if (!treinador) {
      throw { status: 404, message: 'Treinador não encontrado' };
    }

    return pokemonRepository.findByTreinadorId(treinadorId);
  }
}

module.exports = new PokemonService();
