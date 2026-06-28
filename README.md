# SQA Social Media

Projeto educacional com uma API Spring Boot e um frontend Next.js.

## Visão Geral

- `api/`: backend Java 17 com Spring Boot, autenticação, usuários, posts e curtidas.
- `client/`: frontend Next.js/React que consome a API.

Principais rotas da aplicação:

- Frontend: `http://localhost:3000`
- API: `http://localhost:8080`

## Como Rodar

Pré-requisitos:

- Java 17+
- Node.js 18+
- npm
- MySQL configurado para o ambiente de desenvolvimento

API:

```bash
cd api
./mvnw spring-boot:run
```

Frontend:

```bash
cd client
npm install
npm run dev
```

O frontend usa `NEXT_PUBLIC_BASE_URL` para definir a URL da API. Exemplo de `.env` em `client/`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

## Documentações

- [README da API](api/README.md)
- [README do Frontend](client/README.md)
- [DummyJSON API Docs](https://dummyjson.com/docs)

## Atividade - CI e Likes/Dislikes

Foi criada uma pipeline de CI com GitHub Actions em `.github/workflows/ci.yml`. Ela roda em Pull Requests para a branch `main` e executa os testes do backend, do frontend e da pasta `tests` com Playwright.

A Home tambem exibe as reacoes dos posts seguindo a estrutura da DummyJSON:

```ts
reactions: {
  likes: number;
  dislikes: number;
}
```

Comandos para rodar localmente:

Backend:

```bash
cd api
./mvnw test
```

No Windows:

```bash
cd api
.\mvnw.cmd test
```

Frontend:

```bash
cd client
npm test -- --watchAll=false
```

Playwright:

```bash
cd tests
npm test
```
