// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/react18";
import { BrowserRouter } from "react-router-dom";

import AuthenticatedWrapper from "./AuthenticatedWrapper";
import AuthProvider from "../../src/context/AuthContext";
import NotificationProvider from "../../src/context/NotificationContext";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("wrappedMount", (children, credentials={email: "testuser@cypress.io", password: "password"}) => {
  return mount(
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AuthenticatedWrapper credentials={credentials}>
            {children}
          </AuthenticatedWrapper>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});

// Example use:
// cy.mount(<MyComponent />)
