describe('City page (mocked)', () => {
  it('shows mocked weather and time when mocks are enabled', () => {
    cy.visit('/');

    cy.get('input[placeholder="Enter city name..."]').type('Krakow');
    cy.contains('Check').click();

    cy.url().should('include', '/weather/Krakow');

    cy.contains('12°C').should('exist');
    cy.contains(/light rain/i).should('exist');
    cy.contains('Lodz').should('not.exist');
    cy.contains('Krakow').should('exist');
    cy.contains('Europe').should('not.exist');
  });
});
