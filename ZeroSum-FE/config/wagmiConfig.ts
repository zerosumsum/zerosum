// config/wagmiConfigSimple.ts - Simplified wagmi configuration without Farcaster connector
import { createConfig, http } from "wagmi";
import { base, baseSepolia, celo, celoAlfajores } from "wagmi/chains";
import {
  injected,
  walletConnect,
  metaMask,
  coinbaseWallet,
} from "wagmi/connectors";

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '1922d8f34388fb1c3b3553c342d31094';

// Create WalletConnect connector only once
let walletConnectConnector: any = null;

const getWalletConnectConnector = () => {
  if (!walletConnectConnector) {
    walletConnectConnector = walletConnect({
      projectId,
      metadata: {
        name: "ZeroSum Gaming Arena",
        description: "Mathematical warfare where strategy beats luck. Privacy-fixed games with hidden numbers and true fairness.",
        url: "https://zerosum.arena",
        icons: ["https://zerosum.arena/logo.png"],
      },
    });
  }
  return walletConnectConnector;
};

const celoMainnetRpc = process.env.NEXT_PUBLIC_CELO_MAINNET_RPC || 'https://forno.celo.org';
const celoTestnetRpc = process.env.NEXT_PUBLIC_CELO_SEPOLIA_RPC || 'https://forno.celo-sepolia.celo-testnet.org/';

export const wagmiConfig = createConfig({
  chains: [celoAlfajores, celo, base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http('https://base-sepolia.drpc.org'),
    [celo.id]: http(celoMainnetRpc),
    [celoAlfajores.id]: http(celoTestnetRpc),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
    metaMask(),
    coinbaseWallet({
      appName: "ZeroSum Gaming Arena",
    }),
    getWalletConnectConnector(),
  ],
  ssr: false, // Disable SSR to avoid indexedDB issues
  multiInjectedProviderDiscovery: true,
});

// Export the config for use in components
export const config = wagmiConfig;
