describe('Properties Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show empty state when no properties exist', () => {
    cy.getByTestId('property-select').should('be.disabled');
    cy.getByTestId('submit-button').should('be.disabled');
  });

  it('should navigate to properties page', () => {
    cy.get('a[href*="properties"]').click();
    cy.url().should('include', 'properties');
  });

  it('should show booking form elements', () => {
    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('exist');
    cy.getByTestId('guests-input').should('exist');
    cy.getByTestId('check-in-input').should('exist');
    cy.getByTestId('check-out-input').should('exist');
  });
});
