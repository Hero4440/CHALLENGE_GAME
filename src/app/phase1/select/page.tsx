'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BudgetTracker } from '@/components/BudgetTracker';
import { CategoryCard } from '@/components/CategoryCard';
import { policyOptions } from '@/constants/policies';
import { motion } from 'framer-motion';

export default function PolicySelectionPage() {
  const [selections, setSelections] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const sum = Object.values(selections).reduce((acc, item: any) => acc + (item?.cost || 0), 0);
    setTotalCost(sum);
  }, [selections]);

  const handleSelect = (category: string, option: any) => {
    const newSelections = { ...selections, [category]: option };
    const newTotal = Object.values(newSelections).reduce((acc, item: any) => acc + item.cost, 0);
    if (newTotal <= 14) {
      setSelections(newSelections);
      setError('');
    } else {
      setError('Budget exceeded. Please choose lower-cost options.');
    }
  };

  const handleConfirm = () => {
    if (Object.keys(selections).length !== policyOptions.length) {
      setError('Please make a selection for each category.');
      return;
    }
    if (totalCost > 14) {
      setError('Total budget exceeds 14 units.');
      return;
    }

    localStorage.setItem('policyChoices', JSON.stringify(selections));
    router.push('/phase2');
  };

  return (
    <main className="relative min-h-screen bg-gray-50 px-6 py-12">
      {/* Decorative background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full opacity-20 animate-ping z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="sticky top-0 z-10 bg-gray-50 py-4 mb-6 border-b">
          <h1 className="text-3xl font-bold mb-2">Select Your Policy Options</h1>
          <BudgetTracker total={totalCost} max={14} />
        </div>

        <div className="space-y-6">
          {policyOptions.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selectedOption={selections[category.id]}
              onSelect={(option) => handleSelect(category.id, option)}
            />
          ))}
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-8 text-center">
          <Button onClick={handleConfirm}>Confirm Selections</Button>
        </div>
      </motion.div>
    </main>
  );
}
