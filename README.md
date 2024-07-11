<h1 align="center">
  Plann.er
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/campagnuci/plann.er">
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/campagnuci/plann.er" />
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/campagnuci/plann.er">
</p>

<p>
  <img src=".github/cover.png" alt="Capa do projeto" />
</p>

## 💻 Sobre

Este é o repositório do **Plann.er**, que é um sistema de planejamento de viagens, onde é possível montar planos de viagens com amigos. É possível cadastrar atividades, adicionar links úteis sobre a viagem, entre outras funcionalidades.

Essa aplicação foi desenvolvida durante o evento **Next Level Week Journey** da [Rocketseat](https://www.rocketseat.com.br/) utilizando principalmente tecnologias como `Node`, `TypeScript`, `Fastify` e `React`.


<!--
## 🔗 Deploy
O deploy da aplicação pode ser acessada através da seguinte URL base:
-->

## ⚙ Instalação

### 📝 Requisitos

Antes de baixar o projeto é necessário ter as seguintes ferramentas já instaladas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/), [PNPM](https://pnpm.io/pt/) ou [Yarn](https://yarnpkg.com/)

Utilize uma ferramenta como [Postman](https://www.postman.com/), ou outra similar, para testar as rotas da aplicação sem o frontend.

### Configuração

Passo a passo para clonar e executar a aplicação na sua máquina:

```bash
# Clone este repositório
$ git clone https://github.com/campagnuci/plann.er

# Acesse a pasta do projeto no terminal
$ cd plann.er

# Acesse a pasta do backend:
$ cd backend

# Instale as dependências
$ npm install

# Crie o arquivo '.env' e preencha as variáveis conforme o arquivo '.env.example'
cp .env.example .env

# Execute as migrations para criar as tabelas necessários no banco
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação inciará na porta que você configurou no arquivo '.env'
# Volte para o diretório anterior e acessa a pasta do frontend
$ cd ../frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação inciará na porta padrão do vite, 5173
```

### Documentação

Após o servidor backend estar rodando, é possível acessar ele através da rota `/docs` na aplicação. Caso tenha utilizado a porta padrão (3333), o endereço será: `http://localhost:3333/docs`

## 🛠 Tecnologias

As seguintes libs foram usadas na construção do projeto:

### Backend
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Fastify](https://fastify.dev/)**
- **[Prisma](https://www.prisma.io/)**
- **[Zod](https://zod.dev/)**
- **[Nodemailer](https://nodemailer.com/)**
- **[DayJS](https://day.js.org/)**

### Frontend
- **[React](https://react.dev/)**
- **[ReactRouter](https://reactrouter.com/en/main)**
- **[TailwindCSS](https://tailwindcss.com/)**
- **[Tailwind-Variants](https://www.tailwind-variants.org/)**
- **[React-Day-Picker](https://daypicker.dev/)**
- **[LucideReact](https://lucide.dev/guide/packages/lucide-react)**
- **[Axios](https://axios-http.com/)**

> Para mais detalhes das dependências gerais da aplicação veja os arquivos de cada componente [package.json](./backend/package.json) e [package.json](./frontend/package.json)
