"use client";

import { useCallback } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseAbi } from "viem";

// Self IdentityVerificationHub ABI
// Contract addresses:
// - Mainnet: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
// - Testnet: 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
// Note: You may need to check the exact ABI from the deployed contract
const VERIFICATION_HUB_ABI = parseAbi([
  "function verifySelfProof(bytes calldata proofPayload, bytes calldata userContextData) external",
  // Alternative interface - verify based on actual contract:
  // "function verify(bytes calldata proof, bytes calldata publicSignals, bytes calldata userContextData) external",
]);

// SavingsCircle ABI for recording verification
const SAVINGS_CIRCLE_ABI = parseAbi([
  "function recordSelfVerification(address account, bytes32 attestationId) external",
]);

interface UseSelfVerificationProps {
  verificationHubAddress?: `0x${string}`;
  savingsCircleAddress?: `0x${string}`;
}

/**
 * Hook for submitting Self verification proofs to onchain contracts
 */
export function useSelfVerification({
  verificationHubAddress,
  savingsCircleAddress,
}: UseSelfVerificationProps = {}) {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  /**
   * Submit verification proof to Self VerificationHub
   * @param proofData - The proof data from Self verification
   */
  const submitToVerificationHub = useCallback(
    async (proofData: {
      proof: any;
      publicSignals: any[];
      userContextData: string;
    }) => {
      if (!verificationHubAddress || !address) {
        throw new Error("VerificationHub address or wallet address not set");
      }

      // Encode proof payload according to Self's VerificationHub format
      // Note: The exact format depends on your deployed SelfVerificationRoot contract
      // You may need to adjust this based on your contract's interface
      
      // Convert proof to bytes - format depends on contract expectations
      // Option 1: If contract expects JSON string
      const proofPayload = JSON.stringify({
        proof: proofData.proof,
        publicSignals: proofData.publicSignals,
      });
      
      // Convert to hex string
      const proofBytes = `0x${Buffer.from(proofPayload).toString("hex")}` as `0x${string}`;
      
      // Ensure userContextData is hex format
      const userContextDataHex = proofData.userContextData.startsWith("0x")
        ? (proofData.userContextData as `0x${string}`)
        : (`0x${proofData.userContextData}` as `0x${string}`);

      try {
        await writeContract({
          address: verificationHubAddress,
          abi: VERIFICATION_HUB_ABI,
          functionName: "verifySelfProof",
          args: [proofBytes, userContextDataHex],
        });
      } catch (err) {
        console.error("Failed to submit to VerificationHub:", err);
        throw err;
      }
    },
    [verificationHubAddress, address, writeContract]
  );

  /**
   * Record verification in SavingsCircle contract
   * @param attestationId - The Self attestation ID
   */
  const recordInSavingsCircle = useCallback(
    async (attestationId: `0x${string}`) => {
      if (!savingsCircleAddress || !address) {
        throw new Error("SavingsCircle address or wallet address not set");
      }

      try {
        await writeContract({
          address: savingsCircleAddress,
          abi: SAVINGS_CIRCLE_ABI,
          functionName: "recordSelfVerification",
          args: [address, attestationId],
        });
      } catch (err) {
        console.error("Failed to record in SavingsCircle:", err);
        throw err;
      }
    },
    [savingsCircleAddress, address, writeContract]
  );

  return {
    submitToVerificationHub,
    recordInSavingsCircle,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
