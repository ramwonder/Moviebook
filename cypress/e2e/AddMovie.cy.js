// Integration Test using Cypress
describe('AddMovie Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin?id=Admin'); // Replace '/' with the URL where the Getmovie1 component is rendered
    });
  
    it('should display movies in the table', () => {
      // Assert that the table containing movies is displayed
      cy.get('.eTable11').should('be.visible');
      
      // Assert that the table contains at least one row of movie data
      cy.get('.eTable11 tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('should add a new movie', () => {
      // Click the "Add Movie" button to open the add movie modal
      cy.get('#Butt').click();
  
      // Fill out the form in the add movie modal
      cy.get('input[placeholder="Enter Movie Name"]').type('TestMovie');
      cy.get('input[placeholder="Enter Theater Name"]').type('TestTheater');
      cy.get('input[placeholder="Enter No of Tickets"]').type('100');
  
      // Click the "Add" button to add the movie
      cy.get('[data-testid="add-button"]').click();
  
      // Assert that the success snackbar is displayed
      cy.contains('Movie added Successfully!!!').should('be.visible');
      cy.get('[data-testid="close-button"]').click();
      // Assert that the new movie is added to the table
      cy.contains('TestMovie').should('be.visible');
      cy.contains('TestTheater').should('be.visible');
      cy.contains('100').should('be.visible');
    });
  
    
  });
  