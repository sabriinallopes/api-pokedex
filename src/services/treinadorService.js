// Service: Contém a lógica de negócio de treinadores
const treinadorRepository = require('../repositories/treinadorRepository');

class TreinadorService {
  listarTodos() {
    return treinadorRepository.findAll();
  }

  buscarPorId(id) {
    const treinador = treinadorRepository.findById(id);
    if (!treinador) {
      throw { status: 404, message: 'Treinador não encontrado' };
    }
    return treinador;
  }

  cadastrar(dados) {
    const { nome } = dados;

    // Validação: nome é obrigatório
    if (!nome || nome.trim() === '') {
      throw { status: 400, message: 'Nome do treinador é obrigatório' };
    }

    return treinadorRepository.create({ nome: nome.trim() });
  }

  atualizar(id, dados) {
    const { nome } = dados;

    // Verificar se treinador existe
    const treinadorExistente = treinadorRepository.findById(id);
    if (!treinadorExistente) {
      throw { status: 404, message: 'Treinador não encontrado' };
    }

    // Validação: nome é obrigatório
    if (!nome || nome.trim() === '') {
      throw { status: 400, message: 'Nome do treinador é obrigatório' };
    }

    return treinadorRepository.update(id, { nome: nome.trim() });
  }
}

module.exports = new TreinadorService();
