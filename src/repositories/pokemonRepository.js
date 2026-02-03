// Repository: Encapsula acesso aos dados de pokémons
class PokemonRepository {
  constructor() {
    this.pokemons = [
      { id: 1, nome: "Pikachu", tipo: "eletrico", nivel: 25, treinador_id: 1 },
      { id: 2, nome: "Charmander", tipo: "fogo", nivel: 15, treinador_id: 1 },
      { id: 3, nome: "Squirtle", tipo: "agua", nivel: 20, treinador_id: 2 }
    ];
    this.proximoId = 4;
  }

  findAll() {
    return [...this.pokemons];
  }

  findById(id) {
    return this.pokemons.find(p => p.id === id);
  }

  findByTreinadorId(treinadorId) {
    return this.pokemons.filter(p => p.treinador_id === treinadorId);
  }

  create(pokemon) {
    const novoPokemon = {
      id: this.proximoId++,
      ...pokemon
    };
    this.pokemons.push(novoPokemon);
    return novoPokemon;
  }

  update(id, dadosAtualizados) {
    const index = this.pokemons.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.pokemons[index] = {
      ...this.pokemons[index],
      ...dadosAtualizados
    };
    return this.pokemons[index];
  }
}

module.exports = new PokemonRepository();
