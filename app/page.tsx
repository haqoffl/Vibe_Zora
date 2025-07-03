"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Users, DollarSign, Video, Sparkles, Zap, Play, Coins, Timer, Eye, TrendingUp, Clock, ChevronDown } from "lucide-react"
import Link from "next/link"

const topics = [
  "🎮 Gaming", "💻 Tech", "🎨 Art", "🎵 Music", "📚 Books", 
  "🏃 Fitness", "🍕 Food", "✈️ Travel", "💼 Business", "🧠 Philosophy"
]

const scrollingStats = [
  { label: "Creators Online", value: "1,247", icon: Video, color: "text-blue-600" },
  { label: "Viewers Active", value: "8,543", icon: Eye, color: "text-indigo-600" },
  { label: "Today's Mints", value: "89", icon: Coins, color: "text-green-600" },
  { label: "Total Volume", value: "$45.6K", icon: TrendingUp, color: "text-orange-600" },
  { label: "Active Conversations", value: "156", icon: Users, color: "text-purple-600" },
  { label: "Avg. Earnings", value: "$23.5", icon: DollarSign, color: "text-emerald-600" },
]

export default function VibeLandingPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("any")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 bg-indigo-300/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 md:w-28 md:h-28 bg-blue-100/40 rounded-full animate-pulse delay-700"></div>
      </div>


      {/* Header */}
    

      
      {/* Scrolling Stats Ticker */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 overflow-hidden relative z-20">
        <div className="flex animate-scroll">
          {[...scrollingStats, ...scrollingStats].map((stat, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 sm:px-6 py-2 whitespace-nowrap">
              <stat.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${stat.color}`} />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{stat.label}:</span>
              <span className={`text-xs sm:text-sm font-bold ${stat.color}`}>{stat.value}</span>
              <div className="w-px h-3 sm:h-4 bg-gray-300 ml-2 sm:ml-4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Above the Fold */}
<main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
  {/* Hero + Actions Section - Fits in viewport */}
  <main className="max-w-4xl mx-auto flex flex-col px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 relative z-10 items-center justify-center min-h-screen">
    {/* Hero Title Section */}
    <div className="text-center mb-8 sm:mb-12 md:mb-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 font-mono typing">
        connect_to_random
      </h2>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0057FF] mb-3 sm:mb-4 md:mb-6 font-mono glitch">
        viber
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-mono px-4 sm:px-0">
        earn_crypto_while_having_meaningful_conversations.
        <br className="hidden sm:block" />
        <span className="block sm:inline">connect_&_monetize_your_social_interactions.</span>
      </p>
    </div>

    {/* Topic Selection & Action Buttons */}
    <div className="text-center mb-8 sm:mb-12 md:mb-16 w-full">
      {/* Topic Selection Card */}
      <Card className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 md:p-5 border border-white/40 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-4">
        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
          Choose Topic
        </label>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="bg-white border-gray-200 text-sm h-10 sm:h-12">
            <SelectValue placeholder="Any topic" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="any">Any Topic</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full">
        <Link href="/conversation" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="btn-glow bg-[#0057FF] hover:bg-[#0041CC] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-bold rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 font-mono relative overflow-hidden group flex items-center justify-center w-full sm:w-auto min-h-[48px] sm:min-h-[56px] md:min-h-[64px]"
            disabled={!isConnected}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" />
            <span className="truncate">connect_now</span>
          </Button>
        </Link>

        <Link href="/vibes" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="btn-glow bg-[#000000] hover:bg-[#333333] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-bold rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 font-mono relative overflow-hidden group flex items-center justify-center w-full sm:w-auto min-h-[48px] sm:min-h-[56px] md:min-h-[64px]"
            disabled={!isConnected}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" />
            <span className="truncate">Watch Vibes</span>
          </Button>
        </Link>
      </div>
    </div>
  </main>

  {/* Below the Fold - How It Works */}
  <div className="py-6 sm:py-8 md:py-12 lg:py-16 border-t border-gray-200/50">
    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6 md:mb-8 px-4">
      How Vibe Works
    </h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
      {/* Step 1: Connect */}
      <Card className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 md:p-5 lg:p-6 border border-white/40 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
          <span className="text-blue-600 font-bold text-xs sm:text-sm md:text-lg">1</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
          Connect
        </h4>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Match with random people for 1-minute video conversations
        </p>
      </Card>

      {/* Step 2: Mint */}
      <Card className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 md:p-5 lg:p-6 border border-white/40 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
          <span className="text-green-600 font-bold text-xs sm:text-sm md:text-lg">2</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
          Mint
        </h4>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Turn memorable conversation moments into tradeable video coins
        </p>
      </Card>

      {/* Step 3: Trade */}
      <Card className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 md:p-5 lg:p-6 border border-white/40 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
          <span className="text-orange-600 font-bold text-xs sm:text-sm md:text-lg">3</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
          Trade
        </h4>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Buy, sell, and collect rare video moments in the marketplace
        </p>
      </Card>
    </div>
  </div>
</main>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}