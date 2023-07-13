import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders trivia page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Trivia/i);
  expect(linkElement).toBeInTheDocument();
});
