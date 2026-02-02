const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// Rotas de pokémons
router.get('/', pokemonController.listarTodos);
router.get('/:id', pokemonController.buscarPorId);
router.post('/', pokemonController.cadastrar);
router.put('/:id', pokemonController.atualizar);

module.exports = router;
