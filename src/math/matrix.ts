/**
 * Multiplies the given matrix and array.
 * The number of matrix columns and the array length must be identical.
 * @param {number[][]} matrix - Any matrix.
 * @param {number[]} array - Any one-dimensional array of numbers.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns Product of the given values as an array.
 */
export function multiplyMatrixAndArray(
  matrix: number[][],
  array: number[],
  target?: number[]
): number[] {
  const matrixRowCount = matrix.length;
  const matrixColumnCount = matrix[0].length;
  /* tslint:disable:prefer-array-literal */
  const resultArray = target || new Array<number>(matrixRowCount);
  /* tslint:enable */

  for (let row = 0; row < matrixRowCount; row += 1) {
    resultArray[row] = 0;
    for (let col = 0; col < matrixColumnCount; col += 1) {
      resultArray[row] += matrix[row][col] * array[col];
    }
  }

  return resultArray;
}
