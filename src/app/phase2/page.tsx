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
import { getAgentResponse } from '@/lib/openai';
import { motion } from 'framer-motion';

interface Message {
  speaker: string;
  text: string;
}

interface PolicyOption {
  id: string;
  text: string;
  cost: number;
}

type Votes = Record<string, string>; // categoryId -> optionId
type FinalPackage = Record<string, PolicyOption>;

export default function PhaseTwoPage() {
  const router = useRouter();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [participantMessage, setParticipantMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votingStage, setVotingStage] = useState(false);
  const [votes, setVotes] = useState<Votes>({});
  const [selectedChoice, setSelectedChoice] = useState<PolicyOption | null>(null);

  const currentCategory = policyOptions[categoryIndex];

  useEffect(() => {
    setChatLog([]);
    setParticipantMessage('');

    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('policyChoices') || '{}');
      if (data[currentCategory.id]) {
        setSelectedChoice(data[currentCategory.id]);
      } else {
        setSelectedChoice(null);
      }
    }
  }, [categoryIndex, currentCategory.id]);

  const handleParticipantSubmit = async () => {
    if (!participantMessage.trim()) return;
    setIsSubmitting(true);
    const newLog: Message[] = [{ speaker: 'You', text: participantMessage }];

    for (const agent of agentProfiles) {
      const reply = await getAgentResponse(agent.name, participantMessage, currentCategory.title);
      newLog.push({ speaker: agent.name, text: reply });
    }

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
    const final: FinalPackage = {};

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Vote on Final Policies</h1>

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
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-2">
        Category {categoryIndex + 1} of {policyOptions.length}: {currentCategory.title}
      </h1>

      {selectedChoice && (
        <p className="text-md mb-4 text-gray-700 italic">
          <strong>Your Choice:</strong> {selectedChoice.text}{' '}
          <span className="text-gray-500">(Cost: {selectedChoice.cost})</span>
        </p>
      )}

      <ChatPanel
        messages={
          chatLog.length
            ? chatLog
            : [{ speaker: 'System', text: 'Please share your justification to begin.' }]
        }
      />

      <div className="mt-4">
        <VoiceRecorder
          onTranscript={(text) => setParticipantMessage(text)}
          placeholder="Explain why you chose your policy..."
        />
        <Button
          onClick={handleParticipantSubmit}
          disabled={isSubmitting || !participantMessage}
          className="mt-3"
        >
          Submit Justification
        </Button>
      </div>

      {chatLog.length > 1 && (
        <div className="mt-6">
          <Button variant="secondary" onClick={handleNext}>
            Next Category
          </Button>
        </div>
      )}
    </motion.div>
  );
}