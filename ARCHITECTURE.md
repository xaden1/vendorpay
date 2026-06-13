# Architecture Overview

VendorPay is built with a strictly client-side architecture to maximize decentralization and reduce infrastructure costs.

## State Management (`AppContext.jsx`)
Instead of Redux or Zustand, VendorPay relies on a centralized React Context (`AppContext`) paired with custom hooks. This provides the entire app with:
- Wallet connection state
- XLM Balance and price feeds
- Transaction history and real-time streaming updates
- Local product catalog
- Smart contract interface

## Blockchain Interaction
All blockchain interaction is localized in `src/utils/`:
- **`horizonClient.js`**: Fetches balances, history, orderbooks, and sets up SSE streams.
- **`stellarTx.js`**: Handles transaction building and freighter API interaction.
- **`contractClient.js`**: Handles Soroban contract simulation and execution.

## Data Persistence
Because there is no database, we use the blockchain itself as the source of truth for transaction history and balances. 
The **Product Catalog** is stored in `localStorage` for fast retrieval across sessions.
The **Business Registration** is meant to be stored in the Soroban smart contract (fallback to local storage if contract not deployed).

## Real-time Updates
We use Stellar's Server-Sent Events (`EventSource`) to subscribe to the user's account cursor. When a new transaction arrives, we parse it, update the local balance, append the operation to the history, and trigger the `PaymentNotification` popup globally.
