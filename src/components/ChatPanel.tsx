// ChatPanel.tsx
'use client';

import React from 'react';
import { AgentBubble } from './AgentBubble';
import { UserBubble } from './UserBubble';

interface Message {
  speaker: string;
  text: string;
}

interface ChatPanelProps {
  messages: Message[];
}

export function ChatPanel({ messages }: ChatPanelProps) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border h-[400px] overflow-y-auto">
      {messages.map((msg, idx) => (
        <div key={idx} className="w-full">
          {msg.speaker === 'You' ? (
            <UserBubble text={msg.text} />
          ) : (
            <AgentBubble name={msg.speaker} text={msg.text} />
          )}
        </div>
      ))}
    </div>
  );
}
