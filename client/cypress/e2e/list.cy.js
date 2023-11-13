describe('Lists&Products&Modals', () => {
  it('renders home page correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');
    cy.contains('ADD NEW LIST').should('be.visible');
    cy.contains('SIGN OUT').should('be.visible');
  })

  it('creates new list correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.get('button').contains('ADD NEW LIST').click();
    cy.contains('create').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="date"]').should('be.visible');

    cy.get('input[name="title"]').type('Lista cypress');
    cy.get('input[name="date"]').type('2023-12-01');
    cy.get('input[name="title"]').should('have.value', 'Lista cypress');
    cy.get('input[name="date"]').should('have.value', '2023-12-01');
    cy.get('input[type="submit"]').click();

    cy.contains('Lista cypress').should('be.visible');
    cy.contains('2023-12-01').should('be.visible');
  })

  it('updates new list correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.get('button').contains('EDIT').click();
    cy.contains('edit').should('be.visible');
    cy.get('input[name="title"]').type(' zmieniona');
    cy.get('input[name="title"]').should('have.value', 'Lista cypress zmieniona');
    cy.get('input[type="submit"]').click();

    cy.contains('Lista cypress zmieniona').should('be.visible');  

  })

  it('add new product', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.contains('Lista cypress zmieniona').should('be.visible');

    cy.get('button').contains('ADD ITEM').click();
    cy.contains('add').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="quantity"]').should('be.visible');
    cy.get('select[name="unit"]').should('be.visible')

    cy.get('input[name="name"]').type('Masło');
    cy.get('input[name="quantity"]').type('2');
    cy.get('input[type="submit"]').click();

    cy.contains('Masło').should('be.visible');
    cy.contains('Szt').should('be.visible');


  })

  it('add new product', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.contains('Lista cypress zmieniona').should('be.visible');
    cy.contains('Masło').should('be.visible');

    cy.get('button').contains('CHECK').click();
    cy.contains('Maslo').should('not.exist');
    cy.get('button').contains('CHECK').click();
    cy.contains('Masło').should('be.visible');

    
  })

  it('deletes product', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.contains('Lista cypress zmieniona').should('be.visible');
    cy.contains('Masło').should('be.visible');

    cy.get('button').contains('DELETE ITEM').click();
    cy.contains('Maslo').should('not.exist');  

    
  })

  it('deletes list', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="password"]').type('cypress-password');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[type="password"]').should('have.value', 'cypress-password');
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

    cy.contains('Lista cypress zmieniona').should('be.visible');

    cy.get('button').contains('DELETE').click();
    cy.contains('Lista cypress zmieniona').should('not.exist');  

    
  })
})