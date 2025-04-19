'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function PhaseOnePage() {
  const [formData, setFormData] = useState({
    age: '',
    nationality: '',
    occupation: '',
    educationLevel: '',
    displacementExperience: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    localStorage.setItem('participantInfo', JSON.stringify(formData));
    router.push(`/phase1/story`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Background (for research purposes)</h1>

      {['age', 'nationality', 'occupation', 'educationLevel', 'displacementExperience', 'location'].map((field) => (
        <div className="mb-4" key={field}>
          <Label htmlFor={field} className="capitalize">
            {field.replace(/([A-Z])/g, ' $1')}
          </Label>
          <Input
            id={field}
            name={field}
            type="text"
            value={(formData as any)[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            required
          />
        </div>
      ))}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Continue to Story'}
      </Button>
    </div>
  );
}