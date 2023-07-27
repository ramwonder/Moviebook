// getmovie.spec.js

// Simple test case to check if the Getmovie component loads successfully
describe('Getmovie1 Component', () => {
    it('Loads the Getmovie component', () => {
      // Visit the URL where the Getmovie component is located
      cy.visit('http://localhost:3000/Admin?id=Admin');
  
      // Assert that the component is visible and displays the loading message
      cy.get('#Butt').first().click();

      // Assert that the BookTicket modal is visible
      cy.get('.modal-content').should('be.visible');
      cy.get('button').contains('Close').click({force: true});
    });
    
   
  });
  