# Arquitetura do Projeto

Este projeto segue os princípios **SOLID** e **Clean Architecture**.

## Estrutura de Camadas

```
src/
├── app.js                  # Configuração do Express
├── server.js               # Inicialização do servidor
├── routes/                 # Definição de rotas HTTP
├── controllers/            # Manipulação de req/res
├── services/               # Lógica de negócio
├── repositories/           # Acesso aos dados
└── utils/                  # Utilitários
```

## Responsabilidades

### Routes (Rotas)
- Define apenas os endpoints da API
- Mapeia URLs para controllers
- Não contém lógica de negócio

### Controllers (Controladores)
- Recebe requisições HTTP (req)
- Envia respostas HTTP (res)
- Delega lógica para services
- Trata erros e status codes
- **NÃO** acessa dados diretamente

### Services (Serviços)
- Contém toda a lógica de negócio
- Realiza validações
- Orquestra operações
- **NÃO** depende do Express
- **NÃO** acessa dados diretamente

### Repositories (Repositórios)
- Encapsula acesso aos dados em memória
- Fornece métodos CRUD
- Gerencia IDs e seed inicial
- Única camada que manipula arrays

## Princípios SOLID Aplicados

### S - Single Responsibility Principle
Cada classe/módulo tem uma única responsabilidade:
- Controllers: HTTP
- Services: Negócio
- Repositories: Dados

### O - Open/Closed Principle
Fácil adicionar novos recursos sem modificar código existente.

### L - Liskov Substitution Principle
Repositories podem ser substituídos (ex: trocar memória por banco).

### I - Interface Segregation Principle
Cada camada expõe apenas métodos necessários.

### D - Dependency Inversion Principle
Controllers dependem de Services (abstrações), não de implementações.

## Fluxo de Dados

```
Request → Route → Controller → Service → Repository → Dados
                                    ↓
Response ← Controller ← Service ← Repository
```

## Vantagens

✅ Código organizado e legível  
✅ Fácil manutenção  
✅ Testável (cada camada isolada)  
✅ Escalável (fácil adicionar features)  
✅ Preparado para migração de banco de dados
