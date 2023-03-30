import { useState } from "react";
import "../../index.css";
import TagsInput from "./TagsInput";

function FormWrapper() {
  const [firstInput, setFirstInput] = useState([]);
  const [secondInput, setSecondInput] = useState([]);

  return (
    <>
      <p id="first">
        <TagsInput state={[firstInput, setFirstInput]} />
      </p>
      <p id="second">
        <TagsInput state={[secondInput, setSecondInput]} />
      </p>
      <p id="firstInputState">{firstInput}</p>
      <p id="secondInputState">{secondInput}</p>
    </>
  );
}

describe("<TagsInput />", () => {
  it("should allow tags to be added on blur of the input", () => {
    cy.wrappedMount(<FormWrapper />);

    cy.get("#first").click();
    cy.get("#first").type("hello");
    cy.get("#second").click();
    cy.get("#firstInputState").contains("hello");
    cy.get("#second").type("world");
    cy.get("#secondInputState").should("not.contain", "world");
    cy.get("#first").click();
    cy.get("#secondInputState").contains("world");
  });
});
