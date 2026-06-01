# Documentação dos Testes - Backend

Este documento descreve os testes backend (Junit) conforme o padrão solicitado.

Arquivos de teste presentes:
- `api/src/test/java/com/demoapp/demo/service/UserServiceTest.java`

Testes (exatamente 3):

1) `Deve aceitar e-mail válido com usuário e domínio`
- Cenário: validar e-mail no formato usuário@dominio.com
- Entrada: `user@example.com`
- Esperado: `true`
- Obtido: (valor retornado em execução)
- Observação: teste de sucesso

2) `Deve criar usuário com email e senha válidos`
- Cenário: criação de usuário com dados válidos
- Entrada: `email=newuser@example.com`, senha=`<oculta>`
- Esperado: usuário criado com `id`, `email` e `password` armazenados
- Obtido: (valores retornados em execução)
- Observação: usa `assertAll` para múltiplas validações

3) `BUG: Deve rejeitar e-mail sem domínio após o @`
- Cenário: validar e-mail sem domínio após o caractere `@`
- Entrada: `invalid@`
- Esperado: `false`
- Obtido: (valor retornado em execução) — este teste deve falhar propositalmente se o bug existir
- Motivo da falha: o validador atual aceita apenas a presença de `@` e não verifica domínio

Cada teste usa `@DisplayName`, organização Given/When/Then e mensagens detalhadas nos asserts, mostrando cenário, entrada, esperado, obtido e motivo quando aplicável.
