"use client"

import { useState } from "react"
import { useActiveAccount, useActiveWallet, useConnectModal, useDisconnect } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdwebClient"
import { supportedChains } from "@/lib/thirdwebChains"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, ChevronDown } from "lucide-react"
import { toast } from "react-hot-toast"

interface WalletConnectButtonProps {
  className?: string
  showBalance?: boolean
}

export default function WalletConnectButton({ 
  className = "", 
  showBalance = false 
}: WalletConnectButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const account = useActiveAccount()
  const wallet = useActiveWallet()
  const { connect, isConnecting } = useConnectModal()
  const { disconnect } = useDisconnect()

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

  const handleDisconnect = () => {
    try {
      if (wallet) {
        disconnect(wallet)
        toast.success("Wallet disconnected")
        setIsDropdownOpen(false)
      }
    } catch (error: any) {
      console.error("Disconnect error:", error)
      toast.error("Failed to disconnect wallet")
    }
  }

  const truncateAddress = (addr: string) => 
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  if (!isConnected) {
    return (
      <div className={`relative ${className}`}>
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {truncateAddress(address!)}
        <ChevronDown className="w-4 h-4 ml-2" />
      </Button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="mb-3">
              <div className="text-sm font-medium text-white">
                {wallet?.getChain()?.name || "Connected Wallet"}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {address}
              </div>
            </div>
            
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center p-2 text-left hover:bg-gray-800 rounded-md transition-colors text-red-400"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
