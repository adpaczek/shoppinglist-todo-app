describe('Login&Register', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Please log in:').should('be.visible');
    
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('input[type="submit"]').should('be.visible');

    cy.contains('Sign Up').should('be.visible')
    cy.contains('Login').should('be.visible')

    cy.contains('Error').should('not.exist');
  });

  it('log in correctly', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[type="email"]').type('tester@test.com');

    cy.get('input[type="password"]').type('123');

    cy.get('input[type="email"]').should('have.value', 'tester@test.com');
    cy.get('input[type="password"]').should('have.value', '123');

    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

  })

  it('doesnt log in correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="submit"]').click();
    cy.contains('User does not exist').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('tester@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester@test.com');
    cy.get('input[type="submit"]').click();
    cy.contains('Login failed due to an error').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');    

    cy.visit('http://localhost:3000/');
    cy.get('input[type="password"]').type('password123');
    cy.get('input[type="password"]').should('have.value', 'password123');
    cy.get('input[type="submit"]').click();
    cy.contains('User does not exist').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('tester@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester@test.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('input[type="password"]').should('have.value', 'password123');
    cy.get('input[type="submit"]').click();
    cy.contains('Login failed').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

    cy.visit('http://localhost:3000/');
    cy.get('input[type="email"]').type('tester1@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester1@test.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('input[type="password"]').should('have.value', 'password123');
    cy.get('input[type="submit"]').click();
    cy.contains('User does not exist').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

  })

  it('renders register correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Please log in:').should('be.visible');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please sign up').should('be.visible')
    cy.contains('Error').should('not.exist');
  });

  it('doesnt register', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Please log in:').should('be.visible');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please sign up').should('be.visible')

    //cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('not.exist')

    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Sign Up').click();


    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Sign Up').click();
    cy.get('input[type="email"]').type('tester1@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester1@test.com');
    cy.get('input[placeholder="password"]').type('password123');
    cy.get('input[placeholder="password"]').should('have.value', 'password123');
    cy.get('input[type="submit"]').click();
    cy.contains('Make sure password match!').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Sign Up').click();
    cy.get('input[type="email"]').type('tester1@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester1@test.com');
    cy.get('input[placeholder="password"]').type('password123');
    cy.get('input[placeholder="password"]').should('have.value', 'password123');
    cy.get('input[placeholder="confirm password"]').type('123');
    cy.get('input[placeholder="confirm password"]').should('have.value', '123');  
    cy.get('input[type="submit"]').click();
    cy.contains('Make sure password match!').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Sign Up').click();
    cy.get('input[type="email"]').type('tester@test.com');
    cy.get('input[type="email"]').should('have.value', 'tester@test.com');
    cy.get('input[placeholder="password"]').type('123');
    cy.get('input[placeholder="password"]').should('have.value', '123');
    cy.get('input[placeholder="confirm password"]').type('123');
    cy.get('input[placeholder="confirm password"]').should('have.value', '123');  
    cy.get('input[type="submit"]').click();
    cy.contains('exists').should('be.visible');
    cy.contains('📜 Shopping list').should('not.exist');

  });

  it('register correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Please log in:').should('be.visible');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please sign up').should('be.visible')

    cy.get('input[type="email"]').type('cyp@test.com');
    cy.get('input[type="email"]').should('have.value', 'cyp@test.com');
    cy.get('input[placeholder="password"]').type('cypress-password');
    cy.get('input[placeholder="password"]').should('have.value', 'cypress-password');
    cy.get('input[placeholder="confirm password"]').type('cypress-password');
    cy.get('input[placeholder="confirm password"]').should('have.value', 'cypress-password');  
    cy.get('input[type="submit"]').click();
    cy.contains('📜 Shopping list').should('be.visible');

  });







  
})