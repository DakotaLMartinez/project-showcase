import { describe, expect, it } from "vitest"

import App from "./App";
import { BrowserRouter } from 'react-router-dom'

import { render, screen, userEvent } from "./test-utils/testing-library-utils";



describe("Simple working test", () => {

  it("the title is visible", () => {

    render(<App />);

    const welcomeText = screen.getByText(/Project Showcase/i);

    screen.debug(welcomeText);

    expect(welcomeText).toBeInTheDocument();

  });




  // it("should increment count on click", async () => {

  //   render(<BrowserRouter><App /></BrowserRouter>);

  //   userEvent.click(screen.getByRole("button"));

  //   expect(await screen.findByText(/count is: 1/i)).toBeInT;
  // });

});
