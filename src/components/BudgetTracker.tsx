// BudgetTracker.tsx
import React from 'react';

interface BudgetTrackerProps {
  total: number;
  max: number;
}

export function BudgetTracker({ total, max }: BudgetTrackerProps) {
  const percentage = (total / max) * 100;

  return (
    <div className="mb-6">
      <p className="mb-2 font-medium">
        Budget Used: {total} / {max}
      </p>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${percentage < 100 ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
