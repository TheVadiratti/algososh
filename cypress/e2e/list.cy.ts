import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const circleIsDefault = (el: JQuery<HTMLElement>) => {
  cy.wrap(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
}

const circleIsChanging = (el: JQuery<HTMLElement>) => {
  cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
}

const circleIsModified = (el: JQuery<HTMLElement>) => {
  cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
}

const getCircle = () => {
  return cy.get('[class*=circle_circle]');
}

const getCircleContent = () => {
  return cy.get('[class*=circle_content]');
}

const getCircleText = () => {
  return cy.get('[class*=text_type_circle]');
}

describe('list test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  })

  it('disable buttons if inputs are empty', () => {
    cy.get('[data-cy="input-value"]').clear();
    cy.get('[data-cy="input-index"]').clear();
    cy.get('[data-cy="button-add-head"]').should('be.disabled');
    cy.get('[data-cy="button-add-tail"]').should('be.disabled');
    cy.get('[data-cy="button-add-byindex"]').should('be.disabled');
    cy.get('[data-cy="button-delete-byindex"]').should('be.disabled');
  })

  it('render default list', () => {
    getCircleContent().should('have.length', 4).each((el, i) => {
      if (i === 0) {
        expect(el).contain('0');
        expect(el).contain('head');
      }
      if (i === 1) {
        expect(el).contain('34');
        expect(el).contain('1');
      }
      if (i === 2) {
        expect(el).contain('8');
        expect(el).contain('2');
      }
      if (i === 3) {
        expect(el).contain('1');
        expect(el).contain('3');
        expect(el).contain('tail');
      }
    });
  })

  it('add element to head', () => {
    cy.get('[data-cy="input-value"]').type('test');
    cy.get('[data-cy="button-add-head"]').click();

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
    });

    getCircleContent().each((el, i) => {
      if (i === 0) {
        expect(el).contain('test');
        expect(el).not.contain('head');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) {
        expect(el).contain('test');
        circleIsModified(el);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsDefault(el);
    });

    getCircleContent().each((el, i) => {
      if (i === 0) expect(el).contain('head');
    });
  })

  it('add element to tail', () => {
    cy.get('[data-cy="input-value"]').type('test');
    cy.get('[data-cy="button-add-tail"]').click();

    getCircle().each((el, i) => {
      if (i === 3) circleIsChanging(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 3) expect(el).contain('tail');
      if (i === 4) expect(el).contain('test');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 4) {
        expect(el).contain('test');
        circleIsModified(el);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 4) circleIsDefault(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 4) expect(el).contain('tail');
    });
  })

  it('add element by index', () => {
    cy.get('[data-cy="input-value"]').type('test');
    cy.get('[data-cy="input-index"]').type('2');
    cy.get('[data-cy="button-add-byindex"]').click();

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 1) expect(el).contain('test');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
      if (i === 2) circleIsChanging(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 2) expect(el).contain('test');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
      if (i === 2) circleIsChanging(el);
      if (i === 3) circleIsChanging(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 3) expect(el).contain('test');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 2) circleIsModified(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 2) expect(el).contain('test');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 2) circleIsDefault(el);
    });
    getCircleContent().each((el, i) => {
      if (i === 2) expect(el).contain('2');
    });
  })

  it('delete from head', () => {
    cy.get('[data-cy="button-delete-head"]').click();

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
    });
    getCircleText().each((el, i) => {
      if (i === 0) expect(el).contain('0');
      if (i === 1) expect(el).not.contain('0');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircleText().each((el, i) => {
      if (i === 0) expect(el).contain('34');
    });
  })

  it('delete from tail', () => {
    cy.get('[data-cy="button-delete-tail"]').click();

    getCircle().each((el, i) => {
      if (i === 3) circleIsChanging(el);
    });
    getCircleText().each((el, i) => {
      if (i === 3) expect(el).contain('1');
      if (i === 4) expect(el).not.contain('1');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircleContent().each((el, i) => {
      if (i === 2) expect(el).contain('tail');
    });
  })

  it('delete element by index', () => {
    cy.get('[data-cy="input-index"]').type('2');
    cy.get('[data-cy="button-delete-byindex"]').click();

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
      if (i === 2) circleIsChanging(el);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircle().each((el, i) => {
      if (i === 0) circleIsChanging(el);
      if (i === 1) circleIsChanging(el);
      if (i === 2) circleIsChanging(el);
      if (i === 3) circleIsChanging(el);
    });

    getCircleText().each((el, i) => {
      if (i === 3) expect(el).contain('8');
      if (i === 4) expect(el).not.contain('8');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    getCircleText().each((el, i) => {
      if (i === 2) expect(el).contain('1');
    });
  })
})