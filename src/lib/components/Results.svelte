<script>
    import { scale, fade } from 'svelte/transition';
    
    export let score;
    export let totalQuestions;
    export let restartGame;
    
    $: percentage = Math.round((score / totalQuestions) * 100);
    
    function getResultMessage() {
      if (percentage === 100) {
        return "Perfect score! You're a language master!";
      } else if (percentage >= 80) {
        return "Excellent work! You have a strong grasp of language!";
      } else if (percentage >= 60) {
        return "Good job! Keep practicing to improve your skills.";
      } else if (percentage >= 40) {
        return "Not bad! With more practice, you'll get better.";
      } else {
        return "Keep practicing! You'll improve with time.";
      }
    }
    
    function getResultEmoji() {
      if (percentage === 100) return "🏆";
      if (percentage >= 80) return "🌟";
      if (percentage >= 60) return "👍";
      if (percentage >= 40) return "🙂";
      return "📚";
    }
  </script>
  
  <div in:scale={{ duration: 400, start: 0.95 }} class="bg-slate-800 rounded-xl shadow-2xl p-8 text-center border border-slate-700">
    <div class="text-6xl mb-6" in:fade={{ delay: 300 }}>{getResultEmoji()}</div>
    <h2 class="text-3xl font-bold text-white mb-6">Game Over!</h2>
    
    <div class="relative mb-8">
      <div class="text-6xl font-bold mb-2 text-teal-400">{score}/{totalQuestions}</div>
      <div class="text-2xl text-slate-300">{percentage}%</div>
      
      <div class="w-full bg-slate-700 rounded-full h-4 mt-4">
        <div 
          class="bg-gradient-to-r from-teal-600 to-teal-400 h-4 rounded-full transition-all duration-1000 ease-out"
          style="width: {percentage}%"
          in:scale={{ duration: 1000, start: 0, opacity: 1 }}
        ></div>
      </div>
    </div>
    
    <p class="text-slate-300 mb-8" in:fade={{ delay: 600 }}>
      {getResultMessage()}
    </p>
    
    <button 
      on:click={restartGame}
      class="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-lg shadow-teal-900/30 btn-glow"
      in:fade={{ delay: 800 }}
    >
      Play Again
    </button>
  </div>