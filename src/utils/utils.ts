export const swap = (array: any[], firstIndex: number, secondIndex: number) => {
  const tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
}