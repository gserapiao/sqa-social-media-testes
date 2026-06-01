import { isEmailValid } from "@/utils/email";
import { isPasswordValid } from "@/utils/password";

describe("Signup Flow - Integração (2)", () => {
  test("deve validar email e senha válidos para o fluxo de signup", () => {
    // Arrange
    const email = "newuser@example.com";
    const password = "SecurePass@123"; // '@' está no regex

    // Act
    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    // Assert
    expect(isEmailOk).toBe(true);
    expect(isPasswordOk).toBe(true);
    expect(isEmailOk && isPasswordOk).toBe(true);
  });

  test("BUG: falha de persistência entre saveUser/getUser devido a chave inconsistente no localStorage", () => {
    // Arrange - limpar armazenamento
    localStorage.removeItem("sqa_social_user");
    const user = { id: 1, email: "persist@test.com" };

    // Act - salvar e recuperar
    const { saveUser, getUser } = require("../../lib/localStorage");
    saveUser(user);
    const recuperado = getUser();

    // Assert - esperamos que o usuário seja recuperado, mas existe um bug de chave
    expect(recuperado).not.toBeNull(); // Este assert deve falhar devido ao bug real
  });
});
