# SimpleStorage dApp Frontend

A complete Web3 dApp built with Next.js, Wagmi, and Viem to interact with the SimpleStorage smart contract on Avalanche Fuji Testnet.

## 🚀 Features

- ✅ **Wallet Connection** - Connect with Core Wallet (or any injected wallet)
- ✅ **Read Contract** - Display current stored value from blockchain
- ✅ **Write Contract** - Set new values (owner only)
- ✅ **Transaction Tracking** - Real-time transaction status with Snowtrace links
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Network Detection** - Automatic Avalanche Fuji network validation
- ✅ **Modern UI** - Beautiful glassmorphism design with gradients

## 📋 Prerequisites

1. **Core Wallet** or any Web3 wallet installed
2. **Avalanche Fuji Testnet** configured in your wallet
3. **Test AVAX** from [Avalanche Faucet](https://core.app/tools/testnet-faucet/)
4. **Deployed Contract** - You need to deploy the SimpleStorage contract first

## 🛠️ Setup Instructions

### Step 1: Update Contract Address

Open `app/contract.ts` and replace the placeholder with your deployed contract address:

```typescript
export const CONTRACT_ADDRESS = '0xYourActualContractAddressHere' as const;
```

### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

### Step 4: Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

### 1. Connect Wallet
- Click "Connect Core Wallet"
- Approve the connection in your wallet
- Ensure you're on Avalanche Fuji Testnet (Chain ID: 43113)

### 2. Read Contract
- View the current stored value
- See the contract owner address
- Click "Refresh" to update the value

### 3. Write Contract (Owner Only)
- Enter a new number value
- Click "Set Value"
- Approve the transaction in your wallet
- Wait for confirmation
- Value will auto-refresh after success

## 🔧 Technology Stack

- **Next.js 16** - React framework with App Router
- **Wagmi 3** - React hooks for Ethereum
- **Viem 2** - TypeScript Ethereum library
- **TanStack Query** - Async state management
- **TailwindCSS 4** - Utility-first CSS framework

## 📁 Project Structure

```
my-app/
├── app/
│   ├── contract.ts       # Contract ABI and address
│   ├── page.tsx          # Main dApp interface
│   ├── providers.tsx     # Wagmi and Query providers
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── package.json
└── README.md
```

## 🎯 Tasks Completed

### ✅ Task 1 - Wallet Connection
- Connect wallet with Reown/Wagmi
- Display wallet address (full and shortened)
- Display network status
- Disconnect functionality

### ✅ Task 2 - Read Contract
- Load ABI & contract address
- Call `getValue()` function
- Display result in UI
- Refresh functionality

### ✅ Task 3 - Write Contract
- Input field for new value
- Call `setValue()` function
- Handle loading states
- Error handling

### ✅ Task 4 - UX Improvements
- Disable buttons during transaction
- Shortened wallet addresses
- Transaction status alerts
- Auto-refresh value after success
- Loading indicators

### ✅ Task 5 - Failure Handling
- User rejection detection
- Wrong network warning
- Transaction revert handling
- Detailed error messages
- Owner-only validation

## 🔗 Useful Links

- [Avalanche Fuji Testnet Explorer](https://testnet.snowtrace.io/)
- [Avalanche Faucet](https://core.app/tools/testnet-faucet/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)

## 🐛 Troubleshooting

### "Please switch to Avalanche Fuji Testnet"
- Open your wallet
- Switch network to Avalanche Fuji (Chain ID: 43113)
- If not available, add it manually:
  - Network Name: Avalanche Fuji C-Chain
  - RPC URL: https://api.avax-test.network/ext/bc/C/rpc
  - Chain ID: 43113
  - Symbol: AVAX
  - Explorer: https://testnet.snowtrace.io/

### "Only the contract owner can set values"
- Only the wallet that deployed the contract can call `setValue()`
- Make sure you're connected with the owner wallet

### Transaction Pending Forever
- Check Snowtrace for transaction status
- Ensure you have enough AVAX for gas fees
- Try increasing gas limit in wallet

## 📝 Notes

- All transactions require AVAX for gas fees
- The `setValue()` function is restricted to the contract owner
- Transaction confirmations typically take 1-3 seconds on Fuji
- Always verify contract address before interacting

## 🎓 Learning Resources

This project demonstrates:
- Web3 wallet integration
- Smart contract interaction (read/write)
- Transaction lifecycle management
- Error handling in dApps
- Modern React patterns with hooks
- TypeScript best practices

---

Built with ❤️ for Pamulang University Short Course - Day 3
