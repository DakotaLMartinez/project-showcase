describe("signup", () => {
  beforeEach(() => {
    cy.teardownTestUser({
      email: "test@cypress.io",
      password: "password"
    })
  })
  it("shows the profile page when successful", () => {
    cy.goto("/");

    cy.contains("Signup").click();

    cy.get('#signup [name="email"]').type("test@cypress.io");
    cy.get('#signup [name="password"]').type("password");
    cy.get('#signup [name="password_confirmation"]').type("password");
    cy.get('#signup form').submit();

    // cy.get("email")
    cy.contains("test@cypress.io");
    cy.contains(/No projects yet/i);
    cy.pathIncludes("/profile");
  });

  it("displays an error message upon failure", () => {
    cy.goto("/");

    cy.contains("Signup").click();

    cy.get('#signup [name="email"]').type("test@cypress.io");
    cy.get('#signup [name="password"]').type("password");
    cy.get('#signup [name="password_confirmation"]').type("passwore");
    cy.get('#signup form').submit();

    // cy.get("email")
    cy.contains(
      "User couldn't be created successfully. Password confirmation doesn't match Password"
    );
  });

  it("can be canceled", () => {
    cy.goto("/");

    cy.contains("Signup").click();
    cy.get("#signup").should("have.class", "top-0");
    cy.get("#signup").contains("Cancel").click();
    cy.get("#signup").should("not.have.class", "top-0");
  });
});
