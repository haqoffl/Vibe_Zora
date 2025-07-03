"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Users, Zap, Sparkles } from "lucide-react"

export default function ConversationLoading() {
  const [dots, setDots] = useState("")
  const [onlineCount, setOnlineCount] = useState(2345)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    const countInterval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 1000)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(countInterval)
    }
  }, [])

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full morph float opacity-30"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full morph float-delayed opacity-40"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-50 rounded-full morph float opacity-20"></div>
      <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-100 rounded-full morph float opacity-25"></div>

      <Card className="glass border border-white/20 p-12 text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-6 pulse-blue morph">
            <Sparkles className="w-10 h-10 text-white animate-spin" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-mono glitch">picking_a_random_vibe{dots}</h2>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Users className="w-5 h-5 text-[#0057FF]" />
            <span className="text-lg font-mono text-gray-700 pulse-blue">{onlineCount}_people_online</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm font-mono text-gray-600">
            <Zap className="w-4 h-4 text-[#0057FF]" />
            <span>
              matching_your_vibe<span className="loading-dots"></span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm font-mono text-gray-600">
            <Zap className="w-4 h-4 text-[#0057FF]" />
            <span>
              preparing_conversation_room<span className="loading-dots"></span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm font-mono text-gray-600">
            <Zap className="w-4 h-4 text-[#0057FF]" />
            <span>
              initializing_crypto_rewards<span className="loading-dots"></span>
            </span>
          </div>
        </div>

        {/* Loading bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-[#0057FF] rounded-full animate-pulse"
              style={{
                width: "100%",
                animation: "loading 3s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
