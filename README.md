# VendorPay 💎

![Transaction Id] <img width="870" height="875" alt="image" src="https://github.com/user-attachments/assets/27463d2e-318f-4788-9e90-d19acbdbb1c7" />

A pure frontend dApp on the Stellar network that turns any device into a digital point-of-sale system. Designed for street vendors, freelancers, and small businesses to accept instant XLM payments without needing a bank account.

## Features
- **No Backend:** Runs entirely in the browser communicating directly with the Stellar Horizon API.
- **Freighter Wallet Integration:** Seamless login and transaction signing.
- **Dynamic QR Codes:** Generate specific payment URIs encoded as QRs for exact amounts.
- **Live Notifications:** Server-Sent Events (SSE) listen to the blockchain for instant payment alerts.
- **Business Analytics:** Automatically calculates a "Business Score" based on volume, consistency, and network diversity.
- **Product Catalog:** Manage your goods/services with local currency conversion using real-time XLM orderbook data.

## Running Locally

1. `npm install`
2. Configure `.env` with a `VITE_CONTRACT_ID` if you deploy the Soroban registry contract.
3. `npm run dev`

## Tech Stack
- React 18
- Vite
- TailwindCSS 3
- Framer Motion
- `@stellar/stellar-sdk` & `@stellar/freighter-api`
- Recharts

## License
MIT
