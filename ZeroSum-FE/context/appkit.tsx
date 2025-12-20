// context/appkit.tsx
"use client";
import { ThirdwebProvider } from "thirdweb/react";
import { ReactNode } from "react";

interface AppKitProps {
  children: ReactNode;
}

export function AppKit({ children }: AppKitProps) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
