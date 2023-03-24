import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const circleIsDefault = (el: JQuery<HTMLElement>) => {
  cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
}

const circleIsChanging = (el: JQuery<HTMLElement>) => {
  cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
}

const addTwoElements = () => {
  cy.get('[data-cy="input"]').type('A');
  cy.get('[data-cy="button-add"]').click();
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get('[data-cy="input"]').type('B');
  cy.get('[data-cy="button-add"]').click();
}

describe('queue test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
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

    cy.get('[class*=circle_circle]').should('have.length', 7).as('circle');
    cy.get('[class*=circle_content]').should('have.length', 7).as('circle-content');

    cy.get('@circle').each((el, i) => {
      if (i === 0) circleIsChanging(el);
    });
    cy.get('@circle-content').each((el, i) => {
      if (i === 0) {
        expect(el).contain('A');
        expect(el).contain('head');
        expect(el).contain('tail');
        expect(el).contain('0');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((el, i) => {
      if (i === 0) circleIsDefault(el);
    });

    // 2. Добавление второго элемента

    cy.get('@input').type('B');
    cy.get('@button-add').click();

    cy.get('@circle').each((el, i) => {
      if (i === 1) circleIsChanging(el);
    });
    cy.get('@circle-content').each((el, i) => {
      if (i === 0) {
        expect(el).contain('A');
        expect(el).contain('head');
        expect(el).contain('0');
      }
      if (i === 1) {
        expect(el).contain('B');
        expect(el).contain('tail');
        expect(el).contain('1');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((el, i) => {
      if (i === 0) circleIsDefault(el);
    });
  })

  it('delete element animation', () => {
    addTwoElements();

    cy.get('[class*=circle_circle]').should('have.length', 7).as('circle');
    cy.get('[class*=circle_content]').should('have.length', 7).as('circle-content');

    cy.get('[data-cy="button-delete"]').click();

    cy.get('@circle').each((el, i) => {
      if (i === 0) circleIsChanging(el);
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        circleIsDefault(el);
      }
    });
    cy.get('@circle-content').each((el, i) => {
      if (i === 1) {
        expect(el).contain('head');
        expect(el).contain('tail');
        expect(el).contain('1');
      }
    });
  })

  it('reset queue', () => {
    addTwoElements();

    cy.get('[data-cy="button-reset"]').click();

    cy.get('[class*=circle_content]').each(el => {
      expect(el).contain('');
    });

    cy.get('[data-cy="button-add"]').should('be.disabled');
    cy.get('[data-cy="button-delete"]').should('be.disabled');
    cy.get('[data-cy="button-reset"]').should('be.disabled');
  })
})