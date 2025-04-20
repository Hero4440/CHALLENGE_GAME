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
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    if (!allFieldsFilled) {
      setError('⚠️ Please fill in all the fields before continuing.');
      return;
    }
    setLoading(true);
    localStorage.setItem('participantInfo', JSON.stringify(formData));
    router.push(`/phase1/story`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Background (for research purposes)</h1>

      <div className="mb-4">
        <Label htmlFor="age">Age</Label>
        <Input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Enter your age" required />
      </div>

      <div className="mb-4">
        <Label htmlFor="nationality">Nationality</Label>
        <Input name="nationality" type="text" value={formData.nationality} onChange={handleChange} placeholder="Enter your nationality" required />
      </div>

      <div className="mb-4">
        <Label htmlFor="occupation">Occupation</Label>
        <Input name="occupation" type="text" value={formData.occupation} onChange={handleChange} placeholder="Enter your occupation" required />
      </div>

      <div className="mb-4">
        <Label htmlFor="educationLevel">Education Level</Label>
        <select
          name="educationLevel"
          value={formData.educationLevel}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select your education level</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <Label htmlFor="displacementExperience">Displacement Experience</Label>
        <Input name="displacementExperience" type="text" value={formData.displacementExperience} onChange={handleChange} placeholder="Enter any displacement experience" required />
      </div>

      <div className="mb-4">
        <Label htmlFor="location">Current Location</Label>
        <Input name="location" type="text" value={formData.location} onChange={handleChange} placeholder="Enter your current location" required />
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Continue to Story'}
      </Button>
    </div>
  );
}
