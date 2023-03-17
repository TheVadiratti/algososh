export const swap = (array: any[], firstIndex: number, secondIndex: number) => {
  const tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
};

export const setDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRandomArr = (): number[] => {
  const length = Math.floor(Math.random() * (17 - 3) + 3);
  const arr = [];

  for (let i = 0; i < length; i++) {
    const newNumb = Math.random() * (100 + 1);

    arr.push(Math.floor(newNumb));
  }
  return arr;
}