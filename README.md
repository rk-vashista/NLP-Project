# 🎮 Fill in the Blanks - Language Learning Game

<p align="center">
  <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Groq_LLM-00A36C?style=for-the-badge&logo=openai&logoColor=white" alt="Groq LLM">
</p>

<p align="center">
  An interactive language learning application that helps users improve their language skills through fill-in-the-blank exercises powered by Groq LLM with real-time NLP analysis.
</p>

## ✨ Features

- **Interactive Fill-in-the-Blank Exercises**: Practice language skills with dynamically generated questions
- **Real-time NLP Analysis**: See the part of speech breakdown for each word in completed sentences
- **Instant Feedback**: Get immediate feedback on your answers
- **Progress Tracking**: Monitor your score as you play
- **Responsive Design**: Enjoy a seamless experience on any device
- **Beautiful UI**: Modern, clean interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: SvelteKit 5 with Runes
- **Styling**: Tailwind CSS with custom animations
- **API Integration**: Groq LLM API (llama3-70b-8192 model)
- **Animations**: Svelte transitions and custom CSS effects

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Groq API key

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd NLP
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your Groq API key
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   npm run dev -- --open
   ```

## 🎯 How to Play

1. Click "Start Game" on the home screen
2. For each question, read the sentence with the blank space
3. Choose the correct word from the three options provided
4. Submit your answer and see the NLP analysis of the complete sentence
5. Continue to the next question
6. At the end, review your score and play again

## 🧠 API Integration

The application integrates with two main API endpoints:

### Questions API
- Generates 5 fill-in-the-blank questions using Groq LLM
- Each question includes a sentence with a blank, three options, and the correct answer

### Analysis API
- Analyzes completed sentences to identify parts of speech for each word
- Returns structured data that is visually represented in the UI

## 🎨 UI Components

- **LoadingSpinner**: Displays while content is loading
- **QuestionCard**: Presents questions with interactive option selection
- **ProgressBar**: Shows current progress through the questions
- **Results**: Displays final score with appropriate feedback

## 📷 Screenshots

*[Add screenshots of your application here]*

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| GROQ_API_KEY | Your Groq API key for accessing the LLM services |

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing the LLM API
- [SvelteKit](https://kit.svelte.dev/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
