# Writer's Companion for "أسفار الوحدة والتكوين"

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.12-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

"Writer's Companion" is a bespoke web application designed to be your creative partner while writing your novel, "أسفار الوحدة والتكوين" (The Journeys of Unity and Formation). The application provides a unique conversational space with three AI-powered personas who act as your guides on this literary journey:

-   **Omar Sharif**: Your guide through "Hell" (`الجحيم`), sharing his real-life experiences in an authentic Egyptian dialect.
-   **Abu al-Ala al-Maarri**: Your companion in "Purgatory" (`الأعراف`), offering deep philosophical reflections in classical Arabic.
-   **Edward Said**: Your mentor in "Paradise" (`الفردوس`), analyzing narrative and identity from a critical perspective.

Interact with these guides to develop your plot, explore ideas, and ensure you maintain the unique voices of your characters throughout the writing process.

## Features

- **Multi-Persona Chat System**: Switch between three distinct AI personas, each with unique personalities and expertise
- **Persistent Chat History**: Conversations are automatically saved to local storage
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices
- **TypeScript Support**: Fully typed for better development experience
- **Modern Stack**: Built with React, Vite, and TypeScript for optimal performance

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **State Management**: React Hooks with Local Storage

## Running Locally

To run this application on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Installation

Clone or download the project files, then navigate to the project directory in your terminal and install the dependencies:

```bash
npm install
```

### 2. Set up Environment Variables

The application requires a Gemini API key to function.

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

Your `.env` file should look like this:

```
VITE_API_KEY="AIzaSy...your...key"
```

**Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Start the Development Server

Run the following command to start the Vite development server:

```bash
npm run dev
```

The application will now be running at `http://localhost:5173` (the port may vary). Open this URL in your browser to use the app.

## Available Scripts

- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Serves the production build locally to test it.

## Project Structure

```
writing-assistant/
├── components/          # React components
│   ├── ChatInterface.tsx
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── services/           # API services
│   └── geminiService.ts
├── types.ts            # TypeScript type definitions
├── constants.tsx       # App constants and personas
├── App.tsx            # Main application component
└── README.md          # This file
```

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Powered by [Google Gemini API](https://ai.google.dev/)
- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
