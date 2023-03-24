import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('stack test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  })

  it('disable button if input is empty', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="button-add"]').should('be.disabled');
  })

  it('add element animation', () => {
    cy.get('[data-cy="input"]').as('input');
    cy.get('[data-cy="button-add"]').as('button-add');

    // 1. Добавление первого элемента

    cy.get('@input').type('A');
    cy.get('@button-add').click();

    cy.get('[class*=circle_circle]').should('have.length', 1).as('circle');
    cy.get('[class*=circle_content]').should('have.length', 1).as('circle-content');

    cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@circle-content').contains('A');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    // 2. Добавление второго элемента

    cy.get('@input').type('B');
    cy.get('@button-add').click();

    cy.get('[class*=circle_circle]').should('have.length', 2).as('circle');
    cy.get('[class*=circle_content]').should('have.length', 2).as('circle-content');

    cy.get('@circle').each((el, i) => {
      if (i === 0) cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      if (i === 1) cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    })
    cy.get('@circle-content').each((el, i) => {
      if (i === 1) cy.wrap(el).contains('B');
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((el, i) => {
      if (i === 1) cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    })
  })

  it('delete element animation', () => {
    cy.get('[data-cy="input"]').as('input');
    cy.get('[data-cy="button-add"]').as('button-add');
    cy.get('[data-cy="button-delete"]').as('button-delete');

    cy.get('@input').type('A');
    cy.get('@button-add').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@input').type('B');
    cy.get('@button-add').click();

    cy.get('@button-delete').click();

    cy.get('[class*=circle_circle]').should('have.length', 2).each((el, i) => {
      if(i === 1) cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').should('have.length', 1).contains('A');
  })

  it('reset stack', () => {
    cy.get('[data-cy="input"]').as('input');
    cy.get('[data-cy="button-add"]').as('button-add');

    cy.get('@input').type('A');
    cy.get('@button-add').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@input').type('B');
    cy.get('@button-add').click();

    cy.get('[data-cy="button-reset"]').click();

    cy.get('[class*=circle_circle]').should('have.length', 0);

    cy.get('[data-cy="button-add"]').should('be.disabled');
    cy.get('[data-cy="button-delete"]').should('be.disabled');
    cy.get('[data-cy="button-reset"]').should('be.disabled');
  })
})