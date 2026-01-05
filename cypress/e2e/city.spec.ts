describe('City page (mocked)', () => {
  it('shows mocked weather and time when mocks are enabled', () => {
    // Ensure the app is started with NEXT_PUBLIC_USE_MOCKS=1
    cy.visit('/');
    cy.get('input[placeholder="Enter city name..."]').type('Krakow');
    cy.contains('Check').click();

    // Wait for page navigation
    cy.url().should('include', '/weather/Krakow');

    // Assert mocked content appears
    cy.contains('12°C').should('exist');
    cy.contains(/light rain/i).should('exist');
    cy.contains('Lodz').should('not.exist');
    cy.contains('Krakow').should('exist');
    cy.contains('Europe').should('not.exist');
  });
});
