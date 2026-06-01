import { isEmailValid } from "@/utils/email";

describe("Email Validation Utils - Testes Puras (1)", () => {
  test("deve validar e-mail no formato correto - usuário@dominio", () => {
    // Arrange
    const email = "user@example.com";

    // Act
    const resultadoObtido = isEmailValid(email);

    // Assert
    expect(resultadoObtido).toBe(true);
  });
});
