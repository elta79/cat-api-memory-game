# Cat API Memory Game

This project is a memory game built using React, where players match pairs of random cat images fetched from the Cat API. It utilizes modern JavaScript tooling with Vite for fast development and production builds.

## Major Functions

- **Fetching Cat Images**: Random cat images are fetched from the Cat API using `fetch`.
- **Shuffling Cards**: Cards are shuffled at the beginning of the game and after each game round.
- **Flipping Cards**: Players can flip cards to reveal the cat images.
- **Matching Logic**: When two cards are flipped, the game checks if they match based on their names.
- **Game Completion**: A winner modal is displayed when all pairs are matched.

## Dependencies

- `react` (^18.3.1)
- `react-dom` (^18.3.1)

## Development Dependencies

- `@types/react` (^18.3.3)
- `@types/react-dom` (^18.3.0)
- `@vitejs/plugin-react` (^4.3.1)
- `eslint` (^8.57.0)
- `eslint-plugin-react` (^7.34.2)
- `eslint-plugin-react-hooks` (^4.6.2)
- `eslint-plugin-react-refresh` (^0.4.7)
- `vite` (^5.3.1)

## Scripts

- `dev`: Starts the development server using Vite.
- `build`: Builds the project for production using Vite.
- `lint`: Runs ESLint to lint JavaScript and JSX files.
- `preview`: Previews the production build locally using Vite.

## Build and Deploy Instructions

1. **Clone Repository**:
   ```bash
   git clone https://github.com/your-username/cat-api-memory-game.git
   cd cat-api-memory-game


2. **Install Dependencies**:
   ```bash
   npm install

  
3. **Run Development Server**:
    ```bash
    npm run dev

Open http://localhost:3000 in your browser to view the game.


4. **Build for Production**:
    ```bash
    npm run build

This creates a production build in the dist directory.


5. **Deploy**:

- Deploy the contents of the dist directory to your hosting provider or platform like Netlify, Vercel, or GitHub Pages.


## Notes
- Ensure that your environment variable VITE_CAT_API_KEY is correctly set in your environment (e.g., .env file or environment variables configuration) to access the Cat API.

This project provides a fun way to interact with cat images while testing and improving your memory skills. Enjoy playing the Cat API Memory Game! 🐱
