'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

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
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full opacity-20 animate-ping z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Your Background (for research purposes)</h1>

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
            <option value="Bachelor's">Bachelors</option>
            <option value="Master's">Masters</option>
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

        <div className="text-center">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Continue to Story'}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
