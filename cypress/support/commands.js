// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("goto", (endpoint) => {
  return cy.visit(Cypress.env("host") + endpoint);
});

Cypress.Commands.add("fillIn", (selector, value) => {
  cy.get(selector).clear().type(value);
});

Cypress.Commands.add("fillOutFields", (formSelector, formData) => {
  for (const [fieldName, value] of Object.entries(formData)) {
    if (value) {
      cy.get(`${formSelector} [name=${fieldName}]`).clear().type(value);
    } else {
      cy.get(`${formSelector} [name=${fieldName}]`).clear();
    }
  }
});

Cypress.Commands.add("login", ({ email, password }) => {
  cy.goto("/");

  cy.contains("Login").click();

  cy.get('#login [name="email"]').type(email);
  cy.get('#login [name="password"]').type(password);
  cy.get("#login form").submit();
});

Cypress.Commands.add("signup", ({ username, password }) => {
  cy.goto("/");

  cy.contains("Signup").click();

  cy.get('#signup [name="email"]').type(username);
  cy.get('#signup [name="password"]').type(password);
  cy.get('#signup [name="password_confirmation"]').type(password);
  cy.get("#signup form").submit();
});

Cypress.Commands.add("submitForm", (formSelector) => {
  cy.get(formSelector).submit();
});

Cypress.Commands.add("pathIncludes", (path) => {
  cy.location("pathname").should("include", path);
});

Cypress.Commands.add("chooseFile", ({ fileType, fileName, inputSelector }) => {
  cy.fixture(fileName, "binary")
    .then(Cypress.Blob.binaryStringToBlob)
    .then((fileContent) => {
      cy.get(inputSelector).then((subject) => {
        const testFile = new File([fileContent], fileName, {
          type: fileType,
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        const fileList = dataTransfer.files;
        const fileInput = subject[0];
        fileInput.files = fileList;
        cy.wrap(subject).trigger("change", { force: true });
      });
    });
});

Cypress.Commands.add("teardownTestUser", ({ email, password }) => {
  cy.login({ email, password });
  cy.get("[data-cy=notification").then(el => {
    if (el.text() === "Logged in successfully") {
      cy.contains("Delete Profile").click();
    }
  })
})