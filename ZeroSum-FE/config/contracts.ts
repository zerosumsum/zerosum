/**
 * Contract addresses configuration
 * Self Protocol IdentityVerificationHub addresses:
 * - Mainnet: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
 * - Testnet (Celo Sepolia): 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
 */

export const CONTRACTS = {
  // Self IdentityVerificationHub contract address
  // Mainnet: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
  // Testnet: 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
  SELF_VERIFICATION_HUB: (process.env.NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS ||
    // Default to testnet address for Celo Sepolia
    "0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74") as `0x${string}`,

  // ZeroSum Game Contract
  GAME_CONTRACT: (process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS ||
    "0x0f764437ffBE1fcd0d0d276a164610422710B482") as `0x${string}`,

  // ZeroSum Spectator Contract
  SPECTATOR_CONTRACT: (process.env.NEXT_PUBLIC_SPECTATOR_CONTRACT_ADDRESS ||
    "0xE2228Cf8a49Cd23993442E5EE5a39d6180E0d25f") as `0x${string}`,
} as const;

// Export individual contracts for convenience
export const { SELF_VERIFICATION_HUB, GAME_CONTRACT, SPECTATOR_CONTRACT } = CONTRACTS;
