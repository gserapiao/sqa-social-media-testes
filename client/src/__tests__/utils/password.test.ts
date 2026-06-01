import { isPasswordValid } from "@/utils/password";

describe("Password Validation Utils - Testes Puras (1)", () => {
  test("deve aceitar senha forte com maiúscula, minúscula, número e caractere especial", () => {
    // Arrange
    const senha = "Senha@123";

    // Act
    const resultadoObtido = isPasswordValid(senha);

    // Assert
    expect(resultadoObtido).toBe(true);
  });
});
