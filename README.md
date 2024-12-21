# Airsoft API

## Descrição

A Airsoft API é um projeto desenvolvido em Nest.js para gerenciar operações de um time de airsoft. A API permite gerenciar informações como usuários, tipos de armas, marcas e itens relacionados a jogadores e operações/jogos.

## Funcionalidades

### Gerenciamento de Usuários:

- Cadastro de usuários com diferentes perfis (Admin, Mecânico, Operador).
- Autenticação e autorização (em implementação futura).

### Gerenciamento de Itens:

- Adicionar, atualizar, listar e deletar itens (ex.: armas, equipamentos) associados a usuários.

### Gerenciamento de Operações/Jogos:

- Criação de operações com data, local, objetivos, regras e enredo.

### Gerenciamento de Informativos:

- Listar, criar, editar e excluir informativos.

## Tecnologias Utilizadas

### Backend:

- Nest.js
- TypeORM (ORM)
- PostgreSQL (Banco de Dados)
- Swagger (Documentação da API)

### Configuração:

- dotenv (Variáveis de ambiente)

## Pré-requisitos

- Node.js: versão 16 ou superior.
- PostgreSQL: configurado e em execução.
- npm ou yarn para gerenciar dependências.

## Configuração do Projeto

1. Clone o repositório:

```
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

2. Instale as dependências:

```
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

```
# Configuração do Servidor
PORT=3000

# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_NAME=airsoft
```
4. Execute as migrações (se aplicável):

```
npm run typeorm migration:run

```

5. Inicie o servidor:

```
npm run start

```

6. Acesse a API via Swagger:

```
http://localhost:3000/api
```

# Licença

Este projeto é licenciado sob a licença MIT.