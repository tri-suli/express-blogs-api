/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function result(numbers) {
  for (var n = 0; n <= 9; n++) {
    if (!numbers.includes(n)) {
      return n;
    }
  }
}

console.log(result(numbers));
