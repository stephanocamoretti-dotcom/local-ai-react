import { useCallback, useEffect, useRef, useState } from 'react';

export type LocalAiAvailability = 'checking' | 'available' | 'downloadable' | 'unavailable';

interface LanguageModelSession {
  promptStreaming: (input: string, options?: { signal?: AbortSignal }) => AsyncIterable<string>;
  destroy: () => void;
}

interface LanguageModelStatic {
  availability: () => Promise<'available' | 'downloadable' | 'downloading' | 'unavailable'>;
  create: (options?: {
    systemPrompt?: string;
    temperature?: number;
    topK?: number;
  }) => Promise<LanguageModelSession>;
}

declare global {
  interface Window {
    LanguageModel?: LanguageModelStatic;
  }
}

export function useLocalAi(systemPrompt = 'You are a concise, helpful on-device AI assistant.') {
  const [availability, setAvailability] = useState<LocalAiAvailability>('checking');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<LanguageModelSession | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!window.LanguageModel) {
        if (!cancelled) setAvailability('unavailable');
        return;
      }
      try {
        const status = await window.LanguageModel.availability();
        if (!cancelled) {
          setAvailability(status === 'downloading' ? 'downloadable' : status);
        }
      } catch {
        if (!cancelled) setAvailability('unavailable');
      }
    }
    void check();
    return () => {
      cancelled = true;
      sessionRef.current?.destroy();
    };
  }, []);

  const generate = useCallback(
    async (promptText: string) => {
      if (!window.LanguageModel) {
        setError('Chrome Built-in Prompt API (LanguageModel) is not available in this browser.');
        return;
      }
      try {
        setError(null);
        setOutput('');
        setIsGenerating(true);

        if (!sessionRef.current) {
          sessionRef.current = await window.LanguageModel.create({ systemPrompt });
        }

        abortRef.current = new AbortController();
        const stream = sessionRef.current.promptStreaming(promptText, {
          signal: abortRef.current.signal,
        });

        for await (const chunk of stream) {
          setOutput((prev) => prev + chunk);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Local inference failed');
        }
      } finally {
        setIsGenerating(false);
      }
    },
    [systemPrompt]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsGenerating(false);
  }, []);

  return { availability, output, isGenerating, error, generate, stop };
}
