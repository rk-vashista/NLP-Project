<script>
    import { fade, fly } from 'svelte/transition';
    
    export let question;
    export let selectedOption;
    export let answerSubmitted;
    export let analysis;
    export let onOptionSelect;
    export let onSubmitAnswer;
    export let onNextQuestion;
    export let currentQuestionIndex;
    export let totalQuestions;
    
    // Format sentence with blank
    function formatSentence(sentence) {
      return sentence.replace("___", "______");
    }
    
    // Get color class based on part of speech
    function getPosColor(pos) {
      const colors = {
        'NOUN': 'bg-pink-900 text-pink-200 border-pink-700',
        'VERB': 'bg-blue-900 text-blue-200 border-blue-700',
        'ADJ': 'bg-purple-900 text-purple-200 border-purple-700',
        'ADV': 'bg-green-900 text-green-200 border-green-700',
        'DET': 'bg-yellow-900 text-yellow-200 border-yellow-700',
        'ADP': 'bg-orange-900 text-orange-200 border-orange-700',
        'PRON': 'bg-red-900 text-red-200 border-red-700',
        'CONJ': 'bg-indigo-900 text-indigo-200 border-indigo-700',
        'PART': 'bg-slate-900 text-slate-200 border-slate-700'
      };
      
      return colors[pos] || 'bg-slate-900 text-slate-200 border-slate-700';
    }
    
    // Get description for part of speech
    function getPosDescription(pos) {
      const descriptions = {
        'NOUN': 'Noun - Person, place, thing, or idea',
        'VERB': 'Verb - Action or state of being',
        'ADJ': 'Adjective - Describes a noun',
        'ADV': 'Adverb - Modifies a verb, adjective, or other adverb',
        'DET': 'Determiner - Article or other word that specifies a noun',
        'ADP': 'Adposition - Preposition or postposition',
        'PRON': 'Pronoun - Replaces a noun',
        'CONJ': 'Conjunction - Connects words, phrases, or clauses',
        'PART': 'Particle - Function word associated with another word or phrase'
      };
      
      return descriptions[pos] || pos;
    }
    
    // Get all unique parts of speech in the analysis
    function getUniquePOS() {
      const posSet = new Set();
      analysis.forEach(([_, pos]) => posSet.add(pos));
      return Array.from(posSet);
    }
  </script>
  
  <div in:fade={{ duration: 300 }} class="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700">
    <h2 class="text-2xl font-bold text-white mb-6">
      {formatSentence(question.sentence)}
    </h2>
    
    <div class="grid gap-3 mb-6">
      {#each question.options as option, i}
        <button 
          on:click={() => onOptionSelect(i)}
          class="text-left p-4 rounded-lg border-2 transition-all {selectedOption === i ? 
            (answerSubmitted ? 
              (option === question.answer ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30') : 
              'border-teal-500 bg-teal-900/30') : 
            'border-slate-600 hover:border-teal-600 hover:bg-teal-900/20'} 
            {answerSubmitted && option === question.answer ? 'border-green-500 bg-green-900/30' : ''}"
          disabled={answerSubmitted}
        >
          <span class="text-slate-200">{option}</span>
          {#if answerSubmitted}
            {#if option === question.answer}
              <span class="float-right text-green-400" in:fade>✓</span>
            {:else if selectedOption === i}
              <span class="float-right text-red-400" in:fade>✗</span>
            {/if}
          {/if}
        </button>
      {/each}
    </div>
    
    {#if !answerSubmitted}
      <button 
        on:click={onSubmitAnswer}
        class="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
        disabled={selectedOption === null}
      >
        Submit Answer
      </button>
    {:else}
      <div class="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
        <h3 class="font-bold text-teal-400 mb-3">NLP Analysis:</h3>
        <div class="flex flex-wrap gap-2">
          {#each analysis as [word, pos], i}
            <div 
              in:fly={{ y: 10, delay: i * 50 }}
              class="rounded px-2 py-1 text-sm border {getPosColor(pos)}" 
              title={getPosDescription(pos)}
            >
              {word} <span class="text-xs opacity-75">({pos})</span>
            </div>
          {/each}
        </div>
        
        <!-- Parts of Speech Legend -->
        {#if analysis.length > 0}
          <div class="mt-4 pt-4 border-t border-slate-700" in:fade={{ delay: analysis.length * 50 }}>
            <h4 class="text-sm font-medium text-slate-300 mb-2">Parts of Speech Legend:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {#each getUniquePOS() as pos}
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-sm {getPosColor(pos).split(' ')[0]}"></div>
                  <span>{getPosDescription(pos)}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      <button 
        on:click={onNextQuestion}
        class="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 btn-glow"
      >
        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
      </button>
    {/if}
  </div>