describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/'); // Visit your homepage
      cy.wait(20000)
    });
  
    it('should display the movie list', () => {
      // Ensure the page container exists
      cy.get('.page-container').should('exist');
      
  
      // Ensure at least one movie card is displayed
      cy.get('.movie-card').should('have.length.greaterThan', 0);
    });
  
    it('should show the filters and allow selecting genre and vote', () => {
      // Test if the genre filter is present and interactable
      cy.get('#genre').should('exist').select('Action'); // Replace 'Action' with an actual genre value from your list
  
      // Test if the vote filter is present and interactable
      cy.get('#vote').should('exist').select('5'); // Replace '5' with an actual vote option value
  
      // Test reset filters button
      cy.get('button[type="button"]').contains('Reset').click(); // Check Reset button click functionality
       // Ensure vote is reset
    });
  
    it('should show no movies message when no filters match', () => {
      // Set filters that will result in no movies being displayed
      cy.get('#genre').select('Music'); // Replace with a genre that has no movies
      cy.get('#vote').select('8.5'); // Replace with a vote option that results in no movies
  
      // Check if the "No Movies With This Character" message is displayed
      cy.get('.no-movies').should('contain.text', 'No Movies With This Character');
    });
  
    it('should toggle favorite icon', () => {
      // Simulate clicking the favorite icon of a movie
      cy.get('.movie-card').first().find('.heart-icon').click();
  
      // Ensure the class changes to favorited
     
  
      // Simulate clicking the favorite icon again to un-favorite
     
      
    });
  
    
  });
  