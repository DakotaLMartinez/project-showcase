import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event"

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: Router, ...options });

export * from "@testing-library/react";
// override render method
export { renderWithContext as render };
export { userEvent }