package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.demoapp.demo.model.User;
import com.demoapp.demo.repository.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
class UserServiceTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
  }

  @Test
  @DisplayName("Deve aceitar e-mail válido com usuário e domínio")
  void deveAceitarEmailValidoComUsuarioEDominio() {
    // Given
    String emailValido = "user@example.com";

    // When - validar o e-mail
    boolean resultadoObtido = userService.isEmailValid(emailValido);

    // Then - sistema deve aceitar o e-mail
    assertTrue(
        resultadoObtido,
        "FALHA NA VALIDAÇÃO DE E-MAIL\n\n" +
        "Cenário testado: Validar e-mail com formato usuário@dominio.com.\n" +
        "Entrada usada: " + emailValido + "\n" +
        "Resultado esperado: true (e-mail válido)\n" +
        "Resultado obtido: " + resultadoObtido + "\n"
    );
  }

  @Test
  @DisplayName("Deve criar usuário com email e senha válidos")
  void deveCriarUsuarioComEmailESenhaValidos() {
    // Given - dados válidos de cadastro
    String email = "newuser@example.com";
    String senha = "ValidPass123!";

    // When - criar usuário
    User usuarioCriado = userService.createUser(email, senha);

    // Then - validar propriedades do usuário criado
    assertAll(
        "Validações do usuário criado",
        () -> assertNotNull(
            usuarioCriado.getId(),
            "FALHA NA CRIAÇÃO DE USUÁRIO\n\n" +
            "Cenário testado: Criar usuário com email e senha válidos.\n" +
            "Entrada usada: email=" + email + ", senha=<oculta>\n" +
            "Resultado esperado: usuário criado com ID, email e senha armazenados corretamente.\n" +
            "Resultado obtido: id=" + usuarioCriado.getId() + "\n"
        ),
        () -> assertEquals(
            email,
            usuarioCriado.getEmail(),
            "FALHA NA CRIAÇÃO DE USUÁRIO - EMAIL\n\n" +
            "Cenário testado: Criar usuário com email válido.\n" +
            "Entrada usada: email=" + email + "\n" +
            "Resultado esperado: email do usuário criado igual a entrada.\n" +
            "Resultado obtido: " + usuarioCriado.getEmail() + "\n"
        ),
        () -> assertEquals(
            senha,
            usuarioCriado.getPassword(),
            "FALHA NA CRIAÇÃO DE USUÁRIO - SENHA\n\n" +
            "Cenário testado: Criar usuário com senha válida.\n" +
            "Entrada usada: senha=<oculta>\n" +
            "Resultado esperado: senha armazenada igual à entrada.\n" +
            "Resultado obtido: <valor armazenado>\n"
        )
    );
  }

  @Test
  @DisplayName("Deve rejeitar e-mail sem domínio após o @")
  void deveRejeitarEmailSemDominioAposArroba() {
    // Given - Dado que o usuário informou um e-mail inválido
    String emailInvalido = "invalid@";

    // When - Quando o sistema valida o e-mail
    boolean resultadoObtido = userService.isEmailValid(emailInvalido);

    // Then - Então o sistema deveria rejeitar o e-mail
    assertFalse(
        resultadoObtido,
        "BUG ENCONTRADO NA VALIDAÇÃO DE E-MAIL\n\n" +
        "Cenário testado:\n" +
        "Validar um e-mail sem domínio após o caractere @.\n\n" +
        "Entrada usada:\n" +
        emailInvalido + "\n\n" +
        "Resultado esperado:\n" +
        "false, pois o e-mail não possui domínio após o @.\n\n" +
        "Resultado obtido:\n" +
        resultadoObtido + "\n\n" +
        "Motivo da falha:\n" +
        "O método isEmailValid() está validando apenas a presença de '@', aceitando entradas inválidas como 'invalid@'.\n"
    );
  }

}