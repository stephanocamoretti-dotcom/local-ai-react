<p align="right">
  <a href="./README.md">🇺🇸 Read in English</a>
</p>

<p align="center">
  <img src="./assets/banner.svg" alt="Banner de Local AI React" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Browser_AI-Prompt_API-34D399?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Prompt API" />
  <img src="https://img.shields.io/badge/License-MIT-818CF8?style=for-the-badge" alt="Licencia MIT" />
</p>

# local-ai-react

Hook en React + TypeScript (`useLocalAi`) y consola con streaming para ejecutar **inferencia de IA local directamente en el navegador** mediante la **Prompt API integrada de Chrome (`LanguageModel`)**, sin servidores backend, sin costo por tokens y con privacidad total offline.

---

## Arquitectura

```mermaid
flowchart LR
    UI["LocalAiConsole.tsx"] --> Hook["Hook useLocalAi()"]
    Hook --> Check{"LanguageModel.availability()"}
    Check -->|available| Session["LanguageModel.create()"]
    Session --> Stream["promptStreaming() AsyncIterable"]
    Stream --> UI
    Check -->|unavailable| Fallback["Fallback a API en la nube"]
```

---

## Inicio rápido

```bash
git clone https://github.com/stephanocamoretti-dotcom/local-ai-react.git
cd local-ai-react
npm install
npm run dev
```

---

## Referencias

- [Chrome for Developers — Prompt API (Built-in AI)](https://developer.chrome.com/docs/ai/prompt-api)
- [W3C WebML Community Group — Prompt API Explainer](https://github.com/webmachinelearning/prompt-api)
