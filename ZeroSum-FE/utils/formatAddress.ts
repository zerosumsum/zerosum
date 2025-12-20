/**
 * Format Ethereum address for display
 * @param address - The full Ethereum address
 * @param chars - Number of characters to show at start and end
 * @returns Formatted address string
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Check if address is valid Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

