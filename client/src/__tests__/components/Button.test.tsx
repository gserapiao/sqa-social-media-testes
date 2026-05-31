import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component", () => {
  // TESTE UNITÁRIO - Button renderiza com texto
  test("should render button with text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  // TESTE UNITÁRIO - Button renderiza com variant primary
  test("should render button with primary variant by default", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  // TESTE UNITÁRIO - Button renderiza com variant outline
  test("should render button with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByText("Outline Button");
    expect(button).toBeInTheDocument();
  });

  // TESTE UNITÁRIO - Button pode ser desativado
  test("should render disabled button", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  // TESTE UNITÁRIO - Button pode ter onClick handler
  test("should call onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText("Click me");
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
