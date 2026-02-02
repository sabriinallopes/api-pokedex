const express = require('express');
const treinadorRoutes = require('./routes/treinadorRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes');

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/treinadores', treinadorRoutes);
app.use('/pokemons', pokemonRoutes);
app.use('/batalhas', batalhaRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    mensagem: "API Pokémon - Gerenciamento de Treinadores e Batalhas",
    endpoints: {
      treinadores: "/treinadores",
      pokemons: "/pokemons",
      batalhas: "/batalhas"
    }
  });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

module.exports = app;
