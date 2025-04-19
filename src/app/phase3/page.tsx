// src/app/phase3/page.tsx

'use client';
import { downloadReport } from '@/lib/report';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { questions } from '@/constants/questions';

export default function PhaseThreePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    localStorage.setItem('reflectionAnswers', JSON.stringify(answers));

    // Fetch finalPackage from localStorage
    const final = JSON.parse(localStorage.getItem('finalPackage') || '{}');

    const reflectionText = questions
      .map((q, i) => `Q${i + 1}: ${q}\nA: ${answers[q] || ''}`)
      .join('\n\n');

    const prompt = `The participant selected the following policy package: ${JSON.stringify(final, null, 2)}.\nThey answered the following reflection questions:\n${reflectionText}\n\nPlease provide a 2-3 paragraph feedback focused on ethical and justice-oriented insights, and encourage them based on their effort.`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are an educational ethics mentor providing feedback.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await res.json();
    const summary = data?.choices?.[0]?.message?.content || 'Sorry, feedback could not be generated.';
    setFeedback(summary);
    localStorage.setItem('aiFeedback', summary);
    setShowFeedback(true);
    setLoading(false);
  };

  if (showFeedback) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Your AI Feedback</h1>
        <p className="whitespace-pre-wrap text-gray-800">{feedback}</p>
        <Button onClick={() => router.push('/')}>Finish</Button>
        <Button variant="secondary" onClick={downloadReport}>Download Report</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reflection Questions</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium mb-2">{q}</p>
          <VoiceRecorder
            onTranscript={(text) => handleAnswerChange(q, text)}
            placeholder="Answer here..."
          />
        </div>
      ))}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating Feedback...' : 'Submit & Get Feedback'}
      </Button>
    </div>
  );
}
