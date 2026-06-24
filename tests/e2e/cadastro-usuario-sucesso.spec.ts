import { expect, test } from "@playwright/test";

test("E2E Cadastro de usuario com sucesso", async ({ page }) => {
  // Arrange
  const email = `e2e.cadastro.${Date.now()}@teste.com`;
  const senha = "Senha@123";

  await page.goto("/");

  // Act
  await page.getByRole("button", { name: /Criar Conta/i }).click();
  await expect(page).toHaveURL(/\/signup$/);

  await page.getByPlaceholder("seu@email.com").fill(email);
  await page.locator('input[type="password"]').nth(0).fill(senha);
  await page.locator('input[type="password"]').nth(1).fill(senha);
  await page.locator("form").getByRole("button", { name: /Criar Conta/i }).click();

  // Assert
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: /Sair|Posts Curtidos/i }).first()).toBeVisible();
});
