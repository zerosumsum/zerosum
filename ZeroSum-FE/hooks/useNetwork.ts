// hooks/useNetwork.ts
import { useState, useEffect, useCallback } from 'react';
import { useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from 'thirdweb/react';
import {
  type NetworkType,
  getNetworkConfig,
  getNetworkFromChainId,
  getContractAddresses,
} from '@/config/contracts';
import { getChainById, supportedChains } from '@/lib/thirdwebChains';

const DEFAULT_NETWORK = (process.env.NEXT_PUBLIC_DEFAULT_NETWORK as NetworkType) || 'base';

export function useNetwork() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();

  const address = account?.address;
  const isConnected = Boolean(address);
  const chainId = activeChain?.id;

  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>(DEFAULT_NETWORK);

  // Detect network from chain ID
  useEffect(() => {
    if (chainId) {
      const detectedNetwork = getNetworkFromChainId(chainId);
      if (detectedNetwork) {
        setCurrentNetwork(detectedNetwork);
      } else {
        setCurrentNetwork(DEFAULT_NETWORK);
      }
    }
  }, [chainId]);

  // Get current network config
  const networkConfig = getNetworkConfig(currentNetwork);

  // Get contract addresses for current network
  const contractAddresses = getContractAddresses(currentNetwork);

  // Switch network
  const switchToNetwork = useCallback(
    async (network: NetworkType) => {
      const targetConfig = getNetworkConfig(network);
      const targetChain = getChainById(targetConfig.chainId);

      if (switchChain && targetChain) {
        try {
          await switchChain(targetChain);
          setCurrentNetwork(network);
          return true;
        } catch (error) {
          console.error('Failed to switch network:', error);
          return false;
        }
      }
      return false;
    },
    [switchChain]
  );

  // Check if on correct network
  const isCorrectNetwork = chainId === networkConfig.chainId;

  // Check if network is supported
  const isSupportedNetwork = getNetworkFromChainId(chainId || 0) !== null;

  return {
    currentNetwork,
    networkConfig,
    contractAddresses,
    chainId,
    isConnected,
    address,
    switchToNetwork,
    isCorrectNetwork,
    isSupportedNetwork,
  };
}

// Hook to get contract address for current network
export function useContractAddress(
  contractName: 'ZERO_SUM_SIMPLIFIED' | 'ZERO_SUM_SPECTATOR'
) {
  const { contractAddresses } = useNetwork();
  return contractAddresses[contractName];
}

// Hook to check if user needs to switch network
export function useNetworkCheck(requiredNetwork?: NetworkType) {
  const { currentNetwork, switchToNetwork, isCorrectNetwork } = useNetwork();

  const needsSwitch =
    requiredNetwork && currentNetwork !== requiredNetwork;

  const promptSwitch = useCallback(async () => {
    if (requiredNetwork && needsSwitch) {
      return await switchToNetwork(requiredNetwork);
    }
    return true;
  }, [requiredNetwork, needsSwitch, switchToNetwork]);

  return {
    needsSwitch,
    promptSwitch,
    currentNetwork,
    isCorrectNetwork,
  };
}
