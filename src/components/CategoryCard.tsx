// CategoryCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Option {
  id: string;
  text: string;
  cost: number;
}

interface Category {
  id: string;
  title: string;
  options: Option[];
}

interface CategoryCardProps {
  category: Category;
  selectedOption?: Option;
  onSelect: (option: Option) => void;
}

export function CategoryCard({ category, selectedOption, onSelect }: CategoryCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
        <RadioGroup
          value={selectedOption?.id || ''}
          onValueChange={(val) => {
            const opt = category.options.find((o) => o.id === val);
            if (opt) onSelect(opt);
          }}
        >
          {category.options.map((opt) => (
            <div key={opt.id} className="flex items-center space-x-4 mb-2">
              <RadioGroupItem value={opt.id} id={`${category.id}-${opt.id}`} />
              <Label htmlFor={`${category.id}-${opt.id}`}>
                {opt.text} <span className="text-sm text-gray-500">(Cost: {opt.cost})</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
