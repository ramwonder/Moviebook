describe('MovieSeatPicker component', () => {
    it('renders the component correctly', () => {
      // Visit the URL where the MovieSeatPicker component is located
      cy.visit('http://localhost:3000/movieseat?moviename=KGF&theatreName=ags&id=raman&tickets=27'); // Replace with the correct URL
  
      // Check if the title "Movie Seat Picker" is present
      cy.contains('Movie Seat Picker').should('be.visible');
  
      // Check if the "Go back" button is present
      cy.contains('Go back').should('be.visible');
  
      // Check if the seat labels are correctly displayed
      cy.get('.ra').should('have.length', 30); // Assuming there are 30 available seats
  
      // Check if the "Selected Seats" label is present
      cy.contains('Selected Seats:').should('be.visible');
  
      // Check if the "Total Tickets Selected" label is present
      cy.contains('Total Tickets Selected:').should('be.visible');
  
      // Check if the "Total Tickets available" label is present
      cy.contains('Total Tickets available:').should('be.visible');
  
      // Check if the "Book Ticket" button is present
      cy.contains('Book Ticket').should('be.visible');
    });
  });
  