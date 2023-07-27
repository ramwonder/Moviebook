describe('GridExample component', () => {
    beforeEach(() => {
      // Visit the URL where the GridExample component is located
      cy.visit('http://localhost:3000/login'); // Replace with the correct URL
    });
  
    it('should display the login form with username and password fields', () => {
      // Check if the login form is rendered correctly
      cy.contains('UserName').should('be.visible');
      cy.get('input[type="text"][placeholder="Enter UserName"]').should('be.visible');
      cy.contains('Password').should('be.visible');
      cy.get('input[type="password"][placeholder="Enter Password"]').should('be.visible');
      cy.contains('Login').should('be.visible');
    });
  
    it('should show an error message for invalid credentials', () => {
      // Mock the login API response for unsuccessful login (invalid credentials)
      cy.intercept('POST', 'http://localhost:8080/api/v1.0/moviebooking/login/**', {
        statusCode: 200,
        body: {
          token: null, // Mocking invalid credentials with a null token
        },
      }).as('loginRequest');
  
      // Type invalid username and password in the form fields and click the "Login" button
      cy.get('input[type="text"][placeholder="Enter UserName"]').type('invalid_username');
      cy.get('input[type="password"][placeholder="Enter Password"]').type('invalid_password');
      cy.contains('button', 'Login').click();
  
      // Wait for the login request to complete and assert that an error message is shown
      //cy.wait('@loginRequest');
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('username && password incorrect');
      });
    });
    
    it('should redirect to the admin page on successful login with Admin username', () => {
        // Mock the login API response for successful login with Admin username
        cy.intercept('POST', 'http://localhost:8080/api/v1.0/moviebooking/login/**', {
          statusCode: 200,
          body: {
            token: 'your_mocked_token_here', // Replace with the token you want to mock
          },
        }).as('loginRequest');
    
        // Type valid Admin username and password in the form fields and click the "Login" button
        cy.get('input[type="text"][placeholder="Enter UserName"]').type('Admin');
        cy.get('input[type="password"][placeholder="Enter Password"]').type('admin123'); // Replace with your admin password
        cy.contains('button', 'Login').click();
    
        // Wait for the login request to complete and assert the redirection to the admin page
      //  cy.wait('@loginRequest');
        cy.url().should('include', '/admin?id=Admin'); // Replace with the URL for the admin page
      });
    
      it('should redirect to the user page on successful login with non-Admin username', () => {
        // Mock the login API response for successful login with non-Admin username
        cy.intercept('POST', 'http://localhost:8080/api/v1.0/moviebooking/login/**', {
          statusCode: 200,
          body: {
            token: 'your_mocked_token_here', // Replace with the token you want to mock
          },
        }).as('loginRequest');
    
        // Type valid non-Admin username and password in the form fields and click the "Login" button
        cy.get('input[type="text"][placeholder="Enter UserName"]').type('raman'); // Replace with your non-admin username
        cy.get('input[type="password"][placeholder="Enter Password"]').type('ram1'); // Replace with your non-admin password
        cy.contains('button', 'Login').click();
    
        // Wait for the login request to complete and assert the redirection to the user page
      //   cy.wait('@loginRequest');
        cy.url().should('include', '/user?id=raman'); // Replace with the URL for the user page
      });
  
  });
  