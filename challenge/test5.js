/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ['flower', 'flow', 'flight'];

function result(words) {
  let result = '';
  const firstWord = words[0];
  const lastWord = words[words.length-1];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextWord = i === words.length -1 ? words[0] : words[i+1];

    for (let c = 0; c < word.length; c++) {
      const letter = word[c];
      if (
        nextWord.includes(letter) && !result.includes(letter) && lastWord.includes(letter)
      ) {
        result += letter;
      }
    }
  }

  return result;
}

console.log(result(words));
