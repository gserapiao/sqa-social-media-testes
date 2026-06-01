import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component - Unidade (1)", () => {
  test("deve renderizar botão e disparar onClick quando clicado", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);

    // Act
    const button = screen.getByText("Clique");
    button.click();

    // Assert
    expect(button).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
