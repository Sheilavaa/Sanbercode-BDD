import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../../pom/login/login.cy";

Given('I visit the URL', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(10000);
});

When('I should see the homepage', () => {
    loginPage.verifyLoginPage().should('have.text','Login');
});

When('I submit the Invalid Username', () => {
    loginPage.inputUsername().type('Sheila');
});

When('I submit the Invalid Password', () => {
    loginPage.inputPassword().type('sheila123');
});

Then('I click the button Login', () => {
    cy.intercept('GET', '**/action-summary').as('action');
    loginPage.buttonSubmit().click();
    cy.wait('@action');
});

Then('I verify login success', () => {
    loginPage.dashboardPage().should('have.text', 'Dashboard')
});