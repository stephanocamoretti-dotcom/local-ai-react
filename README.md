<p align="right">
  <a href="./README.es.md">🇪🇸 Leer en Español</a>
</p>

<p align="center">
  <img src="./assets/banner.svg" alt="Local AI React Banner" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Browser_AI-Prompt_API-34D399?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Prompt API" />
  <img src="https://img.shields.io/badge/License-MIT-818CF8?style=for-the-badge" alt="MIT License" />
</p>

# local-ai-react

A lightweight React + TypeScript hook (`useLocalAi`) and streaming console for running **on-device AI inference directly inside the browser** using the **Chrome Built-in AI Prompt API (`LanguageModel`)**—with zero backend servers, zero API token costs, and full offline privacy.

---

## Architecture

```mermaid
flowchart LR
    UI["LocalAiConsole.tsx"] --> Hook["useLocalAi() Hook"]
    Hook --> Check{"LanguageModel.availability()"}
    Check -->|available| Session["LanguageModel.create()"]
    Session --> Stream["promptStreaming() AsyncIterable"]
    Stream --> UI
    Check -->|unavailable| Fallback["Graceful Fallback / Cloud API"]
```

---

## Quick Start

```bash
git clone https://github.com/stephanocamoretti-dotcom/local-ai-react.git
cd local-ai-react
npm install
npm run dev
```

---

## References

- [Chrome for Developers — Prompt API (Built-in AI)](https://developer.chrome.com/docs/ai/prompt-api)
- [W3C WebML Community Group — Prompt API Explainer](https://github.com/webmachinelearning/prompt-api)
