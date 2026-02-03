const express = require('express');
const cors = require('cors');
const path = require('path');

const treinadorRoutes = require('./routes/treinadorRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/* 🔴 ROTAS DA API PRIMEIRO */
app.use('/treinadores', treinadorRoutes);
app.use('/pokemons', pokemonRoutes);
app.use('/batalhas', batalhaRoutes);

/* 🟢 SERVIR FRONTEND */
app.use(express.static(path.join(__dirname, 'frontend')));

/* 🟡 FALLBACK PARA O INDEX.HTML */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

module.exports = app;
