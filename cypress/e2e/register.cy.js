// Integration Test using Cypress
describe('AddUser Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/register'); // Replace '/' with the URL where the AddUser component is rendered
    });
  
    it('should successfully register a user', () => {
      cy.get('input[placeholder="Enter LoginId"]').type('testuser');
      cy.get('input[placeholder="Enter your Frist name"]').type('John');
      cy.get('input[placeholder="Enter your Last name"]').type('Doe');
      cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
      cy.get('input[placeholder="Enter phone number"]').type('9876543210');
      cy.get('input[placeholder="Enter password"]').type('Test1234');
      cy.get('input[placeholder="Enter Confirm Password"]').type('Test1234');
      cy.get('button[type="submit"]').click();
  
      // Assert that the user is redirected to the success page after successful registration
      cy.url().should('include', '/success');
    });
  
    it('should show an error when passwords do not match', () => {
      cy.get('input[placeholder="Enter LoginId"]').type('testuser');
      cy.get('input[placeholder="Enter your Frist name"]').type('John');
      cy.get('input[placeholder="Enter your Last name"]').type('Doe');
      cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
      cy.get('input[placeholder="Enter phone number"]').type('9876543210');
      cy.get('input[placeholder="Enter password"]').type('Test1234');
      cy.get('input[placeholder="Enter Confirm Password"]').type('Test5678'); // Invalid password to trigger error
      cy.get('button[type="submit"]').click();
  
      // Assert that the error message for password mismatch is displayed
      cy.contains('Passwords do not match!').should('be.visible');
    });
  });
  