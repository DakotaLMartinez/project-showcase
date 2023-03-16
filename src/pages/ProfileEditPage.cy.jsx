import React from "react";
import "../index.css";
import ProfileEditPage from "./ProfileEditPage";

describe("<ProfileEditPage />", async () => {
  it("allows adding a profile picture and removing it", () => {
    cy.wrappedMount(<ProfileEditPage />);

    cy.get("[data-cy=avatar-placeholder]").should("exist");

    cy.chooseFile({
      fileName: "avatar-picture.jpg",
      fileType: "image/jpeg",
      inputSelector: "[name=avatar]",
    });

    cy.get("[data-cy=avatar]").should("exist");
    cy.get("[data-cy=delete-avatar]").click();
    cy.get("[data-cy=avatar-placeholder]").should("exist");

  });
});
