// getmovie.spec.js

// Simple test case to check if the Getmovie component loads successfully
describe('Getmovie Component', () => {
    it('Loads the Getmovie component', () => {
      // Visit the URL where the Getmovie component is located
      cy.visit('http://localhost:3000/user?id=raman');
  
      // Assert that the component is visible and displays the loading message
      cy.contains('Loading...').should('be.visible');
    });
    it('Searches for a movie', () => {
        // Visit the URL where the Getmovie component is located
        cy.visit('http://localhost:3000/user?id=raman');
    
        // Type a search query into the input field
        cy.get('input[type="text"]').type('KGF');
    
        // Click the search button
        cy.get('button[type="submit"]').click();
    
        // Assert that the URL contains the search query and user id
        cy.url().should('include', 'query=KGF');
        cy.url().should('include', 'id=raman'); // Replace 123 with the actual user id
    
        // Assert that the loading spinner or message is visible while waiting for data
        
    
        // Wait for the API to fetch data and display the movie table
      
      });
      it('Opens BookTicket modal', () => {
        cy.visit('http://localhost:3000/user?id=raman');
        console.log('Visiting the URL');
        cy.get('#Butt').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.contains('Book Movie'); // Replace "Book Movie" with the expected title in the BookTicket modal
       // Replace "search" with the actual ID of the form in the modal
    
        // Close the modal (if necessary)
        cy.get('button').contains('Close').click({force: true});
      });
  });
  