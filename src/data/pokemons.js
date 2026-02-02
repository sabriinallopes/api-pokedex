// Armazenamento em memória dos pokémons
let pokemons = [
  { id: 1, nome: "Pikachu", tipo: "Eletrico", nivel: 25, treinador_id: 1 },
  { id: 2, nome: "Charmander", tipo: "Fogo", nivel: 15, treinador_id: 1 },
  { id: 3, nome: "Squirtle", tipo: "Agua", nivel: 20, treinador_id: 2 }
];

let proximoId = 4;

module.exports = {
  pokemons,
  getProximoId: () => proximoId++
};
