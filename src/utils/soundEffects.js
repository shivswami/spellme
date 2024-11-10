// Create audio instances
const letterSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/tap.mp3');
const correctSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/bell_ring.mp3');
const removeSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/water_droplet.mp3');

export const playLetterSound = () => {
  letterSound.currentTime = 0;
  letterSound.play().catch(e => console.log('Audio play failed:', e));
};

export const playCorrectSound = () => {
  correctSound.currentTime = 0;
  correctSound.play().catch(e => console.log('Audio play failed:', e));
};

export const playRemoveSound = () => {
  removeSound.currentTime = 0;
  removeSound.play().catch(e => console.log('Audio play failed:', e));
};