import React from "react";
import { render, screen } from "@testing-library/react";
import PostCard from "@/components/PostCard";

describe("PostCard Component - Unidade", () => {
  test("deve exibir quantidade de likes e dislikes do post", () => {
    render(
      <PostCard
        post={{
          id: 1,
          title: "Post de teste",
          body: "Conteudo do post de teste",
          reactions: {
            likes: 12,
            dislikes: 3,
          },
          liked: false,
        }}
        isAuthenticated={false}
        onLike={jest.fn()}
      />
    );

    expect(screen.getByText("Likes: 12 | Dislikes: 3")).toBeInTheDocument();
  });
});
