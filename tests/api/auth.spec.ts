import { expect, test } from "@playwright/test";

const API_BASE_URL = "http://localhost:8080";
const SENHA_FORTE = "Senha@123";

function emailUnico(prefixo: string) {
  return `${prefixo}.${Date.now()}.${Math.random().toString(36).slice(2)}@teste.com`;
}

test("API Signup com sucesso", async ({ request }) => {

  const email = emailUnico("signup.sucesso");

  const response = await request.post(`${API_BASE_URL}/auth/signup`, {
    data: { email, password: SENHA_FORTE },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email,
      password: SENHA_FORTE,
    })
  );
});

test("API Signup com e-mail duplicado", async ({ request }) => {

  const email = emailUnico("signup.duplicado");
  await request.post(`${API_BASE_URL}/auth/signup`, {
    data: { email, password: SENHA_FORTE },
  });

  const response = await request.post(`${API_BASE_URL}/auth/signup`, {
    data: { email, password: SENHA_FORTE },
  });
  const body = await response.json();

  expect(response.status()).toBe(409);
 // expect(body.status).toBe(409);
  expect(body.message).toContain("E-mail");
  expect(body.message).toContain("uso");
});

test("API Signin com sucesso", async ({ request }) => {
  // Arrange
  const email = emailUnico("signin.sucesso");
  await request.post(`${API_BASE_URL}/auth/signup`, {
    data: { email, password: SENHA_FORTE },
  });

  // Act
  const response = await request.post(`${API_BASE_URL}/auth/signin`, {
    data: { email, password: SENHA_FORTE },
  });
  const body = await response.json();

  // Assert
  expect(response.status()).toBe(200);
  expect(body).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email,
      password: SENHA_FORTE,
    })
  );
});

test("API Signin com credenciais invalidas", async ({ request }) => {
  // Arrange
  const email = emailUnico("signin.invalido");

  // Act
  const response = await request.post(`${API_BASE_URL}/auth/signin`, {
    data: { email, password: SENHA_FORTE },
  });
  const body = await response.json();

  // Assert
  expect(response.status()).toBe(401);
  expect(body.status).toBe(401);
  expect(body.message).toContain("Credenciais");
});
