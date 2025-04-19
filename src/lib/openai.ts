// src/lib/openai.ts — Groq integration

export async function getAgentResponse(agentName: string, userMessage: string, category: string) {
  const prompt = `You are ${agentName}, a fictional policymaker in the Republic of Bean. The participant just said: "${userMessage}" regarding the category "${category}". Respond respectfully with 2-3 sentences explaining your own policy choice in that category. Speak in first person and reflect your unique political ideology.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192', // or 'llama3-70b-8192'
      messages: [
        { role: 'system', content: 'You are a helpful policy simulation agent.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    })
  });

  const data = await res.json();

  if (!data || !data.choices || !data.choices[0]) {
    console.error('Groq API Error:', data);
    return `Sorry, I’m having trouble responding right now. (Agent: ${agentName})`;
  }

  return data.choices[0].message.content;
}