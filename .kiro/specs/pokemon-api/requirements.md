# Requirements Document

## Introduction

Esta especificação define uma API REST para gerenciar treinadores de Pokémon, seus pokémons e batalhas entre eles. A API será implementada em Node.js usando Express.js, com persistência em memória e comunicação via JSON.

## Glossary

- **API**: Application Programming Interface - interface de comunicação entre sistemas
- **Treinador**: Entidade que representa um treinador de Pokémon
- **Pokemon**: Entidade que representa um Pokémon pertencente a um treinador
- **Batalha**: Confronto entre dois Pokémon seguindo regras específicas
- **Sistema**: A API REST completa incluindo rotas, controladores e camada de dados
- **Cliente**: Aplicação ou usuário que consome a API

## Requirements

### Requirement 1: Gerenciamento de Treinadores

**User Story:** Como um cliente da API, eu quero gerenciar treinadores, para que eu possa criar, listar, buscar e atualizar informações de treinadores.

#### Acceptance Criteria

1. WHEN um cliente envia uma requisição GET para /treinadores, THE Sistema SHALL retornar uma lista com todos os treinadores cadastrados e status code 200
2. WHEN um cliente envia uma requisição GET para /treinadores/:id com um ID válido, THE Sistema SHALL retornar o treinador correspondente e status code 200
3. WHEN um cliente envia uma requisição GET para /treinadores/:id com um ID inexistente, THE Sistema SHALL retornar status code 404
4. WHEN um cliente envia uma requisição POST para /treinadores com um nome válido, THE Sistema SHALL criar um novo treinador com ID único e retornar status code 201
5. WHEN um cliente envia uma requisição POST para /treinadores sem o campo nome, THE Sistema SHALL retornar status code 400
6. WHEN um cliente envia uma requisição PUT para /treinadores/:id com dados válidos, THE Sistema SHALL atualizar o treinador e retornar status code 200
7. WHEN um cliente envia uma requisição PUT para /treinadores/:id com um ID inexistente, THE Sistema SHALL retornar status code 404

### Requirement 2: Gerenciamento de Pokémons

**User Story:** Como um cliente da API, eu quero gerenciar pokémons, para que eu possa criar, listar, buscar e atualizar informações de pokémons associados a treinadores.

#### Acceptance Criteria

1. WHEN um cliente envia uma requisição GET para /pokemons, THE Sistema SHALL retornar uma lista com todos os pokémons cadastrados e status code 200
2. WHEN um cliente envia uma requisição GET para /pokemons/:id com um ID válido, THE Sistema SHALL retornar o pokémon correspondente e status code 200
3. WHEN um cliente envia uma requisição GET para /pokemons/:id com um ID inexistente, THE Sistema SHALL retornar status code 404
4. WHEN um cliente envia uma requisição POST para /pokemons com nome, tipo, nível e treinador_id válidos, THE Sistema SHALL criar um novo pokémon com ID único e retornar status code 201
5. WHEN um cliente envia uma requisição POST para /pokemons sem os campos obrigatórios (nome ou tipo), THE Sistema SHALL retornar status code 400
6. WHEN um cliente envia uma requisição POST para /pokemons com um treinador_id inexistente, THE Sistema SHALL retornar status code 400
7. WHEN um cliente envia uma requisição POST para /pokemons com nível menor que 1, THE Sistema SHALL retornar status code 400
8. WHEN um cliente envia uma requisição PUT para /pokemons/:id com dados válidos, THE Sistema SHALL atualizar o pokémon e retornar status code 200
9. WHEN um cliente envia uma requisição PUT para /pokemons/:id com um ID inexistente, THE Sistema SHALL retornar status code 404

### Requirement 3: Listagem de Pokémons por Treinador

**User Story:** Como um cliente da API, eu quero listar todos os pokémons de um treinador específico, para que eu possa visualizar quais pokémons pertencem a cada treinador.

#### Acceptance Criteria

1. WHEN um cliente envia uma requisição GET para /treinadores/:id/pokemons com um ID de treinador válido, THE Sistema SHALL retornar uma lista com todos os pokémons daquele treinador e status code 200
2. WHEN um cliente envia uma requisição GET para /treinadores/:id/pokemons com um ID de treinador inexistente, THE Sistema SHALL retornar status code 404

### Requirement 4: Sistema de Batalhas

**User Story:** Como um cliente da API, eu quero realizar batalhas entre pokémons, para que eu possa determinar o vencedor baseado em regras de nível e tipo.

#### Acceptance Criteria

1. WHEN um cliente envia uma requisição POST para /batalhas com pokemon_atacante_id e pokemon_defensor_id válidos e diferentes, THE Sistema SHALL processar a batalha e retornar o resultado com status code 200
2. WHEN um cliente envia uma requisição POST para /batalhas com pokemon_atacante_id igual a pokemon_defensor_id, THE Sistema SHALL retornar status code 400
3. WHEN um cliente envia uma requisição POST para /batalhas com um ou ambos IDs inexistentes, THE Sistema SHALL retornar status code 404
4. WHEN dois pokémons batalham e possuem níveis diferentes, THE Sistema SHALL declarar como vencedor o pokémon com maior nível
5. WHEN dois pokémons batalham com mesmo nível e o atacante é tipo Fogo e o defensor é tipo Planta, THE Sistema SHALL declarar o pokémon Fogo como vencedor
6. WHEN dois pokémons batalham com mesmo nível e o atacante é tipo Planta e o defensor é tipo Água, THE Sistema SHALL declarar o pokémon Planta como vencedor
7. WHEN dois pokémons batalham com mesmo nível e o atacante é tipo Água e o defensor é tipo Fogo, THE Sistema SHALL declarar o pokémon Água como vencedor
8. WHEN dois pokémons batalham com mesmo nível e mesmo tipo, THE Sistema SHALL declarar empate

### Requirement 5: Formato de Comunicação

**User Story:** Como um cliente da API, eu quero que toda comunicação seja feita em JSON, para que eu possa integrar facilmente com diferentes tecnologias.

#### Acceptance Criteria

1. WHEN um cliente envia uma requisição com Content-Type application/json, THE Sistema SHALL processar o corpo da requisição como JSON
2. WHEN o Sistema retorna uma resposta, THE Sistema SHALL definir o Content-Type como application/json
3. WHEN o Sistema retorna dados, THE Sistema SHALL serializar os dados em formato JSON válido

### Requirement 6: Validação de Dados

**User Story:** Como desenvolvedor da API, eu quero validar todos os dados de entrada, para que o sistema mantenha integridade e consistência dos dados.

#### Acceptance Criteria

1. WHEN um cliente envia dados inválidos em qualquer endpoint, THE Sistema SHALL retornar status code 400 com mensagem descritiva do erro
2. WHEN um cliente tenta criar ou atualizar um pokémon, THE Sistema SHALL validar que o nível seja um número maior ou igual a 1
3. WHEN um cliente tenta criar um pokémon, THE Sistema SHALL validar que o treinador_id corresponda a um treinador existente
4. WHEN um cliente tenta criar um treinador, THE Sistema SHALL validar que o campo nome esteja presente e não seja vazio
5. WHEN um cliente tenta criar um pokémon, THE Sistema SHALL validar que os campos nome e tipo estejam presentes e não sejam vazios

### Requirement 7: Estrutura do Projeto

**User Story:** Como desenvolvedor, eu quero que o código seja organizado em uma estrutura clara, para que seja fácil de manter e estender.

#### Acceptance Criteria

1. THE Sistema SHALL organizar o código em diretórios separados para routes, controllers e data
2. THE Sistema SHALL manter a lógica de roteamento separada da lógica de negócio
3. THE Sistema SHALL armazenar dados em memória usando arrays em arquivos JavaScript no diretório data
4. THE Sistema SHALL ter um arquivo app.js para configuração do Express e um arquivo server.js para inicialização do servidor

### Requirement 8: Relacionamento entre Entidades

**User Story:** Como desenvolvedor da API, eu quero garantir a integridade referencial entre treinadores e pokémons, para que não existam pokémons órfãos no sistema.

#### Acceptance Criteria

1. WHEN um pokémon é criado, THE Sistema SHALL verificar que o treinador_id corresponde a um treinador existente
2. THE Sistema SHALL permitir que um treinador possua zero ou mais pokémons
3. THE Sistema SHALL garantir que cada pokémon pertença a exatamente um treinador
