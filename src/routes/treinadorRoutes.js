const express = require('express');
const router = express.Router();
const treinadorController = require('../controllers/treinadorController');

// Rotas de treinadores
router.get('/', treinadorController.listarTodos);
router.get('/:id', treinadorController.buscarPorId);
router.post('/', treinadorController.cadastrar);
router.put('/:id', treinadorController.atualizar);
router.get('/:id/pokemons', treinadorController.listarPokemons);

module.exports = router;
