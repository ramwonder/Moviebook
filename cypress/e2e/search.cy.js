describe('Search functionality', () => {
    it('Searches for a movie', () => {
      // Stub the API response for the search query
      cy.intercept('GET', 'http://localhost:8080/api/v1.0/moviebooking/movies/search/*', {
        statusCode: 200,
        body: [{ key: { movieName: 'KGF', theatreName: 'ags' }, totalNoOfTickets: 27 }],
      }).as('searchMovie');
  
      // Visit the URL where the Search component is located
      cy.visit('http://localhost:3000/search?query=KGF&id=Admin'); // Replace the URL with the actual URL of your Search component
  
     
  
   
      // Assert that the table contains the searched movie data
      cy.get('.eTable11').should('contain', 'KGF');
      cy.get('.eTable11').should('contain', 'ags');
      cy.get('.eTable11').should('contain', '27');
  
      // You can add more assertions as needed based on your UI and requirements
    });
  });
  