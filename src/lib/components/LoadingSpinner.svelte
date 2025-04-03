<div class="flex justify-center items-center">
    <div class="relative w-16 h-16">
      <div class="absolute top-0 left-0 w-full h-full border-4 border-teal-400/20 rounded-full"></div>
      <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-teal-400 rounded-full animate-spin"></div>
    </div>
  </div>
  
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  </style>