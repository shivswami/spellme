import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '../ui/card';
import { WORDS, ALPHABET } from './wordData';
import { playLetterSound, playCorrectSound, playRemoveSound } from '../../utils/soundEffects';

const SpellingGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userSpelling, setUserSpelling] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const gameContainerRef = useRef(null);
  const currentWord = WORDS[currentWordIndex].word;

  // Keyboard support
  const handleKeyPress = useCallback((e) => {
    const key = e.key.toUpperCase();
    if (ALPHABET.includes(key)) {
      handleLetterClick(key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    }
  }, [userSpelling]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleBackspace = () => {
    if (userSpelling.length > 0) {
      handleLetterRemove(userSpelling.length - 1);
    }
  };

  // Handle letter click with sound
  const handleLetterClick = (letter) => {
    if (userSpelling.length < currentWord.length) {
      const newSpelling = [...userSpelling, letter];
      setUserSpelling(newSpelling);
      if (isSoundEnabled) playLetterSound();
      checkWord(newSpelling);
    }
  };

  // Check if word is correct
  const checkWord = (spelling) => {
    if (spelling.join('') === currentWord) {
      if (isSoundEnabled) playCorrectSound();
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
    handleLetterClick(letter);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Remove letter with sound
  const handleLetterRemove = (indexToRemove) => {
    if (isSoundEnabled) playRemoveSound();
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

  // Progress indicator
  const progress = Math.min(100, (userSpelling.length / currentWord.length) * 100);

  return (
    <div 
      ref={gameContainerRef}
      className="p-4 max-w-3xl mx-auto"
      role="application"
      aria-label="Spelling Game"
      tabIndex="0"
    >
      <Card className="p-6 space-y-6">
        {/* Sound Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
          >
            {isSoundEnabled ? "🔊" : "🔇"}
          </button>
        </div>

        {/* Image and Word Area */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={WORDS[currentWordIndex].image}
            alt={`Picture representing the word ${currentWord}`}
            className="rounded-lg shadow-md w-48 h-48 object-cover"
          />
          
          {showHint && (
            <div 
              className="text-blue-600 text-lg"
              role="alert"
            >
              Hint: {WORDS[currentWordIndex].hint}
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        {/* Spelling Area */}
        <div
          className="min-h-24 p-4 border-4 border-dashed border-blue-300 rounded-lg flex gap-2 justify-center items-center bg-blue-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          role="region"
          aria-label="Spelling area"
        >
          {userSpelling.map((letter, index) => (
            <div
              key={index}
              onClick={() => handleLetterRemove(index)}
              className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-blue-600 cursor-pointer hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
              role="button"
              aria-label={`Remove letter ${letter}`}
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && handleLetterRemove(index)}
            >
              {letter}
            </div>
          ))}
          {userSpelling.length === 0 && (
            <p className="text-blue-400">Type, click, or drag letters here!</p>
          )}
        </div>
        
        {/* Alphabet */}
        <div 
          className="flex flex-wrap gap-2 justify-center"
          role="region"
          aria-label="Available letters"
        >
          {ALPHABET.map((letter, index) => (
            <div
              key={index}
              draggable
              onClick={() => handleLetterClick(letter)}
              onDragStart={(e) => handleDragStart(e, letter)}
              className={`w-10 h-10 rounded-lg shadow-md flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-200 transform hover:scale-110
                ${userSpelling.length < currentWord.length ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200'}`}
              role="button"
              aria-label={`Letter ${letter}`}
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-300"
            aria-label="Show hint"
          >
            Show Hint
          </button>
          <button
            onClick={resetWord}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-300"
            aria-label="Reset word"
          >
            Reset
          </button>
          <button
            onClick={nextWord}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-300"
            aria-label="Next word"
          >
            Next Word
          </button>
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div 
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            role="alert"
            aria-live="polite"
          >
            <div className="bg-white p-8 rounded-xl animate-bounce text-center">
              <h2 className="text-4xl font-bold text-green-600">🎉 Correct! 🎉</h2>
              <p className="mt-4">Great job spelling {currentWord}!</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-gray-600">
          <p>Type letters on your keyboard, click them, or drag and drop</p>
          <p>Use Backspace to delete letters or click them to remove</p>
        </div>
      </Card>
    </div>
  );
};

export default SpellingGame;