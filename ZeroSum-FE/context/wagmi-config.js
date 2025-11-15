import { createConfig, http } from 'wagmi';
import { baseSepolia, celo, celoAlfajores } from 'wagmi/chains';

// Base Sepolia Contract Addresses
export const BASE_CONTRACT_ADDRESSES = {
  ZERO_SUM_SIMPLIFIED: '0x78A54d9Fcf0F0aB91fbeBdf722EFcC1039c98514',
  ZERO_SUM_SPECTATOR: '0x6AE46C7Ec04d72E7e14268e59Cdfb639f5b68519',
};

// Celo Sepolia (Alfajores) Contract Addresses
export const CELO_CONTRACT_ADDRESSES = {
  ZERO_SUM_SIMPLIFIED: '0x0f764437ffBE1fcd0d0d276a164610422710B482',
  ZERO_SUM_SPECTATOR: '0xE2228Cf8a49Cd23993442E5EE5a39d6180E0d25f',
};

// Celo Mainnet Contract Addresses
export const CELO_MAINNET_CONTRACT_ADDRESSES = {
  ZERO_SUM_SIMPLIFIED: process.env.NEXT_PUBLIC_CELO_MAINNET_GAME_CONTRACT || '0x3688Ce0123de9583cB39aA90907049Ef4077D810',
  ZERO_SUM_SPECTATOR: process.env.NEXT_PUBLIC_CELO_MAINNET_SPECTATOR_CONTRACT || '0xe4608436ec4eE31dc63D71af6c06D45E5a15a512',
};

// Get contract addresses based on chain ID
export const getContractAddressesByChainId = (chainId) => {
  switch (chainId) {
    case 84532: // Base Sepolia
      return BASE_CONTRACT_ADDRESSES;
    case 11142220: // Celo Alfajores
      return CELO_CONTRACT_ADDRESSES;
    case 42220: // Celo Mainnet
      return CELO_MAINNET_CONTRACT_ADDRESSES;
    default:
      // Fallback to Base
      return BASE_CONTRACT_ADDRESSES;
  }
};

// Environment-based contract selection (for backwards compatibility)
export const getContractAddresses = () => {
  const defaultNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'base';

  if (defaultNetwork === 'celo') {
    return CELO_CONTRACT_ADDRESSES;
  } else if (defaultNetwork === 'celoMainnet') {
    return CELO_MAINNET_CONTRACT_ADDRESSES;
  } else {
    return BASE_CONTRACT_ADDRESSES;
  }
};

export const WAGMI_CHAINS = {
  baseSepolia,
  celo,
  celoAlfajores,
};

export const wagmiConfig = createConfig({
  chains: [baseSepolia, celo, celoAlfajores],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC || 'https://sepolia.base.org'),
    [celo.id]: http(process.env.NEXT_PUBLIC_CELO_MAINNET_RPC || 'https://forno.celo.org'),
    [celoAlfajores.id]: http(process.env.NEXT_PUBLIC_CELO_SEPOLIA_RPC || 'https://forno.celo-sepolia.celo-testnet.org/'),
  },
});