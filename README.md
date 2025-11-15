# ZeroSum Gaming Platform

ZeroSum is a competitive gaming platform built on blockchain. Players compete in strategic number games. Spectator betting is coming soon. All games run transparently on smart contracts.

## The Problem

Traditional online games lack transparency. Players cannot verify game fairness. Prize distribution relies on centralized systems. Spectators have no way to participate beyond watching.

## The Solution

ZeroSum solves these problems through blockchain technology. Every game runs on smart contracts that anyone verify. Prize distribution happens automatically and fairly. Spectator betting functionality is coming soon.

## How It Works

Players create games by paying an entry fee. Another player joins with matching entry fee. Both players compete by subtracting numbers strategically. The player who forces their opponent to reach zero wins the prize pool.

Spectator betting is coming soon. Users will watch games and bet on which player wins. When their chosen player wins, they will receive proportional rewards from the betting pool.

## Key Features

### Fair Gameplay

All games run on blockchain smart contracts. Game rules execute automatically. No one controls or manipulates outcomes. Players verify every move on the blockchain.

### Transparent Rewards

Prize pools distribute automatically to winners. Platform fees are visible and fixed. Staking bonuses reward committed players. All transactions appear on blockchain explorers.

### Spectator Participation (Coming Soon)

Spectator betting functionality is currently under development. Soon you will watch any active game in real time, bet on your favorite player, and earn rewards when your prediction wins. Minimum bet amounts will make participation accessible.

### Multiple Game Modes

Quick Draw mode requires simple strategy. Strategic mode allows complex calculations. Both modes offer competitive gameplay. Choose the mode that matches your style.

### Staking Rewards

Lock tokens to earn bonus rewards. Higher stakes increase winning bonuses. Staking rewards accumulate over time. Withdraw staked tokens anytime.

## Getting Started

### For Players

1. Connect your wallet to the platform
2. Choose a game mode and entry fee
3. Create a game or join an existing one
4. Play strategically to win the prize pool
5. Withdraw your winnings to your wallet

### For Spectators (Coming Soon)

Spectator betting is currently under development. When available, you will:

1. Browse active games on the platform
2. Select a game and choose your predicted winner
3. Place your bet with any amount above minimum
4. Watch the game unfold in real time
5. Claim your rewards if your player wins

## Supported Networks

ZeroSum operates on multiple blockchain networks. Switch between networks using the network selector. Each network has separate game pools. Betting markets are coming soon.

**Base Sepolia Testnet**
- Test the platform with test tokens
- Explore all features without risk
- Chain ID: 84532

**Celo Sepolia Testnet**
- Low transaction costs
- Fast confirmation times
- Chain ID: 11142220

**Celo Mainnet**
- Production environment
- Real value transactions
- Chain ID: 42220

## Contract Addresses

### Base Sepolia Testnet
- Game Contract: `0x78A54d9Fcf0F0aB91fbeBdf722EFcC1039c98514`
- Spectator Contract: `0x6AE46C7Ec04d72E7e14268e59Cdfb639f5b68519`

### Celo Sepolia Testnet
- Game Contract: `0x0f764437ffBE1fcd0d0d276a164610422710B482`
- Spectator Contract: `0xE2228Cf8a49Cd23993442E5EE5a39d6180E0d25f`

### Celo Mainnet
- Game Contract: `0x3688Ce0123de9583cB39aA90907049Ef4077D810`
- Spectator Contract: `0xe4608436ec4eE31dc63D71af6c06D45E5a15a512`

## Game Rules

### Quick Draw Mode

Players take turns subtracting exactly 1 from the current number. The player who forces their opponent to reach zero wins. Simple rules make this mode fast and accessible.

### Strategic Mode

Players subtract between 10 and 30 percent of the current number each turn. Strategic calculations determine the winner. This mode rewards careful planning and mathematical thinking.

### Time Limits

Each turn has a time limit of 300 seconds. Players who exceed the limit face timeout penalties. After two timeouts, the player automatically loses. This keeps games moving at a reasonable pace.

## Staking System

Lock tokens in the staking system to earn bonus rewards on game winnings. Staking amounts determine bonus percentages.

- Stake 0.1 ETH or equivalent: 10% bonus on winnings
- Stake 1 ETH or equivalent: 25% bonus on winnings
- Stake 5 ETH or equivalent: 50% bonus on winnings

Staked tokens also earn passive rewards over time. Unstake your tokens whenever you want to withdraw them.

## Betting System (Coming Soon)

Spectator betting is currently under development. When available, spectators will bet on games by selecting a predicted winner and placing a bet amount. Minimum bet will be 0.01 ETH or equivalent. Each user will bet once per game.

When games finish, winning bettors will receive proportional shares of the betting pool. Larger bets will receive larger shares. The platform will take a 3% fee from the total betting pool.

## Platform Fees

Game entry fees include a 5% platform fee. This fee supports platform maintenance and development. Remaining funds form the prize pool distributed to winners.

Betting pools will include a 3% platform fee when spectator betting launches. This fee will support betting infrastructure and payouts. Remaining funds will distribute to winning bettors.

## Security

All smart contracts use industry standard security practices. Reentrancy protection prevents attack vectors. Owner controls limit administrative access. Timeout systems prevent game stalling. Move validation ensures fair gameplay.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- A cryptocurrency wallet (MetaMask, Coinbase Wallet, or WalletConnect compatible)
- Test tokens for your chosen network

### Frontend Setup

1. Navigate to the `ZeroSum-FE` directory
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Configure contract addresses for your network
5. Start the development server: `npm run dev`
6. Open `http://localhost:3000` in your browser

### Contract Setup

1. Navigate to the `zerosum-contreact` directory
2. Install Foundry if not already installed
3. Install dependencies: `forge install`
4. Configure environment variables
5. Compile contracts: `forge build`
6. Run tests: `forge test`
7. Deploy using scripts in the `script` directory

## Troubleshooting

**Wallet Connection Issues**
- Ensure your wallet extension is installed and unlocked
- Check that you have granted site permissions
- Try disconnecting and reconnecting your wallet

**Transaction Failures**
- Verify you have sufficient balance for fees
- Check that you are on the correct network
- Ensure you approved the transaction in your wallet

**Network Switching**
- Use the network switcher in the interface
- Confirm the switch in your wallet
- Wait for the network change to complete

**Game Not Starting**
- Verify both players have joined
- Check that entry fees match
- Ensure the game status shows as active

## Support

For issues or questions, check transaction logs on blockchain explorers. Verify contract addresses match your network. Confirm wallet connection status. Review game state through contract view functions.

## License

This project uses standard open source licensing. Smart contracts are deployed and verified on blockchain explorers. Frontend code follows standard web development practices.
