import { sortBubble, sortSelection } from "./sorting-func";

const mockSetState = jest.fn();

const ascendingArr = [{value: 1, state: 'modified'}, {value: 2, state: 'modified'}, {value: 3, state: 'modified'}];
const decendingArr = [{value: 3, state: 'default'}, {value: 2, state: 'default'}, {value: 1, state: 'default'}];

const oneElDefault = [{value: 1, state: 'default'}];
const oneElModified = [{value: 1, state: 'modified'}];

describe('Bubble sorting algorithm test ', () => {
  it('Sorting algorithm with empty array', async () => {
    const result = await sortBubble([], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([]);
  })

  it('Sorting algorithm with one element', async () => {
    const result = await sortBubble(oneElDefault, 'ascending', mockSetState, mockSetState);
    expect(result).toEqual(oneElModified);
  })

  it('Sorting algorithm with array', async () => {
    const result = await sortBubble(decendingArr, 'ascending', mockSetState, mockSetState);
    expect(result).toEqual(ascendingArr);
  }, 10000)
})

describe('Selection sorting algorithm test ', () => {
  it('Sorting algorithm with empty array', async () => {
    const result = await sortSelection([], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([]);
  })

  it('Sorting algorithm with one element', async () => {
    const result = await sortSelection(oneElDefault, 'ascending', mockSetState, mockSetState);
    expect(result).toEqual(oneElModified);
  })

  it('Sorting algorithm with array', async () => {
    const result = await sortSelection(decendingArr, 'ascending', mockSetState, mockSetState);
    expect(result).toEqual(ascendingArr);
  }, 10000)
})