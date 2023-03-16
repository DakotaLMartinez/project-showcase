import React from "react";
import "../index.css";
import ProfileEditPage from "./ProfileEditPage";

describe("<ProfileEditPage />", async () => {
  it("allows adding a profile picture and removing it when profile has no avatar attached", () => {
    cy.wrappedMount(<ProfileEditPage />);
    cy.get("[data-cy=delete-avatar]").click();
    cy.submitForm("#editProfile");

    cy.get("[data-cy=avatar-placeholder]").should("exist");
    
    cy.chooseFile({
      fileName: "avatar-picture.jpg",
      fileType: "image/jpeg",
      inputSelector: "[name=avatar]",
    });
    
    cy.get("[data-cy=avatar]").should("exist");
    cy.get("[data-cy=delete-avatar]").click();
    cy.get("[data-cy=avatar-placeholder]").should("exist");
    
    cy.chooseFile({
      fileName: "avatar-picture.jpg",
      fileType: "image/jpeg",
      inputSelector: "[name=avatar]",
    });
    
    cy.submitForm("#editProfile");
  });
  
  it("displays the placeholder when a saved avatar is removed", () => {
    cy.wrappedMount(<ProfileEditPage />);
    
    cy.get("[data-cy=delete-avatar]").click();
    cy.get("[data-cy=avatar-placeholder]").should("exist");

    cy.submitForm("#editProfile");
  })
});
