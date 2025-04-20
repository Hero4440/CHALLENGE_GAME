'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { questions } from '@/constants/questions';
import { downloadReport } from '@/lib/report';
import { motion } from 'framer-motion';

export default function PhaseThreePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [finalPackage, setFinalPackage] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('finalPackage');
      if (stored) {
        setFinalPackage(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error parsing final package:', err);
    }
  }, []);

  const handleAnswerChange = (question: string, response: string) => {
    setAnswers((prev) => ({ ...prev, [question]: response }));
  };

  const transcriptHandlers = useMemo(() => {
    const handlers: Record<string, (text: string) => void> = {};
    questions.forEach((q) => {
      handlers[q] = (text: string) => handleAnswerChange(q, text);
    });
    return handlers;
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    localStorage.setItem('reflectionAnswers', JSON.stringify(answers));

    const reflectionText = questions
      .map((q, i) => `Q${i + 1}: ${q}\nA: ${answers[q] || ''}`)
      .join('\n\n');

    const prompt = `The participant selected the following policy package: ${JSON.stringify(
      finalPackage,
      null,
      2
    )}.\nThey answered the following reflection questions:\n${reflectionText}\n\nPlease provide a 2-3 paragraph feedback focused on ethical and justice-oriented insights, and encourage them based on their effort.`;

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
      <motion.div
        className="max-w-3xl mx-auto p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center">Your AI Feedback</h1>
        <p className="whitespace-pre-wrap text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
          {feedback}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push('/')}>Finish</Button>
          <Button variant="secondary" onClick={downloadReport}>Download Report</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Reflection Questions</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium mb-2">{q}</p>
          <VoiceRecorder
            onTranscript={transcriptHandlers[q]}
            placeholder="Answer here..."
          />
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Generating Feedback...' : 'Submit & Get Feedback'}
        </Button>
      </div>
    </motion.div>
  );
}