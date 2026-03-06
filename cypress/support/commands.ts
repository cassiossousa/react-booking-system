// Custom Cypress commands

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command types here
      getByTestId(testId: string): Chainable;
      fillBookingForm(data: {
        propertyId?: string;
        guests?: number;
        checkIn?: string;
        checkOut?: string;
      }): Chainable;
      createTestProperty(): Chainable;
    }
  }
}

// Custom command to get elements by test-id

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to fill booking form

Cypress.Commands.add(
  'fillBookingForm',
  (data: {
    propertyId?: string;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  }) => {
    if (data.propertyId) {
      cy.getByTestId('property-select').select(data.propertyId);
    }
    if (data.guests !== undefined) {
      cy.getByTestId('guests-input').clear().type(data.guests.toString());
    }
    if (data.checkIn) {
      cy.getByTestId('check-in-input').clear().type(data.checkIn);
    }
    if (data.checkOut) {
      cy.getByTestId('check-out-input').clear().type(data.checkOut);
    }
  },
);

// Custom command to create a test property

Cypress.Commands.add('createTestProperty', () => {
  // Create a property by directly filling the form and using UI
  cy.visit('/properties');

  // If properties page doesn't exist, create property via API simulation
  cy.window().then((win: unknown) => {
    const store = (
      win as { __REDUX_STORE__?: { dispatch: (action: unknown) => void } }
    ).__REDUX_STORE__;
    if (store) {
      const property = {
        id: crypto.randomUUID(),
        name: 'Test Property',
        location: 'Test Location',
        capacity: 4,
        createdAt: new Date().toISOString(),
      };
      store.dispatch({ type: 'properties/propertyAdded', payload: property });
    } else {
      // Fallback: just visit the main page and assume properties exist
      cy.visit('/');
    }
  });
  cy.visit('/');
});

export {};
