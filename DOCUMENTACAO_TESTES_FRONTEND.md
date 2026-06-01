# Documentação dos Testes - Frontend

Distribuição solicitada e implementada (exatamente 6 testes):

Testes de funções puras (2):
- `client/src/__tests__/utils/email.test.ts`
  1) `deve validar e-mail no formato correto - usuário@dominio` (passa)
     - Cenário: validar formato de e-mail
     - Entrada: `user@example.com`
     - Esperado: `true`
- `client/src/__tests__/utils/password.test.ts`
  2) `deve aceitar senha forte com maiúscula, minúscula, número e caractere especial` (passa)
     - Cenário: validar senha que atende todos os critérios
     - Entrada: `Senha@123`
     - Esperado: `true`

Testes de componentes React (2):
- `client/src/__tests__/components/Button.test.tsx`
   1) `deve renderizar botão e disparar onClick quando clicado` (passa)
       - Cenário: render do `Button` e clique do usuário
       - Entrada: botão com texto `Clique`
       - Esperado: botão presente e handler chamado 1 vez
- `client/src/__tests__/components/Header.test.tsx`
   2) `deve exibir 'Entrar' e 'Criar Conta' para usuário deslogado` (passa)
       - Cenário: usuário não autenticado acessa a aplicação
       - Entrada: estado de autenticação = deslogado (mock)
       - Esperado: botões visíveis `Entrar` e `Criar Conta`

Testes de integração (2):
- `client/src/__tests__/integration/signup-flow.test.ts`
  1) `deve validar email e senha válidos para o fluxo de signup` (passa)
     - Cenário: validação completa de formulário
     - Entrada: `email=newuser@example.com`, `password=SecurePass@123`
     - Esperado: ambos validadores retornam `true`
  2) `BUG: falha de persistência entre saveUser/getUser devido a chave inconsistente no localStorage` (FALHA PROPOSITAL)
     - Cenário: persistência de usuário no fluxo de signup (salvar e recuperar do localStorage)
     - Entrada: objeto usuário `{ id: 1, email: "persist@test.com" }` via `saveUser()`
     - Esperado: `getUser()` retorna o objeto salvo
     - Obtido: `null` (bug documentado: `saveUser` usa chave diferente de `getUser`, impedindo recuperação)

Notas:
- Ajustei a pasta `client/src/__tests__` para conter exatamente os 6 testes acima.
- Removi testes extras que excediam a contagem solicitada.
- Cada teste segue o padrão `Arrange / Act / Assert` e nomes `deve ...`.
