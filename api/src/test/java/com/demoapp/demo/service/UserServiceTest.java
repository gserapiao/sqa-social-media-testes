package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
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

  // TESTE 1 - DEVE PASSAR: Email válido
  @Test
  void testIsEmailValid_WithValidEmail() {
    String validEmail = "user@example.com";
    
    boolean result = userService.isEmailValid(validEmail);
    
    assertTrue(result, "Email válido deve retornar true");
  }

  // TESTE 2 - DEVE PASSAR: Criar usuário com dados válidos
  @Test
  void testCreateUser_WithValidData() {
    String email = "newuser@example.com";
    String password = "ValidPass123!";
    
    User createdUser = userService.createUser(email, password);
    
    assertNotNull(createdUser.getId(), "Usuário criado deve ter um ID");
    assertEquals(email, createdUser.getEmail(), "Email deve ser o mesmo");
    assertEquals(password, createdUser.getPassword(), "Senha deve ser a mesma");
  }

  // TESTE 3 - DEVE FALHAR: Bug real - validador de email aceita emails inválidos
  // O método isEmailValid() apenas faz email.contains("@")
  // Isso aceita emails como "invalid@" ou "@domain" que não são válidos
  @Test
  void testIsEmailValid_ShouldRejectInvalidEmailFormat() {
    String invalidEmail = "invalid@"; // Sem domínio - inválido mas passa na validação atual
    
    boolean result = userService.isEmailValid(invalidEmail);
    
    assertFalse(result, "Email sem domínio 'invalid@' deveria ser inválido");
  }

}
