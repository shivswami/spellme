# SpellMe: Interactive Spelling Game

## Motivation
SpellMe is an educational game designed to make learning spelling fun and interactive for young learners. Created as a fun project using Generative AI technologies, this application demonstrates how modern web technologies and AI can be combined to create engaging educational experiences.

# Where's AI in the app ? 
My personal take is that Generative AI doesn't have to be real time in applications like this. It can be used to build applications faster, learn new technologies on the go, generate content for application like text, translations, images and enhance the user experience.
GenAI in the project is developer copilot (Used both OpenAI canvas and Cursor), Product manager copilot (OpenAI o1-preview), business analyst(words and image list for the game via OpenAI gpt-4o ) and operator copilot (Claude 3.5 Sonnet in the terminal via Cursor).


## Features
- Interactive drag-and-drop interface
- Visual and audio feedback
- Keyboard support for typing and navigation
- Hint system for each word
- Visual representations with images
- Progress tracking
- Sound effects for enhanced engagement

## Technologies Used
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: React Hooks
- **Drag and Drop**: react-beautiful-dnd
- **Audio Effects**: Web Audio API
- **Build Tool**: Create React App
- **Version Control**: Git/GitHub

## Roadmap

### Phase 0: Build out basic functionality (MVP)
- ✅ Basic word spelling interface
- ✅ Drag and drop functionality

### Phase 1: Core Features (Release 1 MVP)
- ✅ Basic word spelling interface
- ✅ Drag and drop functionality
- ✅ Keyboard support
- ✅ Image hints
- ✅ Sound effects
- ✅ Next word navigation with button

### Phase 2: Enhanced Learning (Release 2)
-✅ Next word navigation with right arrow
- [ ] Multiple difficulty levels
  - Easy (3-4 letters)
  - Medium (5-6 letters)
  - Hard (7+ letters)
- [ ] Word categories
  - Animals
  - Colors
  - Numbers
  - Food items
- [ ] Progress tracking
- [ ] Achievement badges

### Phase 3: User Experience (Release 3)
- [ ] User profiles
- [ ] Progress saving
- [ ] Customizable themes
- [ ] Animation improvements
- [ ] Mobile-responsive design
- [ ] Offline support

### Phase 4: Educational Integration (Release 4)
- [ ] Teacher dashboard
- [ ] Custom word lists
- [ ] Multiple languages support
- [ ] Progress reports
- [ ] Parent/Teacher accounts
- [ ] Class management

### Phase 5: Social & Gamification (Release 5)
- [ ] Multiplayer mode
- [ ] Leaderboards
- [ ] Social sharing
- [ ] Daily challenges
- [ ] Reward system
- [ ] Interactive tutorials

### Long-term Vision
- AI-powered difficulty adjustment
- Speech recognition for pronunciation
- Integration with educational platforms
- Mobile apps (iOS/Android)
- API for third-party integration

## Getting Started

### Prerequisites
- Node.js (v20 )
- npm (Node Package Manager)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Deployment
1. Build the application: `npm run build`
2. Deploy to your GitHub Pages: `npm run deploy` (includes gh-pages package in package.json)

### Thank yous!
- LocalLLama Reddit community for the help and support
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for the drag and drop functionality
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for the audio effects

