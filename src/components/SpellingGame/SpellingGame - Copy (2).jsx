import React, { useState } from 'react';
import { Card } from '../ui/card';
import { WORDS, ALPHABET } from './wordData';

const SpellingGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userSpelling, setUserSpelling] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = WORDS[currentWordIndex].word;
  
  // Handle letter click
  const handleLetterClick = (letter) => {
    const newSpelling = [...userSpelling, letter];
    setUserSpelling(newSpelling);
    checkWord(newSpelling);
  };

  // Check if word is correct
  const checkWord = (spelling) => {
    if (spelling.join('') === currentWord) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    }
  };
  
  // Drag and drop handlers
  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('letter', letter);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('letter');
    const newSpelling = [...userSpelling, letter];
    setUserSpelling(newSpelling);
    checkWord(newSpelling);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Remove last letter when clicking on it
  const handleLetterRemove = (indexToRemove) => {
    setUserSpelling(userSpelling.filter((_, index) => index !== indexToRemove));
  };
  
  const resetWord = () => {
    setUserSpelling([]);
    setShowHint(false);
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    setUserSpelling([]);
    setShowHint(false);
    setShowCelebration(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card className="p-6 space-y-6">
        {/* Image and Word Area */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={WORDS[currentWordIndex].image}
            alt="Word to spell"
            className="rounded-lg shadow-md w-48 h-48 object-cover"
          />
          
          {showHint && (
            <div className="text-blue-600 text-lg">
              Hint: {WORDS[currentWordIndex].hint}
            </div>
          )}
        </div>
        
        {/* Spelling Area */}
        <div
          className="min-h-24 p-4 border-4 border-dashed border-blue-300 rounded-lg flex gap-2 justify-center items-center bg-blue-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {userSpelling.map((letter, index) => (
            <div
              key={index}
              onClick={() => handleLetterRemove(index)}
              className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-blue-600 cursor-pointer hover:bg-red-50 transition-colors"
              title="Click to remove letter"
            >
              {letter}
            </div>
          ))}
          {userSpelling.length === 0 && (
            <p className="text-blue-400">Click letters or drag them here!</p>
          )}
        </div>
        
        {/* Alphabet */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ALPHABET.map((letter, index) => (
            <div
              key={index}
              draggable
              onClick={() => handleLetterClick(letter)}
              onDragStart={(e) => handleDragStart(e, letter)}
              className="w-10 h-10 bg-yellow-200 rounded-lg shadow-md flex items-center justify-center text-xl font-bold cursor-pointer hover:bg-yellow-300 transition-colors transform hover:scale-105"
            >
              {letter}
            </div>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show Hint
          </button>
          <button
            onClick={resetWord}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={nextWord}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Next Word
          </button>
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl animate-bounce text-center">
              <h2 className="text-4xl font-bold text-green-600">🎉 Correct! 🎉</h2>
              <p className="mt-4">Great job spelling {currentWord}!</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-gray-600">
          <p>Click on letters to add them or drag and drop them into the box</p>
          <p>Click on a letter in the spelling box to remove it</p>
        </div>
      </Card>
    </div>
  );
};

export default SpellingGame;