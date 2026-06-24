import { isEmailValid } from "@/utils/email";

describe("Email Validation Utils - Testes Puras (1)", () => {
  test("deve validar e-mail no formato correto - usuário@dominio", () => {
    // Arrange: Define
    const email = "user@example.com";

    // Act: Executa 
    const resultadoObtido = isEmailValid(email);

    // Assert: Verifica
    expect(resultadoObtido).toBe(true);
  });
});
