// Armazenamento em memória dos treinadores
let treinadores = [
  { id: 1, nome: "Ash Ketchum" },
  { id: 2, nome: "Misty" }
];

let proximoId = 3;

module.exports = {
  treinadores,
  getProximoId: () => proximoId++
};
