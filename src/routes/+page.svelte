<script>
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    import Results from '$lib/components/Results.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    
    // Game state
    let loading = false;
    let gameStarted = false;
    let gameEnded = false;
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let selectedOption = null;
    let answerSubmitted = false;
    let analysis = [];
    
    // Fetch questions from Groq LLM
    async function fetchQuestions() {
      loading = true;
      try {
        const response = await fetch('/api/questions', {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        
        const data = await response.json();
        questions = data.questions;
        loading = false;
      } catch (error) {
        console.error('Error fetching questions:', error);
        loading = false;
      }
    }
    
    // Start the game
    function startGame() {
      gameStarted = true;
      fetchQuestions();
    }
    
    // Handle option selection
    function handleOptionSelect(index) {
      selectedOption = index;
    }
    
    // Submit answer
    async function handleSubmitAnswer() {
      answerSubmitted = true;
      const currentQuestion = questions[currentQuestionIndex];
      
      if (currentQuestion.options[selectedOption] === currentQuestion.answer) {
        score++;
      }
      
      // Fetch NLP analysis for the complete sentence
      try {
        const sentence = currentQuestion.sentence.replace("___", currentQuestion.answer);
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sentence })
        });
        
        if (response.ok) {
          const data = await response.json();
          analysis = data.analysis;
        } else {
          console.error('Error response from analyze API:', await response.text());
          analysis = [];
        }
      } catch (error) {
        console.error('Error analyzing sentence:', error);
        analysis = [];
      }
    }
    
    // Move to next question
    function handleNextQuestion() {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedOption = null;
        answerSubmitted = false;
        analysis = [];
      } else {
        gameEnded = true;
      }
    }
    
    // Restart the game
    function restartGame() {
      gameStarted = false;
      gameEnded = false;
      currentQuestionIndex = 0;
      score = 0;
      questions = [];
      selectedOption = null;
      answerSubmitted = false;
      analysis = [];
    }
  </script>
  
  <main class="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
    <div class="w-full max-w-2xl">
      {#if !gameStarted}
        <div in:scale={{ duration: 400, start: 0.95 }} class="bg-slate-800 rounded-xl shadow-2xl p-8 text-center border border-slate-700">
          <div class="mb-6 text-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">Fill in the Blanks</h1>
          <p class="text-slate-300 mb-8">Improve your language skills by completing sentences with the correct words.</p>
          <button 
            on:click={startGame}
            class="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-lg shadow-teal-900/30"
          >
            Start Game
          </button>
        </div>
      {:else if loading}
        <div class="bg-slate-800 rounded-xl shadow-2xl p-8 text-center border border-slate-700">
          <LoadingSpinner />
          <p class="text-slate-300 mt-4">Generating questions with Groq LLM...</p>
        </div>
      {:else if gameEnded}
        <Results {score} totalQuestions={questions.length} {restartGame} />
      {:else}
        <div in:fade={{ duration: 300 }}>
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} {score} />
          
          <QuestionCard 
            question={questions[currentQuestionIndex]} 
            {selectedOption}
            {answerSubmitted}
            {analysis}
            onOptionSelect={handleOptionSelect}
            onSubmitAnswer={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div>
      {/if}
    </div>
  </main>