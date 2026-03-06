describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper form structure', () => {
    cy.get('h1').should('exist');
    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('exist');
    cy.getByTestId('guests-input').should('exist');
    cy.getByTestId('check-in-input').should('exist');
    cy.getByTestId('check-out-input').should('exist');
  });

  it('should have accessible buttons', () => {
    cy.getByTestId('submit-button').should('be.visible');
    cy.getByTestId('submit-button').should(
      'not.have.attr',
      'aria-disabled',
      'true',
    );
  });

  it('should support keyboard navigation', () => {
    // Only test focus on enabled elements
    cy.getByTestId('guests-input').focus();
    cy.getByTestId('guests-input').should('be.focused');

    cy.getByTestId('check-in-input').focus();
    cy.getByTestId('check-in-input').should('be.focused');

    cy.getByTestId('check-out-input').focus();
    cy.getByTestId('check-out-input').should('be.focused');
  });

  it('should show proper page structure', () => {
    cy.get('nav').should('exist');
    cy.get('main').should('exist');
  });
});
