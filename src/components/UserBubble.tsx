// UserBubble.tsx
import React from 'react';

interface UserBubbleProps {
  text: string;
}

export function UserBubble({ text }: UserBubbleProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-green-100 border border-green-300 p-3 rounded-xl max-w-xl text-right shadow-sm">
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
