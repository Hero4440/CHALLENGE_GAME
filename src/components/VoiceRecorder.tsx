'use client';

import { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
}

// Type definition for SpeechRecognition & related interfaces
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface WebSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((this: WebSpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: WebSpeechRecognition, ev: Event) => void) | null;
  onend: ((this: WebSpeechRecognition, ev: Event) => void) | null;
}

type SpeechRecognitionConstructor = new () => WebSpeechRecognition;

export function VoiceRecorder({ onTranscript, placeholder = 'Speak now...' }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const fullTranscriptRef = useRef('');
  const shouldStopRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition: SpeechRecognitionConstructor | undefined =
        (window as unknown as {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }).SpeechRecognition ||
        (window as unknown as {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-US';

        recog.onresult = (event: SpeechRecognitionEvent) => {
          const results = Array.from(event.results);
          const finalTranscript = results
            .map((r) => r[0]?.transcript ?? '')
            .join(' ');
          fullTranscriptRef.current = finalTranscript.trim();
          setTranscript(fullTranscriptRef.current);
        };

        recog.onerror = (err: Event) => {
          console.error('Speech recognition error:', err);
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