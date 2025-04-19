'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BudgetTracker } from '@/components/BudgetTracker';
import { CategoryCard } from '@/components/CategoryCard';
import { policyOptions } from '@/constants/policies';

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select Your Policy Options</h1>
      <BudgetTracker total={totalCost} max={14} />

      {policyOptions.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          selectedOption={selections[category.id]}
          onSelect={(option) => handleSelect(category.id, option)}
        />
      ))}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        <Button onClick={handleConfirm}>Confirm Selections</Button>
      </div>
    </div>
  );
}