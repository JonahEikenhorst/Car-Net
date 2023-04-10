import { getGreeting } from '../support/app.po';

describe('car-net', () => {
  beforeEach(() => cy.visit('/'));

  it('Basic Functionality, create account, login, create garage', () => {
    cy.get("p").contains("Welcome to")
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[routerlink="catalog"]').click();
    cy.get('.space-x-8 > .text-3xl').click();
    cy.get('[routerlink="login"]').click();
    cy.get('.underline').click();
    cy.get('.mt-6').click();
    cy.get(':nth-child(2) > .relative > .w-full').clear('E');
    cy.get(':nth-child(2) > .relative > .w-full').type('E2E');
    cy.get(':nth-child(3) > .relative > .w-full').clear();
    cy.get(':nth-child(3) > .relative > .w-full').type('E2E@gmail.com');
    cy.get(':nth-child(4) > .relative > .w-full').clear();
    cy.get(':nth-child(4) > .relative > .w-full').type('testtest');
    cy.get(':nth-child(5) > .relative > .w-full').clear();
    cy.get(':nth-child(5) > .relative > .w-full').type('testtest');
    cy.get('.block').click();
    cy.get('[routerlink="login"] > .bi').click();
    cy.get(':nth-child(2) > .relative > .w-full').clear('E2E@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').type('E2E@gmail.com');
    cy.get(':nth-child(3) > .relative > .w-full').clear('t');
    cy.get(':nth-child(3) > .relative > .w-full').type('testtest');
    cy.get('#login').click();
    cy.get('[routerlink="garage"]').click();

  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Get error when trying to like without being logged In', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200/');
    cy.get('[routerlink="login"]').click();
    cy.get('[routerlink="garages"]').click();
    cy.get(':nth-child(4) > car-net-garages-card > .card > .card-body > .items-center > .btn > .bi').click();
    cy.get('.space-x-8 > .text-3xl').click();
    cy.get('[routerlink="garages"]').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Like a garage and find recommended and like that aswell & unlike a garage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[routerlink="login"]').click();
    cy.get(':nth-child(2) > .relative > .w-full').clear('E2E@gmail.com');
    cy.get(':nth-child(2) > .relative > .w-full').type('E2E@gmail.com');
    cy.get(':nth-child(3) > .relative > .w-full').clear('t');
    cy.get(':nth-child(3) > .relative > .w-full').type('testtest');
    cy.get('#login').click();
    cy.get('.mb-12 > #garages > :nth-child(1) > car-net-homefgarage-card > .card > .card-body > .items-center > .btn').click();
    cy.get('.mb-12 > #garages > :nth-child(2) > car-net-homefgarage-card > .card > .card-body > .items-center > .btn').click();
    cy.get('[routerlink="garages"]').click();
    cy.get('.space-x-8 > .text-3xl').click();
    cy.get(':nth-child(4) > #garages > :nth-child(3) > car-net-homefgarage-card > .card > .card-body > .items-center > .btn').click();
    cy.get('.space-x-8 > .text-3xl').click();
    /* ==== End Cypress Studio ==== */
  });
});
