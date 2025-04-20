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
import { motion } from 'framer-motion';

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
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 overflow-hidden">
      {/* Decorative animated background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full opacity-20 animate-ping z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0 pointer-events-none" />

      {/* Text logo */}
      <div className="absolute top-4 left-8 text-lg font-bold text-black z-10">THE CHALLENGE GAME</div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to the Republic of Bean</h1>
        <p className="text-lg max-w-xl">
          Step into the role of a policymaker. Make decisions. Build justice. Shape refugee education for the future.
        </p>
        <p className="italic text-gray-500 mt-4">
          “Education is the most powerful weapon you can use to change the world.” — Nelson Mandela
        </p>

        <div className="mt-8 flex gap-4 justify-center">
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
      </motion.div>
      <footer className="mt-12 text-sm text-gray-500">
      Made with ❤️ by Hero4440 (Tejas) and Aarya
    </footer>
    </main>
  );
}
