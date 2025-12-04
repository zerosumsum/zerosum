# Self.xyz Integration Setup Guide

This guide explains how to set up Self.xyz identity verification for the ZeroSum Gaming platform.

## Prerequisites

1. A Thirdweb client ID
2. Access to Self.xyz API (playground or production)
3. Wallet with Celo Sepolia testnet funds

## Environment Variables

Create a `.env.local` file in the `ZeroSum-FE` directory with the following:

```env
# Thirdweb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here

# Self Protocol Configuration
NEXT_PUBLIC_SELF_ENDPOINT=https://playground.self.xyz/api/verify
NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS=0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
NEXT_PUBLIC_SELF_APP_NAME=ZeroSum Gaming
NEXT_PUBLIC_SELF_SCOPE=zerosum-game
NEXT_PUBLIC_SELF_MIN_AGE=18
NEXT_PUBLIC_SELF_EXCLUDED_COUNTRIES=IRN,PRK,RUS,SYR
NEXT_PUBLIC_SELF_OFAC=true

# ZeroSum Contract Addresses (Celo Sepolia)
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x0f764437ffBE1fcd0d0d276a164610422710B482
NEXT_PUBLIC_SPECTATOR_CONTRACT_ADDRESS=0xE2228Cf8a49Cd23993442E5EE5a39d6180E0d25f
NEXT_PUBLIC_NETWORK_ID=11142220

# Environment
NEXT_PUBLIC_ENVIRONMENT=testnet
```

## How It Works

1. User connects wallet via Thirdweb
2. User clicks "Verify Identity" in wallet dropdown
3. QR code displays for Self app scanning
4. User scans with Self app and completes verification
5. Proof is stored locally and can be submitted onchain
6. Verified badge appears in wallet dropdown

## Testing

To test the integration:

1. Install and run the app: `npm run dev`
2. Connect your wallet
3. Click "Verify Identity" 
4. Scan QR code with Self app (use playground endpoint for testing)
5. Complete verification
6. Check for verified badge in wallet dropdown

## Network Configuration

The app defaults to Celo Sepolia testnet. Contracts are deployed at:

- Game Contract: `0x0f764437ffBE1fcd0d0d276a164610422710B482`
- Spectator Contract: `0xE2228Cf8a49Cd23993442E5EE5a39d6180E0d25f`

## Resources

- [Self.xyz Documentation](https://docs.self.xyz)
- [Thirdweb Documentation](https://portal.thirdweb.com)
- [Celo Documentation](https://docs.celo.org)

