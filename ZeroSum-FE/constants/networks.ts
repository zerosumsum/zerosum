// Network constants for ZeroSum Gaming

export const SUPPORTED_NETWORKS = {
  CELO_MAINNET: {
    id: 42220,
    name: "Celo Mainnet",
    rpcUrl: "https://forno.celo.org",
    explorer: "https://celoscan.io",
  },
  CELO_SEPOLIA: {
    id: 11142220,
    name: "Celo Sepolia Testnet",
    rpcUrl: "https://forno.celo-sepolia.celo-testnet.org",
    explorer: "https://alfajores.celoscan.io",
  },
} as const;

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS.CELO_SEPOLIA;

