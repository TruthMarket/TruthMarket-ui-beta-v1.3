# TruthMarket - Decentralized Truth Repository

TruthMarket is a decentralized application (dApp) built on Web3 technologies that provides secure, anonymous storage and sharing of truth-related content. The platform leverages blockchain technology to ensure immutability and transparency while protecting user privacy.

![TruthMarket](./src/assets/show/show01.png) 

## Project Overview

TruthMarket creates a secure environment where users can:
- Upload and share evidence or information anonymously
- Utilize encryption for sensitive content
- Interact with a marketplace of truth-related content
- Create NFTs associated with evidence or information
- Benefit from the security and immutability of blockchain technology

## Key Features

- **End-to-End Encryption**: Secure content sharing using ECDH key exchange and AES-GCM encryption
- **Anonymous Content Submission**: Submit content without revealing your identity
- **Marketplace**: Browse, search, and access shared content
- **NFT Integration**: Create NFTs associated with your submissions
- **Decentralized Storage**: Content stored securely on decentralized networks
- **User-Friendly Interface**: Modern React-based UI with responsive design

## Technology Stack

- Frontend: React with TypeScript
- Build Tool: Vite
- Styling: SCSS Modules
- Blockchain Interaction: Web3.js/Ethers.js
- Encryption: Web Crypto API
- File Storage: IPFS or similar decentralized storage

## Installation

1. Clone the repository
```bash
git clone https://github.com/TruthMarket/truth-market-app.git
cd TruthMarket-react
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

- `/src/dapp/` - Main application code
  - `/components/` - Reusable UI components
  - `/pages/` - Application pages
  - `/utils/` - Utility functions including crypto operations
  - `/useState/` - State management
  - `/useReadWrite/` - Blockchain interaction

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
