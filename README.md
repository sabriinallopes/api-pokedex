# API Pokémon

API REST para gerenciar treinadores, pokémons e batalhas.

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Ou em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## Endpoints

### Treinadores

- `GET /treinadores` - Listar todos os treinadores
- `GET /treinadores/:id` - Buscar treinador por ID
- `POST /treinadores` - Cadastrar novo treinador
- `PUT /treinadores/:id` - Atualizar treinador
- `GET /treinadores/:id/pokemons` - Listar pokémons do treinador

### Pokémons

- `GET /pokemons` - Listar todos os pokémons
- `GET /pokemons/:id` - Buscar pokémon por ID
- `POST /pokemons` - Cadastrar novo pokémon
- `PUT /pokemons/:id` - Atualizar pokémon

### Batalhas

- `POST /batalhas` - Realizar batalha entre dois pokémons

## Exemplos de Uso

### Cadastrar Treinador

```bash
POST /treinadores
{
  "nome": "Gary Oak"
}
```

### Cadastrar Pokémon

```bash
POST /pokemons
{
  "nome": "Bulbasaur",
  "tipo": "Planta",
  "nivel": 10,
  "treinador_id": 1
}
```

### Realizar Batalha

```bash
POST /batalhas
{
  "pokemon_atacante_id": 1,
  "pokemon_defensor_id": 2
}
```

## Regras de Batalha

1. Pokémon com nível maior vence
2. Em caso de empate de nível:
   - Fogo vence Planta
   - Planta vence Água
   - Água vence Fogo
3. Se nível e tipo forem iguais, resulta em empate
