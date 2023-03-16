describe("login", () => {
  it("shows the profile page when successful", () => {
    cy.goto("/");

    cy.contains("Login").click();

    cy.get('#login [name="email"]').type("test@test.com");
    cy.get('#login [name="password"]').type("password");
    cy.get("#login form").submit();

    cy.contains("test@test.com");
    cy.contains(/No projects yet/i);
    cy.pathIncludes("/profile");
  });

  it("shows an error message when provided with invalid credentials", () => {
    cy.goto("/");

    cy.contains("Login").click();

    cy.get('#login [name="email"]').type("test@test.com");
    cy.get('#login [name="password"]').type("wrongpassword");
    cy.get("#login form").submit();

    cy.contains(/Invalid Email or Password/i);
  });

  it("can be canceled", () => {
    cy.goto("/");

    cy.contains("Login").click();

    cy.get("#login").should("have.class", "top-0");
    cy.get("#login").contains("Cancel").click();
    cy.get("#login").should("not.have.class", "top-0");
  });
});
