describe('Signup Component', () => {
  it('should load the signup form', () => {
    cy.visit('/signup'); // Visit the signup page
    cy.get('input[name="firstname"]').should('be.visible'); // Check if the firstname input is visible
    cy.get('input[name="lastname"]').should('be.visible'); // Check if the lastname input is visible
    cy.get('input[name="email"]').should('be.visible'); // Check if the email input is visible
    cy.get('input[name="password"]').should('be.visible'); // Check if the password input is visible
  });

  it('should submit the form successfully', () => {
    cy.visit('/signup'); // Visit the signup page

    // Fill in the form
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('john.dooooooe@example.com');
    cy.get('input[name="password"]').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check if navigation to OTP page occurred
    cy.url().should('include', '/otp'); 
  });

  it('should show error message for invalid signup', () => {
    cy.visit('/signup'); // Visit the signup page

    // Fill in the form with invalid data
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('short');

    // Try to submit the form
    cy.get('button[type="submit"]').click();

    

  });
});
