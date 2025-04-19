// VoiceRecorder.tsx
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
}

export function VoiceRecorder({ onTranscript, placeholder = 'Speak now...' }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          onTranscript(text);
        };

        recog.onerror = (err: any) => {
          console.error('Speech recognition error:', err);
        };

        setRecognition(recog);
      }
    }
  }, [onTranscript]);

  const handleStart = () => {
    if (recognition) {
      setTranscript('');
      setRecording(true);
      recognition.start();
    }
  };

  const handleStop = () => {
    if (recognition) {
      setRecording(false);
      recognition.stop();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          onTranscript(e.target.value);
        }}
        placeholder={placeholder}
      />
      <div className="flex gap-2">
        <Button type="button" onClick={handleStart} disabled={recording}>
          🎙 Start
        </Button>
        <Button type="button" onClick={handleStop} disabled={!recording} variant="secondary">
          ⏹ Stop
        </Button>
      </div>
    </div>
  );
}
