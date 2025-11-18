"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Swords,
  Star,
  Skull,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { toast } from "react-hot-toast"
import UnifiedGamingNavigation from "@/components/shared/GamingNavigation"
import { useMiniKit } from '@coinbase/onchainkit/minikit'

export default function HomePage() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const router = useRouter()

  // Wagmi hooks
  const { isConnected } = useAccount()

  // Call setFrameReady for Farcaster Mini App
  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  const gameModes = [
    {
      id: "quick-draw",
      title: "Quick Draw",
      description: "2-4 min math duels, small MNT pots",
      label: "common",
      labelColor: "text-emerald-400",
      borderColor: "border-emerald-500",
      glowColor: "shadow-emerald-500/50",
      icon: Zap,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/20",
    },
    {
      id: "strategic",
      title: "Strategic",
      description: "10-15 min",
      duration: "10-15 min",
      prizes: "100-500 MNT",
      difficulty: "Medium",
      borderColor: "border-blue-500",
      glowColor: "shadow-blue-500/50",
      buttonText: "Collect & Battle",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "hardcore",
      title: "Hardcore",
      description: "Elite battles, massive pots, pure skill",
      label: "legendary",
      labelColor: "text-fuchsia-400",
      borderColor: "border-fuchsia-500",
      glowColor: "shadow-fuchsia-500/50",
      icon: Skull,
      iconColor: "text-fuchsia-400",
      iconBg: "bg-fuchsia-500/20",
    },
    {
      id: "team-warfare",
      title: "Team Warfare",
      description: "3v3 squad battles, coordinate to dominate",
      label: "rare",
      labelColor: "text-blue-400",
      borderColor: "border-blue-500",
      glowColor: "shadow-blue-500/50",
      icon: Star,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
      comingSoon: true,
    },
  ]

  const handleCreateGame = (gameMode: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet to create battles!")
      return
    }
    router.push(`/create?mode=${gameMode}`)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Background Elements - Abstract blurred shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large purple plus sign shape */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        {/* Pink/purple blob */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/25 to-purple-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Blue blob */}
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {/* Large white sphere in bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"></div>
      </div>
                            
      {/* Unified Gaming Navigation */}
      <UnifiedGamingNavigation />
      
      {/* Decorative Dripping Element */}
      <div className="relative z-10 w-full h-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* Dripping liquid effect */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-b from-pink-500/40 to-transparent rounded-full blur-xl transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 w-40 h-40 bg-gradient-to-b from-purple-500/40 to-transparent rounded-full blur-xl transform -translate-y-1/2"></div>
            <div className="absolute top-0 right-1/4 w-36 h-36 bg-gradient-to-b from-pink-500/40 to-transparent rounded-full blur-xl transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>





      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          {/* Crossed Swords Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Swords className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
              <Swords className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-white">
            MATHEMATICAL WARFARE
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto font-medium">
            Outsmart randos, claim <span className="text-emerald-400 font-bold">MNT</span> glory.
          </p>

          {/* Game Modes Heading */}
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">GAME MODES</h2>
          <p className="text-lg md:text-xl text-emerald-400 font-medium mb-16">Choose your battlefield</p>
        </div>
      </section>

      {/* Game Modes Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {gameModes.map((mode, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden bg-slate-900/80 backdrop-blur-sm border-2 ${mode.borderColor} ${mode.glowColor} shadow-2xl transition-all duration-500 group ${mode.comingSoon ? 'cursor-not-allowed opacity-75' : 'hover:shadow-3xl transform hover:scale-105 cursor-pointer'}`}
              onClick={mode.comingSoon ? undefined : () => handleCreateGame(mode.id)}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mode.borderColor.replace('border-', 'from-').replace('-500', '-500/20')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <CardContent className="relative z-10 p-8">
                {/* Label Badge */}
                {mode.label && (
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className={`${mode.labelColor} bg-transparent border ${mode.borderColor} font-bold text-xs px-3 py-1`}>
                      {mode.label}
                    </Badge>
                  </div>
                )}

                {/* Coming Soon Badge */}
                {mode.comingSoon && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-yellow-500/90 text-yellow-900 font-bold text-xs px-3 py-1 rounded-full">
                      COMING SOON
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                {mode.icon && (
                  <div className="flex justify-center mb-6 mt-8">
                    <div className={`w-24 h-24 ${mode.iconBg} rounded-full flex items-center justify-center ${mode.glowColor.replace('shadow-', 'shadow-').replace('/50', '/30')} shadow-2xl`}>
                      <mode.icon className={`w-12 h-12 ${mode.iconColor}`} />
                    </div>
                  </div>
                )}

                {/* Title */}
                <CardTitle className={`text-3xl font-black mb-4 ${mode.duration ? 'text-left' : 'text-center'} ${mode.borderColor.replace('border-', 'text-').replace('-500', '-400')}`}>
                  {mode.title}
                </CardTitle>

                {/* Description */}
                {mode.description && !mode.duration && (
                  <p className="text-slate-300 font-medium mb-6 text-center text-sm">
                    {mode.description}
                  </p>
                )}

                {/* Strategic Mode Details */}
                {mode.duration && (
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-end items-center gap-4">
                      <span className="text-white font-bold">{mode.duration}</span>
                      <span className="text-slate-400 text-sm">Duration</span>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                      <span className="text-emerald-400 font-bold">{mode.prizes}</span>
                      <span className="text-slate-400 text-sm">Prizes</span>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                      <span className="text-white font-bold">{mode.difficulty}</span>
                      <span className="text-slate-400 text-sm">Difficulty</span>
                    </div>
                  </div>
                )}

                {/* Button */}
                {mode.buttonText ? (
                  <Button
                    onClick={mode.comingSoon ? undefined : () => handleCreateGame(mode.id)}
                    disabled={mode.comingSoon}
                    className={`w-full ${mode.buttonColor} text-white font-black py-4 rounded-xl transition-all transform group-hover:scale-105 shadow-lg`}
                  >
                    {mode.buttonText}
                  </Button>
                ) : (
                  !mode.comingSoon && (
                    <Button
                      onClick={() => handleCreateGame(mode.id)}
                      className={`w-full bg-gradient-to-r ${mode.borderColor.replace('border-', 'from-').replace('-500', '-500')} ${mode.borderColor.replace('border-', 'to-').replace('-500', '-600')} text-white font-black py-4 rounded-xl transition-all transform group-hover:scale-105 shadow-lg`}
                    >
                      {isConnected ? "ENTER BATTLE" : "CONNECT TO PLAY"}
                    </Button>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  )
}