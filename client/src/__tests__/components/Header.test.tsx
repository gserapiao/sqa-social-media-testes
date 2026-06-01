import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";
import { AuthProvider } from "../../contexts/AuthContext";

// Mock useRouter from next/navigation (Header uses router.push)
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Header Component - Unidade (1)", () => {
  test("deve exibir 'Entrar' e 'Criar Conta' para usuário deslogado", () => {
    // Arrange - garantir que não há usuário no localStorage
    localStorage.removeItem("sqa_social_user");

    // Act - renderizar Header dentro do AuthProvider real
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    // Assert - botões esperados para usuário deslogado
    const entrar = screen.getByRole("button", { name: /entrar/i });
    const criar = screen.getByRole("button", { name: /criar conta/i });

    expect(entrar).toBeInTheDocument();
    expect(criar).toBeInTheDocument();
  });
});
