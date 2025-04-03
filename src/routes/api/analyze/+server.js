import { GROQ_API_KEY } from '$env/static/private';

export async function POST({ request, fetch }) {
    try {
      // No need to check if API key exists since import will fail if it's not defined
      
      const data = await request.json();
      const { sentence } = data;
      
      if (!sentence) {
        throw new Error('Sentence is required');
      }
      
      const prompt = `
        Analyze the following sentence and provide the part of speech for each word:
        
        "${sentence}"
        
        Return the analysis as a JSON array of arrays, where each inner array contains a word and its part of speech tag.
        Use the following format:
        [
          ["word1", "POS1"],
          ["word2", "POS2"],
          ...
        ]
        
        Use the following part of speech tags:
        NOUN, VERB, ADJ (adjective), ADV (adverb), DET (determiner), ADP (adposition), PRON (pronoun), CONJ (conjunction), PART (particle)
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
              content: 'You are a helpful linguistic analysis assistant.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1024
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API error:', errorData);
        throw new Error('Failed to fetch from Groq API');
      }
      
      const responseData = await response.json();
      const content = responseData.choices[0].message.content;
      
      // Parse the JSON from the response content
      const jsonMatch = content.match(/\[\s*\[[\s\S]*\]\s*\]/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from response');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      
      return new Response(JSON.stringify({ analysis }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error in analyze API:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }