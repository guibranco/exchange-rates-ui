# 💱 Exchange Rates UI

> A sleek, real-time exchange rate dashboard built with React, TypeScript, and Tailwind CSS — deployed on GitHub Pages.

[![Deploy](https://github.com/guibranco/exchange-rates-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/guibranco/exchange-rates-ui/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌐 Live Demo

**[https://guibranco.github.io/exchange-rates-ui](https://guibranco.github.io/exchange-rates-ui)**

---

## ✨ Features

- 📊 **Currency cards** — rates for USD, EUR, BRL, and AED against 7 currencies
- 🔄 **Auto-refresh** — rates update automatically every 60 seconds
- ⏱️ **Live countdown** — shows seconds until the next refresh
- ⏸️ **Pause / Resume** — freeze auto-refresh whenever you need
- 🔃 **Manual refresh** — trigger an instant update at any time
- 🌗 **Dark & Light mode** — theme toggle with system preference support
- 📱 **Fully responsive** — 1 → 2 → 4 column grid across all screen sizes

---

## 💹 Supported Currencies

| Symbol | Currency       | Flag |
|--------|----------------|------|
| USD    | US Dollar      | 🇺🇸   |
| EUR    | Euro           | 🇪🇺   |
| BRL    | Brazilian Real | 🇧🇷   |
| AED    | UAE Dirham     | 🇦🇪   |
| GBP    | British Pound  | 🇬🇧   |
| CHF    | Swiss Franc    | 🇨🇭   |
| RUB    | Russian Ruble  | 🇷🇺   |
| BTC    | Bitcoin        | ₿    |

---

## 🛠️ Tech Stack

- ⚛️ **Framework** — [React 19](https://react.dev)
- 🔷 **Language** — [TypeScript 6](https://www.typescriptlang.org)
- ⚡ **Build tool** — [Vite 8](https://vite.dev)
- 🎨 **Styling** — [Tailwind CSS v4](https://tailwindcss.com)
- 🧩 **Components** — [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- 🧭 **Routing** — [React Router v7](https://reactrouter.com) (HashRouter)
- 🚀 **Hosting** — [GitHub Pages](https://pages.github.com)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/guibranco/exchange-rates-ui.git
cd exchange-rates-ui

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads on every save. 🔥

### Production build

```bash
npm run build       # outputs to dist/
npm run preview     # serve the production build locally
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```text
exchange-rates-ui/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (Button, Card, …)
│   │   ├── CurrencyCard.tsx    # Single currency rate card
│   │   └── Header.tsx          # Top bar with controls & theme toggle
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark / light theme provider
│   ├── data/
│   │   └── mockData.ts         # Mock API with simulated delay
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types
│   ├── App.tsx                 # Root component & auto-refresh logic
│   ├── main.tsx                # React entry point (HashRouter)
│   └── index.css               # Tailwind v4 theme & global styles
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## 🔄 Auto-Refresh Behaviour

```text
┌──────────────────────────────────────────────┐
│  App mounts → fetch rates → start 60s timer  │
│                                              │
│  Every second:  countdown ticks down         │
│  At 0 s:        fetch rates + reset to 60    │
│                                              │
│  [⏸ Pause]   → clears timer, freezes UI     │
│  [▶ Resume]  → restarts timer from now       │
│  [↺ Manual]  → immediate fetch + reset       │
└──────────────────────────────────────────────┘
```

---

## 🚢 Deployment

The project deploys automatically to GitHub Pages via the [deploy workflow](.github/workflows/deploy.yml) on every push to `main`.

```text
base URL  →  /exchange-rates-ui/
routing   →  HashRouter  (no server-side config needed)
```

---

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feat/my-feature`
3. 💾 Commit your changes: `git commit -m "feat: add my feature"`
4. 📤 Push to your fork: `git push origin feat/my-feature`
5. 🎉 Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

Made with ❤️ by [Guilherme Branco Stracini](https://github.com/guibranco)
