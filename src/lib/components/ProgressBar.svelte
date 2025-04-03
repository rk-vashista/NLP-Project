<script>
    export let current;
    export let total;
    export let score;
    
    $: progress = (current / total) * 100;
  </script>
  
  <div class="mb-4 bg-slate-800 rounded-lg shadow-md p-4 border border-slate-700">
    <div class="flex justify-between items-center mb-2">
      <div class="text-slate-300">Question {current}/{total}</div>
      <div class="text-teal-400 font-bold">Score: {score}</div>
    </div>
    
    <div class="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
      <div 
        class="bg-gradient-to-r from-teal-600 to-teal-400 h-2.5 rounded-full transition-all duration-500 ease-out"
        style="width: {progress}%"
      ></div>
    </div>
  </div>