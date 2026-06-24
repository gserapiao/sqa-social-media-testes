import { test, expect } from "@playwright/test";

test("E2E Curtir post sem autenticacao exibe alerta nativo", async ({ page }) => {
  // Arrange - abre a home como usuario deslogado
  await page.goto("/");

  const botaoCurtir = page.getByRole("button", { name: /Curtir/i }).first();
  await expect(botaoCurtir).toBeVisible();

  // Prepara o Playwright para capturar e aceitar o alert assim que ele aparecer
  let mensagemDoAlerta = "";

  page.once("dialog", async (dialog) => {
    mensagemDoAlerta = dialog.message();
    await dialog.accept();
  });

  // Act - clica em Curtir sem estar autenticado
  await botaoCurtir.click();

  // Assert - valida a mensagem do alert
  expect(mensagemDoAlerta).toBe(
    "Você precisa estar autenticado para curtir posts!"
  );
});