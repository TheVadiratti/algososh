import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('fibonacci test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  })

  it('disable button if input is empty', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="button"]').should('be.disabled');
  })

  it('fibonacci generation', () => {
    cy.get('[data-cy="input"]').type('7');
    cy.get('[data-cy="button"]').click();

    cy.get('[class*=circle_circle]').as('circle');

    for(let index = 0; index < 8; index++) {
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('@circle').should('have.length', index + 1).each((el, i) => {
        if (i === 0) expect(el).contain('0');
        if (i === 1) expect(el).contain('1');
        if (i === 2) expect(el).contain('1');
        if (i === 3) expect(el).contain('2');
        if (i === 4) expect(el).contain('3');
        if (i === 5) expect(el).contain('5');
        if (i === 6) expect(el).contain('8');
        if (i === 7) expect(el).contain('13');
      })
    }
  })
})