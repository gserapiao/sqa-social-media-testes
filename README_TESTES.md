# README - Testes Automatizados (Apresentação)

Este documento explica os testes automatizados do projeto SQA Social Media para apresentação.

**Importante:** Não foram alterados códigos da aplicação nem os testes para gerar este README — o documento apenas descreve o que já existe no repositório.

---

## 1. Objetivo da atividade

O objetivo desta atividade é demonstrar práticas de teste e qualidade de software. O repositório contém testes que:

- Validam comportamentos corretos da aplicação (testes que passam);
- Capturam bugs reais (testes propositalmente falhos);
- Servem como exemplo de testes de regressão e documentação de defeitos;
- Atendem aos requisitos da disciplina de Qualidade de Software (Q/A), com mensagens explicativas e organização clara.

Os bugs detectados e mantidos intencionalmente servem para exercício de verificação de defeitos e para demonstrar evidência de teste.

---

## 2. Tecnologias usadas nos testes

### Backend
- Linguagem: Java
- Framework: Spring Boot
- Testes: JUnit 5 (JUnit Jupiter)
- Build/test runner: Maven (wrapper `mvnw`)
- Banco em teste: H2 (memória) para execução dos testes de integração

### Frontend
- Framework: Next.js / React
- Test runner: Jest
- Biblioteca de testes: React Testing Library
- Utilitários: @testing-library/jest-dom
- Ambiente DOM simulado: jsdom (via Jest)

---

## 3. Estrutura dos testes (pastas)

Backend (JUnit):
- `api/src/test/java/...` — testes unitários/integrados do backend, organizados por pacote (ex.: `service`, `controller`).

Frontend (Jest):
- `client/src/__tests__/utils` — testes de funções puras (utilitários de validação, helpers)
- `client/src/__tests__/components` — testes unitários de componentes React (render e comportamento)
- `client/src/__tests__/integration` — testes de integração/fluxos (validação combinada, persistência, etc.)

Cada pasta agrupa os tipos de teste conforme a responsabilidade e facilita a apresentação.

---

## 4. Resumo geral dos testes

| Camada | Quantidade de testes | Testes que passam | Testes que falham | Objetivo da falha |
|---|---:|---:|---:|---|
| Backend | 3 | 2 | 1 | Capturar bug: validador de e-mail aceita `invalid@` |
| Frontend | 6 | 5 | 1 | Capturar bug: `saveUser` / `getUser` usam chaves diferentes no localStorage |

---

## 5. Explicação detalhada dos testes backend

Todos os testes backend estão em `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`.

### Teste 1
- Nome do teste: `Deve aceitar e-mail válido com usuário e domínio`
- Arquivo: `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`
- Tipo: unitário
- Requisito: validar formato básico de e-mail (usuario@dominio)
- Cenário: verificar que e-mails no formato correto são aceitos
- Entrada: `user@example.com`
- Resultado esperado: `true`
- Resultado obtido: `true`
- Status: passou
- Como apresentar: "Valida que um e-mail com usuário e domínio é considerado válido pelo método `isEmailValid`"

### Teste 2
- Nome do teste: `Deve criar usuário com email e senha válidos`
- Arquivo: `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`
- Tipo: integração/unitário (criação de entidade)
- Requisito: criação de usuário persistido com ID, email e password
- Cenário: criar usuário com dados válidos
- Entrada: `email=newuser@example.com`, `senha=ValidPass123!`
- Resultado esperado: usuário criado com `id` não nulo, e campos iguais aos informados
- Resultado obtido: usuário criado com `id` e campos preenchidos
- Status: passou
- Como apresentar: "O teste valida criação e armazenamento do usuário via `UserService.createUser()` e faz múltiplas assertivas com `assertAll`."

### Teste 3 (BUG)
- Nome do teste: `BUG: Deve rejeitar e-mail sem domínio após o @`
- Arquivo: `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`
- Tipo: unitário (teste de validação)
- Requisito relacionado: rejeitar e-mails sem domínio (garantir formato mínimo)
- Cenário testado: validação de e-mail sem domínio após o `@`
- Entrada usada: `invalid@`
- Resultado esperado: `false` (pois e-mail não possui domínio)
- Resultado obtido: `true`
- Status: falhou (propositalmente — captura bug real)
- Explicação: O método `isEmailValid()` atualmente apenas verifica se o texto contém o caractere `@`. Assim aceita entradas inválidas como `invalid@`. O teste documenta cenário, entrada, esperado, obtido e motivo da falha.

Trecho de explicação a apresentar ao professor:

"O teste `BUG: Deve rejeitar e-mail sem domínio após o @` demonstra um defeito no validador. Esperávamos `false` para `invalid@`, porém a implementação atual retornou `true`, provando que a validação é insuficiente (apenas checa presença de `@`)."

---

## 6. Explicação detalhada dos testes frontend

Local dos testes: `client/src/__tests__/` (subpastas `utils`, `components`, `integration`)

### Funções puras (utils)

1) `deve validar e-mail no formato correto - usuário@dominio`
- Arquivo: `client/src/__tests__/utils/email.test.ts`
- Categoria: função pura
- Requisito: validar formato mínimo de e-mail
- Cenário testado: entrada de e-mail no formato correto
- Entrada usada: `user@example.com`
- Resultado esperado: `true`
- Resultado obtido: `true`
- Status: passou
- Explicação para apresentação: demonstra a função `isEmailValid` com um caso positivo.

2) `deve aceitar senha forte com maiúscula, minúscula, número e caractere especial`
- Arquivo: `client/src/__tests__/utils/password.test.ts`
- Categoria: função pura
- Requisito: validar força mínima de senha
- Cenário testado: senha que cumpre todos os critérios (maiúscula, minúscula, número, char especial)
- Entrada usada: `Senha@123`
- Resultado esperado: `true`
- Resultado obtido: `true`
- Status: passou
- Explicação: valida a função `isPasswordValid` em caso positivo.

### Componentes (unitários)

3) `deve renderizar botão e disparar onClick quando clicado`
- Arquivo: `client/src/__tests__/components/Button.test.tsx`
- Categoria: componente React (unitário)
- Requisito: botão deve renderizar o texto e disparar `onClick`
- Cenário testado: render do componente `Button` com handler simulado
- Ação simulada: clique no botão
- Resultado esperado: elemento presente e `onClick` chamado 1 vez
- Resultado obtido: conforme esperado
- Status: passou
- Observação: teste usa `@testing-library/react` para render e interação.

4) `deve exibir "Entrar" e "Criar Conta" para usuário deslogado`
- Arquivo: `client/src/__tests__/components/Header.test.tsx`
- Categoria: componente React (unitário)
- Requisito: header exibe controles para usuário não autenticado
- Cenário testado: render do `Header` com contexto de auth sem usuário
- Ação simulada: render do componente dentro de `AuthProvider` real (o teste limpa `localStorage` antes)
- Resultado esperado: botões visíveis `Entrar` e `Criar Conta`
- Resultado obtido: conforme esperado
- Status: passou
- Observação: o teste utiliza o `AuthProvider` real e limpa `localStorage` para garantir estado não autenticado.

### Integração (fluxo)

5) `deve validar email e senha válidos para o fluxo de signup`
- Arquivo: `client/src/__tests__/integration/signup-flow.test.ts`
- Categoria: integração
- Requisito: validar conjunto de validações antes de submeter signup
- Cenário testado: validação de `email` e `password` válidos
- Entrada usada: `email=newuser@example.com`, `password=SecurePass@123`
- Resultado esperado: ambos os validadores retornam `true`
- Resultado obtido: passou
- Status: passou
- Observação: caso de integração positivo sobre os validadores.

6) `BUG: falha de persistência entre saveUser/getUser devido a chave inconsistente no localStorage`
- Arquivo: `client/src/__tests__/integration/signup-flow.test.ts`
- Categoria: integração (bug)
- Requisito: persistência de usuário no fluxo de signup
- Cenário testado: salvar usuário via `saveUser()` e recuperar via `getUser()`
- Entrada usada: objeto usuário `{ id: 1, email: "persist@test.com" }`
- Resultado esperado: `getUser()` retorna o objeto salvo
- Resultado obtido: `null`
- Status: falhou (propositalmente)
- Explicação do bug: `saveUser` grava em uma chave (`"user"`) enquanto `getUser` busca na constante `USER_KEY` (`"sqa_social_user"`). Essa inconsistência faz com que dados salvos não sejam recuperados, quebrando a persistência do usuário.

Trecho do motivo técnico:
- `saveUser` (em `client/src/lib/localStorage.ts`) usa `localStorage.setItem("user", ...)`.
- `getUser` lê `localStorage.getItem(USER_KEY)` onde `USER_KEY` é `"sqa_social_user"`.
- Portanto `getUser()` retorna `null` mesmo após `saveUser()`.

---

## 7. Como executar os testes

### Backend (local)
```powershell
cd api
.\mvnw.cmd test
```
**Resultado esperado** (exemplo):
```
Tests run: 3, Failures: 1, Errors: 0, Skipped: 0
```
Esse resultado indica que 1 teste falhou propositalmente e 2 passaram.

### Frontend (local)
```bash
cd client
npm test -- --watchAll=false
```
**Resultado esperado** (exemplo):
```
Test Suites: 1 failed, 4 passed, 5 total
Tests:       1 failed, 5 passed, 6 total
```
A falha corresponde a um teste propositalmente projetado para capturar um bug real na persistência do `localStorage`.

---

## 8. Como interpretar o terminal

- Testes que passam aparecem no resumo (`PASS`) e são listados por suíte.
- Testes que falham aparecem com detalhes: nome do teste, arquivo, linha do `expect` que falhou e mensagem do matcher.
- A falha não necessariamente significa erro de execução — muitas vezes significa que o valor retornado foi diferente do esperado.

Exemplos comuns e interpretação:

- Backend: `expected: <false> but was: <true>`
  - Interpretação: o teste esperava `false` (ex.: `invalid@`), mas a realidade da aplicação foi `true`. Isto evidencia o defeito.

- Frontend: `expect(received).not.toBeNull()` / `Received: null`
  - Interpretação: o teste esperava recuperar um objeto (p.ex. usuário) do `localStorage`, mas recebeu `null`. Isso demonstra a falha de persistência entre `saveUser` e `getUser`.

---

## 9. Roteiro de apresentação (falas prontas)

- "No backend, temos 3 testes. Dois passam e um falha propositalmente. O teste falho verifica a validação de e-mail para a entrada `invalid@`. O esperado é `false`, mas o método atualmente retorna `true`, revelando que a validação apenas checa a presença de `@` e é insuficiente."

- "No frontend, temos 6 testes: 2 funções puras, 2 testes de componentes e 2 testes de integração. Cinco passam e um falha propositalmente. O teste que falha mostra um problema de persistência: a aplicação salva o usuário em uma chave do `localStorage`, mas tenta recuperar em outra chave. Assim, `getUser()` retorna `null` apesar de `saveUser()` ter sido chamado."

- "Esses testes servem para demonstrar evidências de qualidade, mostrar onde a aplicação precisa de correção e como os testes documentam o comportamento atual." 

---

## 10. Checklist final

### Backend
- [ ] Existem 3 testes
- [ ] 2 passam
- [ ] 1 falha por bug real
- [ ] O bug está documentado

### Frontend
- [ ] Existem 6 testes
- [ ] 2 são de funções puras
- [ ] 2 são de componentes
- [ ] 2 são de integração
- [ ] 1 falha por bug real
- [ ] O bug está documentado

### Documentação
- [ ] O README explica entradas, esperados, obtidos e motivos das falhas

---

## Arquivos de referência (para revisão rápida)
- Backend tests: `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`
- Frontend utils: `client/src/__tests__/utils/email.test.ts`, `client/src/__tests__/utils/password.test.ts`
- Frontend components: `client/src/__tests__/components/Button.test.tsx`, `client/src/__tests__/components/Header.test.tsx`
- Frontend integration: `client/src/__tests__/integration/signup-flow.test.ts`

---

Se quiser, posso também gerar um slide curto com os pontos principais para apresentação (3 a 5 slides).