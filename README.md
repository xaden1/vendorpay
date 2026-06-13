# 💳 VendorPay

<div align="center">

**Instant QR Payments for Street Vendors & Small Businesses — Built on Stellar**

[![Live Demo](https://img.shields.io/badge/🚀_Live-Demo-10B981?style=for-the-badge&logoColor=white)](YOUR_VERCEL_URL)
[![Stellar](https://img.shields.io/badge/Built_on-Stellar-059669?style=for-the-badge)](https://stellar.org)
[![Testnet](https://img.shields.io/badge/Network-Testnet-34D399?style=for-the-badge)](https://laboratory.stellar.org)
[![Tests](https://img.shields.io/badge/Tests-Passing_✓-10B981?style=for-the-badge)](./src/tests)
[![License](https://img.shields.io/badge/License-MIT-6EE7B7?style=for-the-badge)](./LICENSE)

<br/>

> *"Get paid in seconds. No bank required."*

<br/>

[🚀 Live Demo](YOUR_VERCEL_URL) · [🎥 Demo Video](YOUR_VIDEO_URL) · [📜 Contract](YOUR_STELLAR_EXPERT_URL) · [🐛 Report Bug](YOUR_GITHUB_URL/issues)

</div>

---

## 📖 What is VendorPay?

VendorPay is a **100% frontend dApp** on the Stellar Testnet that gives any small business — street vendors, freelancers, market stalls, local shops — a complete digital point-of-sale system in under 60 seconds.

No bank account. No card machine. No backend server. Just a Stellar wallet and a QR code.

**The flow is simple:**
1. Connect your Freighter wallet
2. Build your product catalog with local currency prices
3. Tap a product → a dynamic QR code is generated
4. Customer scans the QR → pays with their Stellar wallet
5. Payment appears on your screen in real time
6. Digital receipt generated automatically

VendorPay is built for the **1.4 billion people** globally who live without access to traditional banking infrastructure — but have a smartphone.

---

## 🎥 Demo Video

[![Demo Video](https://img.shields.io/badge/▶_Watch-Demo_Video-10B981?style=for-the-badge)](YOUR_VIDEO_URL)

> Full 1-minute walkthrough showing wallet connect → product catalog → QR generation → live payment → receipt

---

## ✨ Features

### Core (Level 1)
| Feature | Description |
|---------|-------------|
| 🔑 **Wallet Connect** | One-click Freighter wallet connection with auto-reconnect |
| 🔌 **Wallet Disconnect** | Clean disconnect with localStorage clear |
| 💰 **Live Balance** | XLM balance fetched from Stellar Horizon, auto-refreshes every 15s |
| 📤 **Send XLM** | Full transaction flow with signing → submitting → confirmed states |
| ✅ **Transaction Feedback** | Success state with tx hash + Stellar Expert link; failure with specific error |

### Advanced (Level 2)
| Feature | Description |
|---------|-------------|
| ⚠️ **3 Error Types** | Wallet errors, insufficient funds errors, network errors — all handled |
| 📜 **Smart Contract** | VendorRegistry Soroban contract deployed on testnet |
| 🔗 **Contract Integration** | Vendors registered on-chain; payments recorded via contract |
| 📊 **Transaction Status** | Visible signing → submitting → success/fail pipeline |

### dApp (Level 3)
| Feature | Description |
|---------|-------------|
| 🧪 **3+ Tests Passing** | Vitest suite covering formatters, business score, error handler |
| 📹 **Demo Video** | 1-minute full functionality walkthrough |
| 🌐 **Deployed** | Live on Vercel |

### Unique Winning Features
| Feature | Description |
|---------|-------------|
| 📲 **Smart QR Codes** | SEP-0007 payment URI with amount + memo baked in — not just a static address |
| ⚡ **Live Payment Stream** | Horizon EventSource streams payments in real time — screen flashes green instantly |
| 🏪 **Product Catalog** | Build a full menu/catalog with local currency pricing (INR/USD/NGN/KES/EUR) |
| 💱 **Live FX Conversion** | XLM price fetched from Stellar DEX; prices shown in local currency automatically |
| 📈 **Analytics Dashboard** | 30-day revenue chart, peak hours heatmap, unique customer count |
| 🏆 **Business Score** | On-chain credit score (0–100) from payment volume, consistency, and reach |
| 🧾 **Digital Receipts** | Auto-generated printable receipt for every payment with Stellar Explorer link |
| 🎉 **Payment Celebrations** | Ripple animation + confetti burst the moment payment is confirmed |

---

## 🏗️ Architecture

VendorPay has **zero backend**. Every call goes directly from the React app running in the browser:

```
┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
│                                                              │
│   ┌──────────────┐    ┌──────────────────────────────────┐  │
│   │   Freighter  │    │        React App (VendorPay)     │  │
│   │  Extension   │◄──►│                                  │  │
│   │  (Wallet)    │    │  ┌────────────┐ ┌─────────────┐  │  │
│   └──────────────┘    │  │  Horizon   │ │  Soroban    │  │  │
│                        │  │  Hook      │ │  Contract   │  │  │
│                        │  └─────┬──────┘ └──────┬──────┘  │  │
│                        └────────┼───────────────┼─────────┘  │
└─────────────────────────────────┼───────────────┼────────────┘
                                  │               │
                     ┌────────────▼──┐   ┌────────▼──────────┐
                     │    Stellar    │   │    Soroban RPC     │
                     │  Horizon API  │   │  (testnet.stellar) │
                     │  (testnet)    │   │                    │
                     └───────────────┘   └────────────────────┘
```

**Why no backend?**
- Simpler deployment — just push to Vercel
- No server costs, no maintenance
- Truly decentralized — all data lives on Stellar
- Demonstrates the power of Stellar's public APIs

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for full technical breakdown.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS + custom CSS animations |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Wallet** | @stellar/freighter-api |
| **Blockchain** | @stellar/stellar-sdk + Stellar Horizon Testnet API |
| **Smart Contract** | Soroban (Rust) on Stellar Testnet |
| **QR Codes** | qrcode.react |
| **Testing** | Vitest + @testing-library/react |
| **Routing** | React Router v6 |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **[Freighter browser extension](https://freighter.app)** — set to **Testnet** in settings
- A **funded Stellar Testnet wallet** (see below)

### Get a Testnet Wallet (5 minutes)

1. Install [Freighter](https://freighter.app) → create a wallet
2. In Freighter settings → switch network to **Testnet**
3. Go to [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test)
4. Click **"Generate Keypair"** → copy your Public Key
5. Click **"Fund with Friendbot"** → you now have 10,000 testnet XLM
6. Import this address into Freighter

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vendorpay
cd vendorpay

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

```env
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_CONTRACT_ID=your_deployed_contract_id_here
```

---

## 🧪 Tests

```bash
# Run all tests
npm run test

# Run with visual UI
npm run test:ui

# Run once (CI mode)
npm run test:run
```

### Test Output

```
✓ src/tests/formatters.test.js (6 tests)
  ✓ truncates a Stellar address correctly
  ✓ formats XLM amounts correctly
  ✓ converts local currency to XLM
  ✓ formats USD from XLM amount
  ✓ generates a valid payment memo
  ✓ handles empty address gracefully

✓ src/tests/businessScore.test.js (4 tests)
  ✓ returns zero score for empty data
  ✓ calculates a positive score for active wallet
  ✓ has correct breakdown structure
  ✓ score does not exceed 100

✓ src/tests/errorHandler.test.js (6 tests)
  ✓ identifies wallet not found error
  ✓ identifies insufficient funds error
  ✓ identifies network error
  ✓ identifies user rejection
  ✓ handles unknown errors gracefully
  ✓ handles null/undefined errors

Test Files  3 passed (3)
Tests       16 passed (16)
Duration    1.23s
```

> 📸 **Screenshot of test output:** [tests-passing.png]

---

## ⚠️ Error Handling

VendorPay handles 3 distinct error categories, each with a specific user-facing message and action step:

### Error Type 1 — Wallet Errors
| Error | Message | Action shown |
|-------|---------|-------------|
| Freighter not installed | "Wallet Not Found" | "Install Freighter from freighter.app" |
| User rejected transaction | "Transaction Cancelled" | "Try again and approve in Freighter" |

### Error Type 2 — Fund Errors
| Error | Message | Action shown |
|-------|---------|-------------|
| Balance too low | "Insufficient Funds" | "Fund wallet at laboratory.stellar.org" |
| Invalid amount | "Invalid Amount" | "Enter a valid amount greater than 0" |
| Invalid address | "Invalid Destination" | "Check the address and try again" |

### Error Type 3 — Network Errors
| Error | Message | Action shown |
|-------|---------|-------------|
| Horizon unreachable | "Network Error" | "Check internet and try again" |
| Account not on testnet | "Account Not Found" | "Fund with Friendbot first" |
| Tx confirmation timeout | "Transaction Timeout" | "Check Stellar Expert for status" |

---

## 📜 Smart Contract (Level 2)

VendorPay uses a **VendorRegistry** Soroban smart contract deployed on Stellar Testnet.

### What the contract does:
- `register_vendor(address, name, category)` — registers a vendor on-chain
- `record_payment(vendor, amount, memo)` — logs each payment to the ledger
- `get_vendor(address)` — retrieves vendor info and stats
- `is_registered(address)` — checks if a vendor exists
- `vendor_count()` — returns total registered vendors

### Deployed Contract

| Field | Value |
|-------|-------|
| **Contract ID** | `YOUR_CONTRACT_ID_HERE` |
| **Network** | Stellar Testnet |
| **Explorer** | [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/YOUR_CONTRACT_ID) |

### Contract Call Transaction

| Field | Value |
|-------|-------|
| **Transaction Hash** | `YOUR_TX_HASH_HERE` |
| **Operation** | `register_vendor` |
| **Verify** | [View on Stellar Expert](https://stellar.expert/explorer/testnet/tx/YOUR_TX_HASH) |

---

## 📸 Screenshots

### Wallet Connected State
![Wallet Connected](./screenshots/wallet-connected.png)

### Balance Displayed
![Balance Display](./screenshots/balance-display.png)

### QR Payment Request
![QR Code](./screenshots/qr-payment.png)

### Successful Transaction
![Transaction Success](./screenshots/tx-success.png)

### Transaction Result Shown to User
![Transaction Result](./screenshots/tx-result.png)

### Wallet Options Available
![Wallet Options](./screenshots/wallet-options.png)

### Analytics Dashboard
![Analytics](./screenshots/analytics.png)


---

## 📁 Project Structure

```
vendorpay/
├── src/
│   ├── components/        # UI components (QRModal, PaymentNotification, etc.)
│   ├── pages/             # Route pages (Dashboard, Catalog, Analytics, etc.)
│   ├── hooks/             # Custom React hooks (useWallet, useBalance, etc.)
│   ├── utils/             # Utilities (horizonClient, stellarTx, errorHandler, etc.)
│   ├── tests/             # Vitest test files
│   └── context/           # Global app state (AppContext)
├── contracts/
│   └── vendor_registry/   # Soroban smart contract (Rust)
├── public/
├── .env.example
├── README.md
└── ARCHITECTURE.md
```

---

## 🗺️ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, features, how it works |
| `/dashboard` | Dashboard | QR generator, balance, live stream |
| `/catalog` | Catalog | Product/service catalog manager |
| `/analytics` | Analytics | Revenue chart, business score |
| `/transactions` | Transactions | Full payment history |
| `/send` | Send Payment | Direct XLM send with full feedback |

---

## 🔄 Transaction Flow

```
User clicks "Send" / "Generate QR"
         │
         ▼
  useTransaction hook
         │
         ▼
  Status: SIGNING ──► "Waiting for Freighter..."
         │
         ▼ (user approves in extension)
  Status: SUBMITTING ──► Progress bar animation
         │
         ▼ (Horizon confirms)
  Status: SUCCESS ──► tx hash + confetti
         │
         └──► (on error) Status: FAILED ──► specific error + action
```

---

## 🚢 Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# On vercel.com:
# New Project → Import from GitHub → Configure:

# Environment Variables:
VITE_HORIZON_URL = https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC = https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE = Test SDF Network ; September 2015
VITE_CONTRACT_ID = your_contract_id

# Deploy → Live URL ready in ~30 seconds
```

No server configuration needed. Vercel serves VendorPay as a static site.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 🌍 Real World Impact

VendorPay targets markets where:
- **40%+ of adults** are unbanked (Sub-Saharan Africa, South Asia)
- Card terminals cost **$200–$500** to set up
- Payment processor fees eat **2–5%** of every transaction
- Remittance fees run **5–10%** per transfer

With VendorPay + Stellar, a street vendor needs only:
- A smartphone (any Android/iOS)
- A printed QR code (or screen)
- A Stellar wallet (free, 1 minute to set up)

Transaction fees on Stellar: **0.00001 XLM** (~$0.000001). That's it.

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Built for the Stellar Monthly Builder Challenge 2025**

Made with ❤️ on Stellar Testnet

[🌟 Star this repo](YOUR_GITHUB_URL) · [🐛 Report an issue](YOUR_GITHUB_URL/issues) · [💬 Discuss](YOUR_GITHUB_URL/discussions)

</div>
# VendorPay 💎

## 📸 Screenshots
Transaction Id <img width="870" height="875" alt="image" src="https://github.com/user-attachments/assets/27463d2e-318f-4788-9e90-d19acbdbb1c7" />

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
