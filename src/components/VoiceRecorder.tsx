// VoiceRecorder.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
}

export function VoiceRecorder({ onTranscript, placeholder = 'Speak now...' }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const fullTranscriptRef = useRef('');
  const shouldStopRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          const results = Array.from(event.results);
          const finalTranscript = results.map(r => r[0].transcript).join(' ');
          fullTranscriptRef.current = finalTranscript.trim();
          setTranscript(fullTranscriptRef.current);
        };

        recog.onerror = (err: any) => {
          console.error('Full error event:', err);
        };

        recog.onend = () => {
          if (!shouldStopRef.current) {
            recog.start();
          }
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  const handleStart = () => {
    if (recognitionRef.current) {
      setTranscript('');
      fullTranscriptRef.current = '';
      shouldStopRef.current = false;
      setRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      shouldStopRef.current = true;
      setRecording(false);
      recognitionRef.current.stop();
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