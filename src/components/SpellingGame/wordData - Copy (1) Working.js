const WORD_LIST = [
  {
    word: 'BALL',
    hint: 'A round object used in many games'
  },
  {
    word: 'BAT',
    hint: 'Flies at night'
  },
  {
    word: 'BOOK',
    hint: 'A collection of pages with stories or information'
  },
  {
    word: 'CAR',
    hint: 'A vehicle that runs on roads'
  },
  {
    word: 'CAT',
    hint: 'A furry pet that says meow'
  },
  {
    word: 'DOG',
    hint: 'A furry pet that says woof'
  },
  {
    word: 'RUN',
    hint: 'An action done when moving quickly on foot'
  },
  {
    word: 'SUN',
    hint: 'Shines in the sky during day'
  },
  {
    word: 'YES',
    hint: 'A word that expresses agreement'
  },
  {
    word: 'YUMMY',
    hint: 'A word used to describe tasty food'
  }
].map(item => ({
  ...item,
  image: require(`../../assets/images/${item.word}.jpg`)
}));

export const WORDS = WORD_LIST;
export const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];