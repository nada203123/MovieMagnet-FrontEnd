describe('Home Page', () => {
  it('should display the correct title', () => {
    cy.visit('/'); // Cypress will visit http://localhost:4200
    cy.contains('signup'); // Change this to match your title
  });
});