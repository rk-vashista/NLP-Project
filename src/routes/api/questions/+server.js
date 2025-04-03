import { GROQ_API_KEY } from '$env/static/private';

export async function POST({ request, fetch }) {
    try {
      // No need to check if API key exists since import will fail if it's not defined
      
      const prompt = `
        Generate 5 "fill in the blank" language learning questions. Each question should be a sentence with a blank (represented by "___") that needs to be filled with the correct word.
        
        For each question, provide:
        1. The sentence with a blank (use "___" to represent the blank)
        2. Three possible options to fill the blank (only one should be correct)
        3. The correct answer (which should be one of the options)
        
        Return the data in the following JSON format:
        {
          "questions": [
            {
              "sentence": "She was feeling very ___ after the long day.",
              "options": ["tired", "tiring", "tiresome"],
              "answer": "tired"
            },
            ...more questions...
          ]
        }
        
        Make sure the questions test different parts of speech and language concepts.
      `;
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful language learning assistant that creates fill-in-the-blank exercises.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API error:', errorData);
        throw new Error('Failed to fetch from Groq API');
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON from the response content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from response');
      }
      
      const questionsData = JSON.parse(jsonMatch[0]);
      
      return new Response(JSON.stringify(questionsData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error in questions API:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }