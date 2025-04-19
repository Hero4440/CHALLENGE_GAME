// src/app/phase2/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { policyOptions } from '@/constants/policies';
import { agentProfiles } from '@/constants/agents';
import { ChatPanel } from '@/components/ChatPanel';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { Button } from '@/components/ui/button';

interface Message {
  speaker: string;
  text: string;
}

export default function PhaseTwoPage() {
  const router = useRouter();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [participantMessage, setParticipantMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCategory = policyOptions[categoryIndex];

  useEffect(() => {
    setChatLog([]);
    setParticipantMessage('');
  }, [categoryIndex]);

  const handleParticipantSubmit = async () => {
    if (!participantMessage.trim()) return;
    setIsSubmitting(true);
    const newLog: Message[] = [{ speaker: 'You', text: participantMessage }];

    // Simulated AI agent responses (replace with GPT later)
    agentProfiles.forEach((agent) => {
      newLog.push({
        speaker: agent.name,
        text: `As a ${agent.profile.ideology} ${agent.profile.occupation}, I chose my policy based on...`
      });
    });

    setChatLog(newLog);
    setIsSubmitting(false);
  };

  const handleNext = () => {
    if (categoryIndex < policyOptions.length - 1) {
      setCategoryIndex(categoryIndex + 1);
    } else {
      router.push('/phase3');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Category {categoryIndex + 1} of {policyOptions.length}: {currentCategory.title}
      </h1>

      <ChatPanel messages={chatLog} />

      <div className="mt-4">
        <VoiceRecorder
          onTranscript={(text) => setParticipantMessage(text)}
          placeholder="Explain why you chose your policy..."
        />
        <Button onClick={handleParticipantSubmit} disabled={isSubmitting || !participantMessage} className="mt-2">
          Submit Justification
        </Button>
      </div>

      {chatLog.length > 1 && (
        <div className="mt-6">
          <Button onClick={handleNext}>Next Category</Button>
        </div>
      )}
    </div>
  );
}
