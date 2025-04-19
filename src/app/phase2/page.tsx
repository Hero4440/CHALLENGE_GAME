// src/app/phase2/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { policyOptions } from '@/constants/policies';
import { agentProfiles } from '@/constants/agents';
import { ChatPanel } from '@/components/ChatPanel';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  const [votingStage, setVotingStage] = useState(false);
  const [votes, setVotes] = useState<any>({});
  const [finalPackage, setFinalPackage] = useState<any>({});

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
      setVotingStage(true);
    }
  };

  const handleVoteChange = (categoryId: string, optionId: string) => {
    setVotes({ ...votes, [categoryId]: optionId });
  };

  const handleFinalizeVotes = () => {
    const final: any = {};

    policyOptions.forEach((cat) => {
      const allVotes = [votes[cat.id]]; // participant
      agentProfiles.forEach(() => {
        const randomChoice = cat.options[Math.floor(Math.random() * cat.options.length)];
        allVotes.push(randomChoice.id);
      });

      const tally: Record<string, number> = {};
      allVotes.forEach((vote) => {
        tally[vote] = (tally[vote] || 0) + 1;
      });

      const winnerId = Object.keys(tally).reduce((a, b) => (tally[a] > tally[b] ? a : b));
      const winner = cat.options.find((opt) => opt.id === winnerId);
      if (winner) {
        final[cat.id] = winner;
      }
    });

    localStorage.setItem('finalPackage', JSON.stringify(final));
    router.push('/phase3');
  };

  if (votingStage) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Vote on Final Policies</h1>
        {policyOptions.map((category) => (
          <div key={category.id} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
            <RadioGroup
              value={votes[category.id] || ''}
              onValueChange={(val) => handleVoteChange(category.id, val)}
            >
              {category.options.map((opt) => (
                <div key={opt.id} className="flex items-center gap-3 mb-2">
                  <RadioGroupItem value={opt.id} id={`${category.id}-${opt.id}`} />
                  <Label htmlFor={`${category.id}-${opt.id}`}>
                    {opt.text} <span className="text-gray-500 text-sm">(Cost: {opt.cost})</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <Button onClick={handleFinalizeVotes}>Finalize & Proceed to Reflection</Button>
      </div>
    );
  }

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
