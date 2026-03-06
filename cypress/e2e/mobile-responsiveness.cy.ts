describe('Mobile Responsiveness', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display correctly on mobile viewport', () => {
    cy.viewport(375, 667); // iPhone dimensions

    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('be.visible');
    cy.getByTestId('guests-input').should('be.visible');
    cy.getByTestId('check-in-input').should('be.visible');
    cy.getByTestId('check-out-input').should('be.visible');
  });

  it('should allow form interaction on mobile', () => {
    cy.viewport(375, 667);

    // Test that inputs can be focused on mobile
    cy.getByTestId('guests-input').focus();
    cy.getByTestId('guests-input').should('be.focused');

    cy.getByTestId('check-in-input').focus();
    cy.getByTestId('check-in-input').should('be.focused');

    cy.getByTestId('check-out-input').focus();
    cy.getByTestId('check-out-input').should('be.focused');
  });

  it('should display correctly on tablet viewport', () => {
    cy.viewport(768, 1024); // iPad dimensions

    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('be.visible');
    cy.getByTestId('submit-button').should('be.visible');
  });

  it('should display correctly on desktop viewport', () => {
    cy.viewport(1280, 720); // Desktop dimensions

    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('be.visible');
    cy.getByTestId('submit-button').should('be.visible');
  });
});
