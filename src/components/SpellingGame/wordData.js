import wordList from '../../data/wordList.json';

const getImage = (word) => {
  try {
    return require(`../../assets/images/${word}.jpg`);
  } catch (error) {
    console.warn(`Image not found for word: ${word}`);
    return require('../../assets/images/placeholder.jpg'); // fallback image
  }
};

const WORD_LIST = wordList.words.map(item => {
  try {
    return {
      ...item,
      image: getImage(item.word)
    };
  } catch (error) {
    console.error(`Error processing word: ${item.word}`, error);
    return null;
  }
}).filter(Boolean); // Remove any null entries

if (WORD_LIST.length === 0) {
  console.error('No valid words loaded!');
}

export const WORDS = WORD_LIST;
export const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];