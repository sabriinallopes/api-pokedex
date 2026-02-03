// Repository: Encapsula acesso aos dados de treinadores
class TreinadorRepository {
  constructor() {
    this.treinadores = [
      { id: 1, nome: "Ash Ketchum" },
      { id: 2, nome: "Misty" }
    ];
    this.proximoId = 3;
  }

  findAll() {
    return [...this.treinadores];
  }

  findById(id) {
    return this.treinadores.find(t => t.id === id);
  }

  create(treinador) {
    const novoTreinador = {
      id: this.proximoId++,
      ...treinador
    };
    this.treinadores.push(novoTreinador);
    return novoTreinador;
  }

  update(id, dadosAtualizados) {
    const index = this.treinadores.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.treinadores[index] = {
      ...this.treinadores[index],
      ...dadosAtualizados
    };
    return this.treinadores[index];
  }
}

module.exports = new TreinadorRepository();
