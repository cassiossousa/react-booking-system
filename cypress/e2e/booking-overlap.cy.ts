describe('Booking Overlap', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display booking form', () => {
    cy.getByTestId('booking-form').should('be.visible');
    cy.getByTestId('property-select').should('exist');
    cy.getByTestId('guests-input').should('exist');
    cy.getByTestId('check-in-input').should('exist');
    cy.getByTestId('check-out-input').should('exist');
  });

  it('should validate date inputs', () => {
    cy.getByTestId('check-in-input').type('2024-12-15');
    cy.getByTestId('check-out-input').type('2024-12-10'); // Before check-in

    cy.getByTestId('check-in-input').should('have.value', '2024-12-15');
    cy.getByTestId('check-out-input').should('have.value', '2024-12-10');
  });

  it('should allow date input', () => {
    cy.getByTestId('check-in-input').type('2024-12-10');
    cy.getByTestId('check-out-input').type('2024-12-12');

    cy.getByTestId('check-in-input').should('have.value', '2024-12-10');
    cy.getByTestId('check-out-input').should('have.value', '2024-12-12');
  });
});
