"use client";

import {
  base,
  baseSepolia,
  celo,
  celoAlfajores,
} from "thirdweb/chains";
import { defineChain } from "thirdweb";

type ThirdwebChain = ReturnType<typeof defineChain>;

const isMainnet = process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet";

// Mainnet chains
export const mainnetChains: ThirdwebChain[] = [celo, base];

// Testnet chains
export const testnetChains: ThirdwebChain[] = [
  celoAlfajores,
  baseSepolia,
];

export const supportedChains = (isMainnet ? mainnetChains : testnetChains) as ThirdwebChain[];
export const defaultChain = supportedChains[0] ?? (isMainnet ? celo : celoAlfajores);

const allChains = [...mainnetChains, ...testnetChains];

const chainMap = allChains.reduce<Record<number, ThirdwebChain>>((acc, chain) => {
  acc[chain.id] = chain;
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

