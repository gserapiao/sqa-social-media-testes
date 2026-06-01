# Resumo de Apresentação dos Testes

Visão geral rápida para apresentação:

Backend (Junit):
- Total de testes: 3
- Testes que passam: 2
- Teste propositalmente falho: 1 (captura bug no validador de e-mail que aceita `invalid@`)
- Arquivo: `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`

Frontend (Jest):
- Total de testes: 6
- Funções puras: 2 (email, senha)
- Componentes: 2 (Button, Header)
- Integração: 2 (signup flow, com 1 teste propositalmente falho para persistência de usuário)
- Arquivos:
  - `client/src/__tests__/utils/email.test.ts`
  - `client/src/__tests__/utils/password.test.ts`
  - `client/src/__tests__/components/Button.test.tsx`
  - `client/src/__tests__/components/Header.test.tsx`
  - `client/src/__tests__/integration/signup-flow.test.ts`

Comandos para rodar e validar localmente:

Backend:
```powershell
cd api
.\mvnw.cmd test
```

Frontend:
```bash
cd client
npm test -- --watchAll=false
```

Se deseja, eu executo os comandos e trago o output dos testes (incluindo mensagens de falha explicativas).