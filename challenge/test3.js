/**
 * Direction:
 * Remove key that have null or undefined value
 *
 * Expected Result:
 * [
 *   { session_name: 'first test', classes: [{ students: [{ student_name: 'budi' }] }] },
 *   { classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
 * ]
 */
const data = [
  { session_name: 'first test', classes: [{ class_name: undefined, students: [{ student_name: 'budi' }] }] },
  { session_name: null, classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
];

function result(data) {
  const result = [];

  for (const record of data) {
    let value = {};
    for (const key of Object.keys(record)) {
      if (typeof record[key] === 'string') {
        value[key] = record[key];
      } else if (record[key] instanceof Array) {
        value[key] = [];
        const arrValues = {};
        for (let r = 0; r < record[key].length; r++) {
          const objVal = record[key][r];
          const keys = Object.keys(objVal);
          for (const k of keys) {
            if (Boolean(objVal[k])) {
              arrValues[k] = objVal[k];
            }
          }
        }
        value[key].push(arrValues);
      }
    }

    result.push(value);
  }

  return JSON.stringify(result, null, 2);
}

console.log(result(data));
