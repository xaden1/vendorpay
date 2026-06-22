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

## 🚀 Live Demo
**[https://stellarmind-azure.vercel.app](https://vendorpay-ochre.vercel.app/)**

</div>

---
## 📸 Screenshots
### Wallet Connected State
 <img width="1825" height="843" alt="image" src="https://github.com/user-attachments/assets/490e305f-d6b6-49a9-a5cf-2c24ebdb8412" />

###  Payment Dashboard
<img width="1780" height="772" alt="image" src="https://github.com/user-attachments/assets/70d9d36e-fb16-4a13-9b83-ec6b8b28fcd0" />

### Analytics Dashboard
<img width="1771" height="848" alt="image" src="https://github.com/user-attachments/assets/d20b27aa-caff-443d-9edd-cb110220ebde" />

### Transaction Id 
<img width="865" height="871" alt="image" src="https://github.com/user-attachments/assets/f1c65923-2478-4d71-a75d-cc5de9225d5b" />

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


---

## ✨ Features
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



---

## 📜 Smart Contract 

VendorPay uses a **VendorRegistry** Soroban smart contract deployed on Stellar Testnet.

### What the contract does:
- `register_vendor(address, name, category)` — registers a vendor on-chain
- `record_payment(vendor, amount, memo)` — logs each payment to the ledger
- `get_vendor(address)` — retrieves vendor info and stats
- `is_registered(address)` — checks if a vendor exists
- `vendor_count()` — returns total registered vendors

---


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


