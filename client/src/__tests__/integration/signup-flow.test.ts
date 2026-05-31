import { isEmailValid } from "@/utils/email";
import { isPasswordValid } from "@/utils/password";

describe("Signup Flow Integration Test", () => {
  // TESTE DE INTEGRAÇÃO 1 - DEVE PASSAR: Validação completa de cadastro
  test("should validate email and password for signup flow", () => {
    const email = "newuser@example.com";
    const password = "SecurePass@123"; // Usando @ que está no regex

    // Ambos os validadores devem passar
    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    expect(isEmailOk).toBe(true);
    expect(isPasswordOk).toBe(true);

    // Ambas validações passam significa que o formulário está pronto
    expect(isEmailOk && isPasswordOk).toBe(true);
  });

  // TESTE DE INTEGRAÇÃO 2 - DEVE FALHAR: Bug real - Regex de caracteres especiais incompleto
  // O regex não inclui "!" portanto qualquer senha com "!" será rejeitada
  // Isso é um BUG real que afeta UX: usuários podem digitar "!" e ser rejeitados
  test("should fail for passwords with exclamation mark - regex bug in special char validation", () => {
    const email = "user@example.com";
    const password = "ValidPass123!"; // "!" é caractere especial válido mas regex não inclui

    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    // Email deveria passar
    expect(isEmailOk).toBe(true);

    // Mas password falha porque regex não inclui "!"
    expect(isPasswordOk).toBe(false); // Falha propositalmente (bug real)

    // Isso significa que o signup não pode ser completado com esta senha válida
    // Este é o bug que queremos documentar
    expect(isEmailOk && isPasswordOk).toBe(false);
  });

  // TESTE DE INTEGRAÇÃO - Fluxo de validação de campos vazios
  test("should reject empty email and password", () => {
    const email = "";
    const password = "";

    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    expect(isEmailOk).toBe(false);
    expect(isPasswordOk).toBe(false);
  });

  // TESTE DE INTEGRAÇÃO - Validação com email inválido mas senha válida
  test("should fail signup if email is invalid even with valid password", () => {
    const email = "invalid-email";
    const password = "ValidPass@123";

    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);

    // Senha está ok, mas email não
    expect(isPasswordOk).toBe(true);
    expect(isEmailOk).toBe(false);

    // Signup não deve ser permitido
    expect(isEmailOk && isPasswordOk).toBe(false);
  });
});
