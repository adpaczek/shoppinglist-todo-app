describe('template spec', () => {
  it('signs out', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');
    cy.contains('ADD NEW LIST').should('be.visible');
    cy.contains('SIGN OUT').should('be.visible');

    cy.get('button').contains('SIGN OUT').click();

    cy.contains('📜 Shopping list').should('not.exist');
    cy.contains('Please log in:').should('be.visible');
  })
})