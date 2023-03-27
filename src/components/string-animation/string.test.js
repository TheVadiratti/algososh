import { getRecursionArray } from "./string-func";

describe('String algorithm test ', () => {
  const mockSetState = jest.fn();

  it('String algorithm with an even number of symbols', async () => {
    const result = await getRecursionArray([{ value: 'a', state: 'default' }, { value: 'b', state: 'default' }], mockSetState, mockSetState);
    expect(result).toEqual([{ value: 'b', state: 'modified' }, { value: 'a', state: 'modified' }]);
  })

  it('String algorithm with an uneven number of symbols', async () => {
    const result = await getRecursionArray([{ value: 'a', state: 'default' }, { value: 'b', state: 'default' }, { value: 'c', state: 'default' }], mockSetState, mockSetState);
    expect(result).toEqual([{ value: 'c', state: 'modified' }, { value: 'b', state: 'modified' }, { value: 'a', state: 'modified' }]);
  })

  it('String algorithm with one symbol', async () => {
    const result = await getRecursionArray([{ value: 'a', state: 'default' }], mockSetState, mockSetState);
    expect(result).toEqual([{ value: 'a', state: 'modified' }]);
  })

  it('String algorithm with empty string', async () => {
    const result = await getRecursionArray([], mockSetState, mockSetState);
    expect(result).toEqual([]);
  })
})