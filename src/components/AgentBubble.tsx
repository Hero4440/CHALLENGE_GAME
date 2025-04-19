// AgentBubble.tsx
import React from 'react';

interface AgentBubbleProps {
  name: string;
  text: string;
}

export function AgentBubble({ name, text }: AgentBubbleProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        {name[0]}
      </div>
      <div className="bg-white border border-blue-200 p-3 rounded-xl max-w-xl shadow-sm">
        <p className="text-sm font-semibold text-blue-600 mb-1">{name}</p>
        <p className="text-gray-800 text-sm whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}