<h1 align="center">Desafio Técnico - XP Inc.</h1>

<h4 align="center"><i>Repositório para versionamento e documentação da construção da API do desafio técnico da XP Inc.</i></h4>

<p align="center"><img align="center" src="https://user-images.githubusercontent.com/86581370/180653837-7f5d3e1f-bc42-4898-8e02-00d959066313.png" /></p>

<h2>Tópicos</h2>

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Tomadas de decisão](#tomadas-de-decisão)
- [Desafios enfrentados](#desafios-enfrentados)

<h2>Sobre o projeto</h2>

Este projeto contém apenas o Backend da aplicação. Onde simula um aplicativo de investimento em ações, com algumas
funcionalidades de conta digital.

<h2>Funcionalidades</h2>

- Comprar ou vender ativos
- Sacar ou depositar dinheiro
- Registrar cliente
- Realizar login
- Consultar a lista de ativos disponíveis para a compra
- Consultar o saldo da conta
- Cliente consegue ver quais ativos estão em sua conta

<h2>Tecnologias utilizadas</h2>

- [TypeScript](https://www.typescriptlang.org/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />

- [NodeJS](https://nodejs.org/en/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />

- [Express](https://expressjs.com/)

- [Jest](https://jestjs.io/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />

- [PostgreSQL](https://www.postgresql.org/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />

- [Prisma ORM](https://www.prisma.io/)

- [Docker](https://www.docker.com/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" />

<h2>Tomadas de decisão</h2>

Durante o planejamento do projeto, escolhi utilizar NodeJS com TypeScript para dar segurança ao desenvolver o código por causa das tipagens. O banco de dados inicial foi utilizado o MySQL e posteriormente foi migrado para PostgreSQL para tentar realizar o deploy da aplicação, sem sucesso até o momento. Comecei usando Sequelize como ORM e decidi alterar para o Prisma ORM por conta de que sua documentação é detalhada e específica para TypeScript. Utilizei Jest para os testes unitários e Docker para containerizar a aplicação. A biblioteca `bcrypt` foi utilizada para criptografar a senha e a biblioteca `JWT` para fazer autenticação. O projeto está com a arquiterura MSC(Model-Service-Controller) para separar as responsabilidades de cada camada.

<h2>Desafios enfrentados</h2>

Os momentos mais desafiadores foram implementar o Docker na aplicação, realizar os testes unitários e fazer o deploy da aplicação. O deploy foi o único desafio não superado, houve várias tentativas, mas todas sem sucesso.

<h2>Como rodar a aplicação</h2>

<h3>Sem docker</h3>

<h4>Pré-requistos:</h4>

- Node instalado
- Servidor PostgreSQL rodando

No terminal, clone este repositório com o comando:

- `git clone git@github.com:Douglas-marcal/desafio-tecnico-xp.git`

Entre no diretório `backend`:

- `cd backend`

Instale as dependências:

- `npm install`

Para subir a tabela e popular alguns ativos pré-definidos no banco de dados:

- `npx prisma migrate dev`

Para subir um servidor Node:

- `npm run dev`

<h3>Com Docker</h3>
