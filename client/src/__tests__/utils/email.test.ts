import { isEmailValid, getEmailValidationMessage } from "@/utils/email";

describe("Email Validation Utils", () => {
  // TESTE 1 - DEVE PASSAR: Email válido
  test("should validate a correct email format", () => {
    const email = "user@example.com";
    expect(isEmailValid(email)).toBe(true);
  });

  // TESTE UNITÁRIO - Email com estrutura válida
  test("should accept email with numbers and dots", () => {
    const email = "user.name123@company.co.uk";
    expect(isEmailValid(email)).toBe(true);
  });

  // TESTE UNITÁRIO - Email inválido (sem @)
  test("should reject email without @", () => {
    const email = "userexample.com";
    expect(isEmailValid(email)).toBe(false);
  });

  // TESTE UNITÁRIO - Email vazio
  test("should reject empty email", () => {
    expect(isEmailValid("")).toBe(false);
  });

  // TESTE UNITÁRIO - Validação com mensagem
  test("should return appropriate validation message for invalid email", () => {
    const message = getEmailValidationMessage("invalid");
    expect(message).toContain("Email inválido");
  });
});
