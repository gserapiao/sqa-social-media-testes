# SQA Social Media

> Este projeto foi desenvolvido com fins educacionais, para apoio ao ensino em sala de aula de qualidade de software. Trata-se de um trabalho prático onde os alunos devem criar testes para um sistema real de rede social, **incluindo a identificação e cobertura de bugs propositalmente inseridos** no código. O objetivo é exercitar o desenvolvimento e aplicação de testes automatizados, explorando situações reais de software com falhas intencionais.

Este projeto é um sistema completo de rede social composto por uma **API backend** (Spring Boot/Java) e um **frontend web** (Next.js/React) que permite usuários visualizarem, curtirem posts e gerenciarem suas interações. O principal objetivo é fins educacionais, como exemplo de aplicação fullstack em testes de software, arquitetura de APIs e boas práticas.

## 🏗️ Visão Geral

- **Frontend**: Interface web responsiva, desenvolvida em Next.js (React), que possibilita cadastro, login, listagem e interação (curtida) com posts.
- **Backend**: API REST desenvolvida em Java com Spring Boot, responsável pela autenticação, consumo de posts mockados da [DummyJSON](https://dummyjson.com/docs), gerenciamento de curtidas e usuários.
- **Integração**: O frontend consome a API, fornecendo uma experiência unificada para o usuário.

## ✨ Funcionalidades

- **Cadastro, login e recuperação de senha**
- **Listagem de posts** (com paginação e busca)
- **Curtir/Descurtir posts**
- **Visualização de posts curtidos**
- **Validações de senha e email**
- **Ambientes configuráveis (variáveis .env)**
- **Testes automatizados para back e frontend**
- **Exemplo didático para estudo de sistemas fullstack**

## 🗂️ Estrutura do Projeto

```
sqa-social-media/
├── api/         # Backend Spring Boot
│   └── ...      # (ver detalhes abaixo)
├── client/      # Frontend Next.js
│   └── ...      # (ver detalhes abaixo)
├── e2e/         # Playwright (E2E e API)
│   └── tests/
│       ├── e2e/  # fluxos de UI (intro, signup, etc.)
│       └── api/  # testes de endpoints (posts, auth)
```

### Backend (API)

- Java 17, Spring Boot 3.x
- Persistência com JPA/Hibernate, banco principal MySQL (aceita H2 para testes)
- Autenticação básica (login/cadastro/reset)
- Consome posts da API DummyJSON
- Gerencia curtidas associadas a usuários

**Principais Endpoints:**

| Método | Endpoint             | Descrição             |
| ------ | -------------------- | --------------------- |
| POST   | /auth/signup         | Criar nova conta      |
| POST   | /auth/signin         | Login                 |
| POST   | /auth/reset-password | Resetar senha         |
| GET    | /posts               | Listar posts          |
| GET    | /posts/liked         | Listar posts curtidos |
| POST   | /posts/{postId}/like | Curtir/descurtir post |

Ver detalhes de configuração no arquivo [`api/README.md`](api/README.md).

### Frontend (Client)

- Next.js 15, React e TypeScript
- Página inicial com feed integrado ao backend
- Funcionalidades: criar conta, login, reset de senha, curtir posts
- Controle de autenticação via Context API e localStorage
- Testes usando Jest e Testing Library

**Principais Rotas:**

- `/` — Feed de posts
- `/signup` — Cadastro
- `/signin` — Login
- `/reset-password` — Recuperação de senha
- `/auth/liked` — Posts curtidos (protegido)

> As requisições ao backend usam a URL no `.env` via `NEXT_PUBLIC_BASE_URL`.

Mais detalhes no [`client/README.md`](client/README.md).

## 🚀 Como executar localmente

**Pré-requisitos:**

- Node.js 18+, npm 8+
- Java 17+
- Maven
- MySQL ou outro banco relacional (opcional para desenvolvimento, H2 já funciona para testes locais)

### 1. Clone o projeto

```bash
git clone <url-do-repositorio>
cd sqa-social-media
```

### 2. Configure o Backend (API)

1. Entre na pasta `api/`
2. Edite `src/main/resources/application.properties` com suas credenciais do banco
3. Instale as dependências e rode:

```bash
cd api
./mvnw clean install
./mvnw spring-boot:run
```

Acesse: http://localhost:8080

### 3. Configure o Frontend

1. Entre na pasta `client/`
2. Instale as dependências:

```bash
cd ../client
npm install
```

3. Crie `.env` com a URL da API:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

4. Rode o app:

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🧪 Testes

- **API (Java)**: `./mvnw test` (na pasta `api/` - utiliza banco H2 em memória)
- **Frontend (Jest)**: `npm test` (na pasta `client/` - scripts para coverage e watch disponíveis)
- **E2E e API (Playwright)**: `npm test` (na pasta `e2e/`)
  ```bash
  cd e2e
  npm install
  npx playwright install
  # todos os testes
  npm test
  # apenas E2E
  npm run test:e2e
  # apenas API
  npm run test:api
  # modo UI
  npx playwright test --ui
  # modo de visualização da interação
  npx playwright test --headed
  ```

> Requisitos padrão: Frontend e API sendo executados em `http://localhost:3000` e `http://localhost:8080`, respectivamente.

---

## 📚 Mais informações

Consulte os READMEs das pastas `api/` e `client/` para documentação detalhada de endpoints, estrutura, exemplos de uso e configuração de variáveis.

- [README da API](api/README.md)
- [README do Frontend](client/README.md)
- [README dos Testes (Playwright)](e2e/README.md)
- [DummyJSON API Docs](https://dummyjson.com/docs)

---

### 📢 Observação

Este projeto foi construído para fins didáticos e ilustrativos, sendo uma excelente base tanto para testes de software quanto para estudo de integração fullstack.
