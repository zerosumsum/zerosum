"use client";

import {
  celo,
  celoAlfajores,
} from "thirdweb/chains";
import { defineChain } from "thirdweb";

type ThirdwebChain = ReturnType<typeof defineChain>;

/**
 * Celo Sepolia Testnet Configuration
 * Chain ID: 11142220
 * Default network for ZeroSum Gaming
 */
export const celoSepolia = defineChain({
  id: 11142220,
  name: "Celo Sepolia Testnet",
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "CeloScan",
      url: "https://alfajores.celoscan.io",
    },
  ],
  testnet: true,
  rpc: "https://forno.celo-sepolia.celo-testnet.org",
});

const isMainnet = process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet";

// Mainnet chains
export const mainnetChains: ThirdwebChain[] = [celo];

// Testnet chains - Celo Sepolia as default
export const testnetChains: ThirdwebChain[] = [
  celoSepolia,
  celoAlfajores,
];

export const supportedChains = (isMainnet ? mainnetChains : testnetChains) as ThirdwebChain[];
export const defaultChain = supportedChains[0] ?? (isMainnet ? celo : celoSepolia);

const allChains = [...mainnetChains, ...testnetChains];

const chainMap = allChains.reduce<Record<number, ThirdwebChain>>((acc, chain) => {
  if (chain && chain.id) {
    acc[chain.id] = chain;
  }
  return acc;
}, {});

export function getChainById(chainId?: number): ThirdwebChain | undefined {
  if (!chainId) return undefined;
  return chainMap[chainId];
}

export function getChainName(chainId?: number): string {
  return getChainById(chainId)?.name ?? `Chain ${chainId ?? "Unknown"}`;
}

export const isMainnetEnvironment = isMainnet;




