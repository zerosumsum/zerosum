"use client"

import { useActiveAccount, useConnectModal } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdwebClient"
import { supportedChains } from "@/lib/thirdwebChains"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { toast } from "react-hot-toast"

interface WalletConnectButtonProps {
  className?: string
}

export default function WalletConnectButton({ 
  className = ""
}: WalletConnectButtonProps) {
  const account = useActiveAccount()
  const { connect, isConnecting } = useConnectModal()

  const address = account?.address
  const isConnected = Boolean(address)

  const handleConnect = async () => {
    try {
      await connect({
        client: thirdwebClient,
        chains: supportedChains,
        size: "compact",
        titleIcon: "https://zerosum-arena.vercel.app/og.png",
        welcomeScreen: {
          title: "Welcome to ZeroSum Gaming Arena",
          subtitle: "Connect your wallet to get started",
          img: {
            src: "https://zerosum-arena.vercel.app/og.png",
            width: 96,
            height: 96,
          },
        },
      })
      toast.success("Wallet connected successfully!")
    } catch (error: any) {
      console.error("Connection error:", error)
      toast.error("Failed to connect wallet")
    }
  }

  // Only show connect button when not connected
  if (isConnected) return null

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl px-6 py-3 h-12 ${className}`}
    >
      <Wallet className="w-5 h-5 mr-2" />
      {isConnecting ? "CONNECTING..." : "CONNECT"}
    </Button>
  )
}
