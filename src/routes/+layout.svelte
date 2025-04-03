<script>
	import '../app.css';
  </script>
  
  <svelte:head>
	<title>Fill in the Blanks - Language Learning Game</title>
	<meta name="description" content="Improve your language skills with this fill in the blanks game powered by Groq LLM">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </svelte:head>
  
  <div class="app">
	<slot />
  </div>
  
  <style>
	.app {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	}
	
	:global(body) {
	  background-color: #0f172a;
	  color: #e2e8f0;
	  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
  </style>