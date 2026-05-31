package com.demoapp.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import com.demoapp.demo.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserRepository userRepository;

  private ObjectMapper objectMapper = new ObjectMapper();

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
  }

  // TESTE PASSANDO: Signup com dados válidos
  @Test
  void testSignup_WithValidEmailAndPassword_ReturnsSuccess() throws Exception {
    String requestBody = objectMapper.writeValueAsString(new Object() {
      public String email = "newuser@test.com";
      public String password = "SecurePass123!";
    });

    mockMvc.perform(post("/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(requestBody))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.email", equalTo("newuser@test.com")));
  }

  // TESTE PASSANDO: Signin com credenciais corretas
  @Test
  void testSignin_WithValidCredentials_ReturnsUser() throws Exception {
    // Criar usuário primeiro
    String signupBody = objectMapper.writeValueAsString(new Object() {
      public String email = "user@test.com";
      public String password = "ValidPass123!";
    });

    mockMvc.perform(post("/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(signupBody))
      .andExpect(status().isOk());

    // Fazer login
    mockMvc.perform(post("/auth/signin")
        .contentType(MediaType.APPLICATION_JSON)
        .content(signupBody))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.email", equalTo("user@test.com")));
  }

  // TESTE FALHANDO: Bug real - Password validation frontend vs backend diverge
  // Frontend rejeita password com <= 8 caracteres
  // Backend regex aceita exatamente 8 caracteres: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$"
  // Uma senha com exatamente 8 caracteres será rejeitada pelo frontend
  // mas o backend aceitará na validação isPasswordValid()
  @Test
  void testSignup_With8CharPassword_FrontendRejectsButBackendMightAccept() throws Exception {
    String password8Chars = "Pass1@ab"; // Exatamente 8 caracteres: maiúscula, minúscula, número, special
    String requestBody = objectMapper.writeValueAsString(new Object() {
      public String email = "test@example.com";
      public String password = password8Chars;
    });

    // Backend aceita (validação passa)
    // Mas frontend rejeita porque isPasswordValid() faz: password.length <= 8
    mockMvc.perform(post("/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(requestBody))
      .andExpect(status().isOk()) // Backend aceita
      .andExpect(jsonPath("$.email", equalTo("test@example.com")));
    
    // Este teste falha porque frontend nunca enviaria isso
    // mas mostra o bug: frontend e backend têm critérios diferentes
  }

}
