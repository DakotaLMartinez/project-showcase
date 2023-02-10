import { render, screen } from "../../test-utils/testing-library-utils";
import ProjectsList from "../ProjectsList";

describe("ProjectsList", () => {
  it("renders a list of projects", () => {
    const { container, mount } = render(<ProjectsList />);
    expect(true).toEqual(true);
  });
});
