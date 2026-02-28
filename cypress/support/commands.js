Cypress.Commands.add('fillAndSubmit', (selector, value) => {
  cy.get(selector).type(value)
  cy.contains('Check').click()
})
