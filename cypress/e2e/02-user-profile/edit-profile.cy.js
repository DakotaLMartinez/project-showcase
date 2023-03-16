describe("Editing my profile", () => {
  beforeEach(() => {
    cy.login({ email: "testuser@cypress.io", password: "password" });
    cy.contains("Edit Profile").click();
    cy.get("[data-cy=delete-avatar]").click();
    cy.get("[name=hide_email").uncheck();
    cy.fillOutFields("#editProfile", {
      name: "",
      linkedin_url: "",
      github_url: "",
      twitter_url: "",
    });
    cy.submitForm("#editProfile");
  });

  it("should update the user's profile", () => {
    cy.contains("Edit Profile").click();
    cy.fillIn("[name=name]", "I'm a test user");
    cy.submitForm("#editProfile");
    cy.contains("I'm a test user");
    cy.get("[data-cy=social-links]").children().should("have.length", 0);

    cy.contains("Edit Profile").click();
    cy.fillIn("[name=linkedin_url]", "https://linkedin.com/in/testuser");
    cy.submitForm("#editProfile");
    cy.get("[data-cy=social-links]").children().should("have.length", 1);
    cy.get("[data-cy='linkedin-link']").should(
      "have.attr",
      "href",
      "https://linkedin.com/in/testuser"
    );

    cy.contains("Edit Profile").click();
    cy.fillIn("[name=github_url]", "https://github.com/testuser");
    cy.submitForm("#editProfile");
    cy.get("[data-cy=social-links]").children().should("have.length", 2);
    cy.get("[data-cy=github-link]").should(
      "have.attr",
      "href",
      "https://github.com/testuser"
    );

    cy.contains("Edit Profile").click();
    cy.fillIn("[name=twitter_url]", "https://twitter.com/testuser");
    cy.submitForm("#editProfile");
    cy.pathIncludes("/profile");
    cy.get("[data-cy=twitter-link]").should(
      "have.attr",
      "href",
      "https://twitter.com/testuser"
    );

    cy.get("aside").contains("testuser@cypress.io");
    cy.contains("Edit Profile").click();
    cy.get("[name=hide_email]").check();
    cy.submitForm("#editProfile");
    cy.get("aside").contains("testuser@cypress.io").should("not.exist");

    cy.get("aside [data-cy=avatar-placeholder]").should("exist");
    cy.contains("Edit Profile").click();
    cy.get("[data-cy=avatar-placeholder]").should("exist");
    
    cy.chooseFile({
      fileName: "avatar-picture.jpg",
      fileType: "image/jpeg",
      inputSelector: "[name=avatar]",
    });

    cy.get("[data-cy=avatar]").should("exist");
    cy.submitForm("#editProfile");
    cy.pathIncludes("/profile");
    cy.get("[data-cy=avatar]").should("exist");
    
    cy.contains("Edit Profile").click();
    cy.get("[data-cy=delete-avatar]").click();
    cy.submitForm("#editProfile");
    cy.pathIncludes("/profile");
    cy.get("[data-cy=avatar-placeholder]").should("exist");
  });
});
