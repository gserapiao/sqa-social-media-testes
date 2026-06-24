import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";
import { AuthProvider } from "../../contexts/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Header Component - Unidade (1)", () => {
  test("deve exibir 'Entrar' e 'Criar Conta' para usuário deslogado", () => {
    localStorage.removeItem("sqa_social_user");

    // Act - renderizar Header dentro do AuthProvider real
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const entrar = screen.getByRole("button", { name: /entrar/i });
    const criar = screen.getByRole("button", { name: /criar conta/i });

    expect(entrar).toBeInTheDocument();
    expect(criar).toBeInTheDocument();
  });
});
