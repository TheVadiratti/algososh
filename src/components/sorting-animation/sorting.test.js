import { sortBubble, sortSelection } from "./sorting-func";

describe('Sorting algorithm test ', () => {
  const mockSetState = jest.fn();

  // bubble

  it('Sorting algorithm with empty array', async () => {
    const result = await sortBubble([], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([]);
  })

  it('Sorting algorithm with one element', async () => {
    const result = await sortBubble([{value: 1, state: 'default'}], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([{value: 1, state: 'modified'}]);
  })

  it('Sorting algorithm with array', async () => {
    const result = await sortBubble([{value: 3, state: 'default'}, {value: 2, state: 'default'}, {value: 1, state: 'default'}], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([{value: 1, state: 'modified'}, {value: 2, state: 'modified'}, {value: 3, state: 'modified'}]);
  }, 10000)

  //selection
  
  it('Sorting algorithm with empty array', async () => {
    const result = await sortSelection([], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([]);
  })

  it('Sorting algorithm with one element', async () => {
    const result = await sortSelection([{value: 1, state: 'default'}], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([{value: 1, state: 'modified'}]);
  })

  it('Sorting algorithm with array', async () => {
    const result = await sortSelection([{value: 3, state: 'default'}, {value: 2, state: 'default'}, {value: 1, state: 'default'}], 'ascending', mockSetState, mockSetState);
    expect(result).toEqual([{value: 1, state: 'modified'}, {value: 2, state: 'modified'}, {value: 3, state: 'modified'}]);
  }, 10000)
})