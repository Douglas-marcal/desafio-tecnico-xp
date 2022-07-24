<h1 align="center">Desafio Técnico - XP Inc.</h1>

<h4 align="center"><i>Repositório para versionamento e documentação da construção da API do desafio técnico da XP Inc.</i></h4>

<p align="center"><img align="center" src="https://user-images.githubusercontent.com/86581370/180653837-7f5d3e1f-bc42-4898-8e02-00d959066313.png" /></p>

<h2>Tópicos</h2>

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Tomadas de decisão](#tomadas-de-decisão)
- [Desafios enfrentados](#desafios-enfrentados)
- [Endpoints da aplicação](#endpoints-da-aplicação)
- [Como rodar a aplicação](#como-rodar-a-aplicação)

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

- Modelagem do Banco de Dados

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180662270-da3e793a-64a9-41cf-aae9-9769beba355d.png" /></p>

<h2>Desafios enfrentados</h2>

Os momentos mais desafiadores foram implementar o Docker na aplicação, realizar os testes unitários e fazer o deploy da aplicação. O deploy foi o único desafio não superado, houve várias tentativas, mas todas sem sucesso.

## Endpoints da aplicação

| Método          | Endpoint                 |
|:---------------:|:------------------------:|
| `POST`          | `/conta/registrar`       |
| `POST`          | `/conta/entrar`          |
| `POST`          | `/conta/deposito`        |
| `POST`          | `/conta/saque`           |
| `GET`           | `/conta/ativos`          |
| `GET`           | `/conta/saldo`           |
| `GET`           | `/ativos`                |
| `GET`           | `/ativos/:CodAtivo`      |
| `POST`          | `/ativos/registrar`      |
| `POST`          | `/investimentos/comprar` |
| `POST`          | `/investimentos/vender`





<h2>Como rodar a aplicação</h2>

<details>

<summary><strong>Sem Docker</strong></summary>

<h4>Pré-requistos:</h4>

- Node instalado
- Servidor PostgreSQL rodando

Pelo terminal, clone este repositório com o comando:

- `git clone git@github.com:Douglas-marcal/desafio-tecnico-xp.git`

Entre no diretório `desafio-xp` e logo em seguida no diretório `backend`:

- `cd desafio-tecnico-xp/backend`

Instale as dependências:

- `npm install`

Para subir a tabela e popular alguns ativos pré-definidos no banco de dados:

- `npx prisma migrate dev`

Para subir um servidor Node:

- `npm run dev`

</details>

<details>

<summary><strong>Com Docker</strong></summary>

<h4>Pré-requistos:</h4>

- Docker
- Docker Compose

Pelo terminal, clone este repositório com o comando:

- `git clone git@github.com:Douglas-marcal/desafio-tecnico-xp.git`

Entre no diretório `desafio-xp` e logo em seguida no diretório `backend`:

- `cd desafio-tecnico-xp/backend`

Suba o container com o comando:

- `docker-compose up -d`

Acesse o terminal do container com o comando:

- `docker exec -it desafio_tecnico_xp bash`

Dentro do container, instale as dependências:

- `npm install`

Para subir a tabela e popular alguns ativos pré-definidos no banco de dados:

- `npx prisma migrate dev`

Para subir um servidor Node:

- `npm run dev`

</details>

### Para rodar os testes unitários utilize o comando:

- `npm test`

#### Com o servidor rodando, para usar a aplicação você precisará do [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para fazer requisições HTTP

Neste exemplo a porta 3333 será utilizada

![image](https://user-images.githubusercontent.com/86581370/180658264-8a87b03b-faee-4eb5-8a17-ad0e2773063b.png)

<br />

### Para registrar um cliente utilize o Endpoint `POST` `/conta/registrar`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

  - É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180658229-f6c9d3cf-20f5-4a16-a149-dcae0ee82f23.png" /></p>

</details>

<br />

### Para realizar o login utilize o Endpoint `POST` `/conta/entrar`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

Para fazer o login é necessário informar o email e senha cadastrados no Endpoint de registro.

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180658443-540fa7e2-353a-4883-8849-c426f55cbd2e.png" /></p>

</details>

<br />

#### :warning: Para realizar as próximas requisições será preciso informar o token recebido no Endpoint de login para fazer a autenticação.

#### Pré-requisito para as próximas requisições:

- Adicionar no `header` a chave `Authorization` com o valor do token recebido ao efetuar o login

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180659293-4f74ad4a-a427-43ff-8e3d-0cf88c756edc.png" /></p>

<br />

### Para realizar um depósito utilize o Endpoint `POST` `/conta/deposito`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180659246-f7090436-677d-4a3a-94af-2015ba55c557.png" /></p>

</details>

<br />

### Para realizar um saque utilize o Endpoint `POST` `/conta/saque`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180659540-20b98d51-43ca-470a-b79d-5d0dc3177f4c.png" /></p>

</details>

<br />

### Para realizar um saque utilize o Endpoint `GET` `/conta/saldo`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180659700-ba812a72-083d-41c6-9760-6eeaae07f7f4.png" /></p>

</details>

<br />

### Para consultar todos os ativos que o cliente possui utilize o Endpoint `GET` `/conta/ativos`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180660611-a13e0544-f3ce-44bf-9d60-b19399ee4bdf.png" /></p>

</details>

<br />

### Para consultar a lista de todos os ativos utilize o Endpoint `GET` `/ativos`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180659948-84dec90b-0eb5-4113-98ef-4ca2a4258376.png" /></p>

</details>

<br />

### Para consultar um único ativo utilize o Endpoint `GET` `/ativos/:CodAtivo`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180660147-bdabbc74-8912-47ba-9d82-9920761360ad.png" /></p>

</details>

<br />

### Para registrar um novo ativo utilize o Endpoint `POST` `/ativos/registrar`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180660221-9fdb5729-ffc7-4397-8349-169ad1b891af.png" /></p>

</details>

<br />

### Para comprar um ativo utilize o Endpoint `POST` `/investimentos/comprar`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180660369-4d8cabae-07ea-4a85-b463-6737e3585bcb.png" /></p>

</details>

<br />

### Para vender um ativo utilize o Endpoint `POST` `/investimentos/vender`

<details>

<summary>Para mais detalhes clique aqui</summary><br />

- É necessário enviar um JSON no formato:

<p align="center"><img src="https://user-images.githubusercontent.com/86581370/180660495-70e5a873-0917-4682-bcba-b1fa2e8b0fb3.png" /></p>

</details>
