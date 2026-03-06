describe('Basic UI Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the main page', () => {
    cy.get('h1').should('exist');
    cy.url().should('include', 'localhost:5173');
  });

  it('should show booking form', () => {
    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('exist');
    cy.getByTestId('guests-input').should('exist');
    cy.getByTestId('check-in-input').should('exist');
    cy.getByTestId('check-out-input').should('exist');
    cy.getByTestId('submit-button').should('exist');
  });

  it('should have navigation', () => {
    cy.get('nav').should('exist');
    cy.get('a[href*="properties"]').should('exist');
  });

  it('should show empty state initially', () => {
    cy.getByTestId('booking-card').should('not.exist');
    cy.getByTestId('submit-button').should('be.disabled');
  });
});
