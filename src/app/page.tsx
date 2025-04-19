// src/app/page.tsx

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const rulesText = `
1. Budget Limit
   You have a total of 14 units to spend across 7 education policy categories. Choose wisely — every decision matters.

2. Option Costs
   • Option 1 costs 1 unit
   • Option 2 costs 2 units
   • Option 3 costs 3 units

3. Balance Your Budget
   Your total choices must not exceed 14 units. The interface will guide you, but the strategy is yours.

4. Policy Diversity Required
   You must select exactly one option per category. Avoid picking only the cheapest or most expensive — explore trade-offs.

5. Think Like a Leader
   Consider not just what’s practical, but what’s just. Balance cost, impact, and equity as you shape refugee education in the Republic of Bean.
`;

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute top-4 left-8 text-lg font-bold text-black">THE CHALLENGE GAME</div>

      <h1 className="text-4xl font-bold mb-4">Welcome to the Republic of Bean</h1>
      <p className="text-lg max-w-xl">
        Step into the role of a policymaker. Make decisions. Build justice. Shape refugee education for the future.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/phase1"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Begin Game
        </a>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="px-6 py-3 border border-black rounded-xl hover:bg-gray-100">
              View Rules
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg text-left whitespace-pre-wrap">
            <DialogHeader>
              <DialogTitle>Game Rules</DialogTitle>
            </DialogHeader>
            {rulesText}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
