import { isEmailValid } from "@/utils/email";
import { isPasswordValid } from "@/utils/password";

describe("Signup Flow - Integração (2)", () => {
  test("deve validar email e senha válidos para o fluxo de signup", () => {
    const email = "newuser@example.com";
    const password = "SecurePass@123";

    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    expect(isEmailOk).toBe(true);
    expect(isPasswordOk).toBe(true);
    expect(isEmailOk && isPasswordOk).toBe(true);
  });

  test("deve rejeitar dados inválidos antes do envio do signup", () => {
    const email = "invalid@";
    const password = "fraca";

    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    expect(isEmailOk).toBe(false);
    expect(isPasswordOk).toBe(false);
    expect(isEmailOk && isPasswordOk).toBe(false);
  });
});
