import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalAiConsole } from './components/LocalAiConsole';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalAiConsole />
  </StrictMode>
);
