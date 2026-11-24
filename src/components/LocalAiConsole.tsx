import { useState } from 'react';
import { Cpu, Send, Square } from 'lucide-react';
import { useLocalAi } from '../hooks/useLocalAi';

export function LocalAiConsole() {
  const [prompt, setPrompt] = useState('');
  const { availability, output, isGenerating, error, generate, stop } = useLocalAi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    void generate(prompt);
  };

  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', padding: 24, maxWidth: 760, margin: '0 auto', gap: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Cpu size={20} color="#34d399" />
          <strong style={{ fontSize: 18 }}>local-ai-react</strong>
        </div>
        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: '#1e293b', color: '#38bdf8' }}>
          On-Device Status: {availability.toUpperCase()}
        </span>
      </header>

      <section style={{ flex: 1, background: '#0f172a', borderRadius: 12, padding: 20, border: '1px solid #1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
        {error ? <span style={{ color: '#f87171' }}>{error}</span> : output || 'Run private, zero-cost AI inference directly in your browser...'}
      </section>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask your local browser model..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#f8fafc' }}
        />
        <button
          type={isGenerating ? 'button' : 'submit'}
          onClick={isGenerating ? stop : undefined}
          style={{ padding: '12px 18px', borderRadius: 10, border: 'none', background: isGenerating ? '#ef4444' : '#34d399', color: '#020617', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {isGenerating ? <Square size={16} /> : <Send size={16} />}
          {isGenerating ? 'Stop' : 'Run'}
        </button>
      </form>
    </main>
  );
}
