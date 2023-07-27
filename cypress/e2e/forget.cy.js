// cypress/integration/forget_password.spec.js
describe('Forget Password Component', () => {
    beforeEach(() => {
        // Replace the URL with the correct URL where the Forgetpwd component is rendered
        cy.visit('http://localhost:3000/forget');
      });
    
      it('should display error message for non-matching passwords', () => {
        cy.get('input[type="text"][placeholder="Enter LoginId"]').type('exampleuser');
        cy.get('input[type="password"][placeholder="Enter password"]').type('Password@123');
        cy.get('input[type="password"][placeholder="Enter Confirm Password"]').type('Passwor@123');
        cy.get('button[type="submit"]').click();
      
    
        // Check if the error message for non-matching passwords is displayed
        cy.contains('Passwords do not match!').should('be.visible');
      });

      it('should display success message for matching passwords', () => {
        // Stub the window.alert() method
        cy.on('window:alert', (msg) => {
          expect(msg).to.equal('password has been changed successfully');
        });
      
        cy.get('input[type="text"][placeholder="Enter LoginId"]').type('testuser');
        cy.get('input[type="password"][placeholder="Enter password"]').type('Test@1234');
        cy.get('input[type="password"][placeholder="Enter Confirm Password"]').type('Test@1234');
        cy.get('button[type="submit"]').click();
      
        // Check if the user is redirected to the login page after successful password change
        cy.url().should('include', '/login');
      });
      
  
    
  });
  