import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('string test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  })

  it('disable button if input is empty', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="button"]').should('be.disabled');
  })

  it('string reverse animation', () => {
    cy.get('[data-cy="input"]').type('abcd');
    cy.get('[data-cy="button"]').click();

    cy.get('[class*=circle_circle]').as('circle');

    // 1.  крайние буквы подсвечиваются розовым
    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).contain('a');
      if (i === 1) expect(el).contain('b');
      if (i === 2) expect(el).contain('c');
      if (i === 3) expect(el).contain('d');

      if (i === 0 || i === 4) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    // 2. переставленные буквы подсвечиваются зеленым
    cy.get('@circle').each((el, i) => {
      if (i === 0 || i === 3) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    // 3. проверка замены крайних букв и выделения следующих розовым
    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).contain('d');
      if (i === 1) expect(el).contain('b');
      if (i === 2) expect(el).contain('c');
      if (i === 3) expect(el).contain('a');

      if (i === 1 || i === 2) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((el, i) => {
      if (i === 1 || i === 2) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).contain('d');
      if (i === 1) expect(el).contain('c');
      if (i === 2) expect(el).contain('b');
      if (i === 3) expect(el).contain('a');
    })
  })
})