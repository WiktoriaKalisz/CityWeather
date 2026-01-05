describe('Homepage e2e', () => {
  it('renders and navigates to weather route using client push', () => {
    cy.visit('/')
    cy.contains('CITY WEATHER')
    cy.get('input[placeholder="Enter city name..."]').type('Krakow')
    cy.contains('Check').click()
    cy.url().should('include', '/weather/Krakow')
  })
})
