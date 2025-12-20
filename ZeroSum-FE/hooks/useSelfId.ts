"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useSelfVerification } from "./useSelfVerification";
import type { SelfIdProfile } from "@/types/self";

// Contract addresses from config
const SELF_VERIFICATION_HUB = process.env.NEXT_PUBLIC_SELF_VERIFICATION_HUB as `0x${string}` | undefined;

export function useSelfId() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<SelfIdProfile | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmittingOnchain, setIsSubmittingOnchain] = useState(false);

  // Hook for onchain verification
  const {
    submitToVerificationHub,
    recordInSavingsCircle,
    isPending: isVerificationPending,
    isConfirming: isVerificationConfirming,
    isSuccess: isVerificationSuccess,
    error: verificationError,
  } = useSelfVerification({
    verificationHubAddress: SELF_VERIFICATION_HUB,
    savingsCircleAddress: undefined, // Will be set when joining a specific circle
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const stored = localStorage.getItem(`self_profile_${address}`);
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to load stored profile:", e);
        }
      }
    }
  }, [address]);

  const linkSelfId = useCallback(async () => {
    if (isLinking || !address) return;
    setIsLinking(true);
    setShowVerification(true);
  }, [isLinking, address]);

  const handleVerificationSuccess = useCallback(
    async (result: any) => {
      if (!address) return;

      try {
        // For onchain verification, we store the proof data
        // The actual verification will happen when submitting to VerificationHub
        const verificationData = {
          attestationId: result.attestationId,
          proof: result.proof,
          publicSignals: result.publicSignals,
          userContextData: result.userContextData,
          // Note: credentialSubject may not be available until onchain verification
          credentialSubject: result.credentialSubject,
        };

        // Generate handle from address (will be updated after onchain verification)
        const handle = `self:${address.slice(0, 8)}...${address.slice(-6)}`;

        // Base reputation score (will be updated after onchain verification confirms)
        const reputationScore = 50; // Base score for verified identity

        const newProfile: SelfIdProfile = {
          handle,
          reputationScore,
          attestations: 1,
          verificationData,
        };

        setProfile(newProfile);
        setShowVerification(false);
        setIsLinking(false);

        // Store in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(`self_profile_${address}`, JSON.stringify(newProfile));
        }

        // Prompt user to submit proof onchain
        console.log("Verification proof ready for onchain submission:", {
          attestationId: result.attestationId,
          hasProof: !!result.proof,
          hasPublicSignals: !!result.publicSignals,
        });
        
        // Set flag to show onchain submission prompt
        setIsSubmittingOnchain(true);
      } catch (error) {
        console.error("Failed to process verification result:", error);
        setIsLinking(false);
        setShowVerification(false);
      }
    },
    [address]
  );

  const handleVerificationError = useCallback((error: Error) => {
    console.error("Verification error:", error);
    setIsLinking(false);
    setShowVerification(false);
  }, []);

  const unlinkSelfId = useCallback(() => {
    if (!address) return;
    setProfile(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(`self_profile_${address}`);
    }
  }, [address]);

  const status = useMemo(
    () => ({
      isLinked: Boolean(profile),
      handle: profile?.handle,
      reputationScore: profile?.reputationScore ?? 0,
      attestations: profile?.attestations ?? 0,
      verificationData: profile?.verificationData,
      isVerified: Boolean(profile?.verificationData),
    }),
    [profile]
  );

  // Submit proof to onchain VerificationHub
  const submitProofOnchain = useCallback(
    async (verificationData: SelfIdProfile["verificationData"]) => {
      if (!verificationData || !address) return;

      try {
        setIsSubmittingOnchain(true);

        // Submit to VerificationHub
        await submitToVerificationHub({
          proof: verificationData.proof,
          publicSignals: verificationData.publicSignals,
          userContextData: verificationData.userContextData,
        });

        // After successful verification, record in SavingsCircle if needed
        // This will be called when joining a specific circle
      } catch (error) {
        console.error("Failed to submit proof onchain:", error);
        throw error;
      } finally {
        setIsSubmittingOnchain(false);
      }
    },
    [address, submitToVerificationHub]
  );

  return {
    ...status,
    isLinking,
    showVerification,
    isSubmittingOnchain,
    isVerificationPending,
    isVerificationConfirming,
    isVerificationSuccess,
    verificationError,
    linkSelfId,
    unlinkSelfId,
    handleVerificationSuccess,
    handleVerificationError,
    setShowVerification,
    submitProofOnchain,
  };
}
