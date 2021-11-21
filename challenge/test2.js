/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
const data = [1, 4, 2, 3, 5, 3, 2, 4];

function result(data) {
  return data.filter(function (number, index, self) {
    return self.indexOf(number) === index;
  }).sort(function (a, b) {
    return a - b;
  });
}

console.log(result(data));
