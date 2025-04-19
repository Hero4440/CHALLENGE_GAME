// src/app/page.tsx

'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const rulesText = `
1. Budget Limit:
   - You have a total budget of 14 units to allocate across all policy decisions.

2. Option Costs:
   - Option 1 costs 1 unit
   - Option 2 costs 2 units
   - Option 3 costs 3 units

3. Budget Management:
   - Ensure the total cost of your selected policies does not exceed 14 units.

4. Policy Selection Variety:
   - You cannot select all policies from only one option (e.g., all Option 1s).
   - A mix of options is required to encourage balanced decision-making.

5. Strategic Decision-Making:
   - Consider pros and cons of each option to design an inclusive refugee education package within constraints.
`;

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
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
