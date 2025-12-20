export interface SelfIdProfile {
  handle: string;
  reputationScore: number;
  attestations: number;
  verificationData?: {
    attestationId: number;
    proof: any;
    publicSignals: any[];
    userContextData: string;
    credentialSubject?: any;
  };
}

export interface SelfVerificationState {
  isVerifying: boolean;
  isVerified: boolean;
  profile: SelfIdProfile | null;
  error: string | null;
}
