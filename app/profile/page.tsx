"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  TrendingUp,
  MessageCircle,
  Star,
  Clock,
  Coins,
  Video,
  Settings,
  Download,
  Trophy,
  Target,
} from "lucide-react"
import Link from "next/link"

interface Conversation {
  id: string
  title: string
  duration: string
  earned: number
  rating: number
  date: string
  thumbnail: string
}

interface Investment {
  id: string
  conversation: string
  amount: number
  currentValue: number
  roi: number
  status: "active" | "completed"
}

export default function ProfilePage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)

  const userStats = {
    totalEarnings: 24.847,
    avgEarningsPerChat: 0.234,
    successRate: 87,
    reputation: "influencer",
    level: 3,
    nextLevelProgress: 65,
  }

  useEffect(() => {
    setTimeout(() => {
      setConversations([
        {
          id: "1",
          title: "tech_startup_discussion",
          duration: "12:34",
          earned: 0.456,
          rating: 4.8,
          date: "2024-01-15",
          thumbnail: "/placeholder.svg?height=100&width=150",
        },
        {
          id: "2",
          title: "creative_writing_session",
          duration: "08:45",
          earned: 0.234,
          rating: 4.2,
          date: "2024-01-14",
          thumbnail: "/placeholder.svg?height=100&width=150",
        },
        {
          id: "3",
          title: "philosophy_deep_dive",
          duration: "15:22",
          earned: 0.678,
          rating: 4.9,
          date: "2024-01-13",
          thumbnail: "/placeholder.svg?height=100&width=150",
        },
      ])

      setInvestments([
        {
          id: "1",
          conversation: "ai_ethics_debate",
          amount: 0.5,
          currentValue: 0.65,
          roi: 30,
          status: "active",
        },
        {
          id: "2",
          conversation: "music_theory_talk",
          amount: 0.3,
          currentValue: 0.42,
          roi: 40,
          status: "completed",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const StatCard = ({ icon: Icon, label, value, color = "text-gray-900", loading = false }: any) => (
    <Card className="glass border border-white/20 p-4 float">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`w-4 h-4 ${color} animate-pulse`} />
            <span className="text-sm text-gray-600 font-mono">{label}</span>
          </div>
          <div className={`text-2xl font-bold ${color} font-mono`}>{value}</div>
        </>
      )}
    </Card>
  )

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full morph float opacity-20"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full morph float-delayed opacity-30"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-50 rounded-full morph float opacity-15"></div>

      {/* Header */}
      <header className="glass border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#0057FF] rounded-xl flex items-center justify-center pulse-blue">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 font-mono glitch">profile</h1>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button className="btn-glow glass border-white/30 text-gray-700 font-mono">
              <Settings className="w-4 h-4 mr-2" />
              settings
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* User Card */}
        <Card className="glass border border-white/20 p-6 mb-6 float">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#0057FF] rounded-full flex items-center justify-center text-2xl text-white pulse-blue morph">
                🚀
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-mono glitch">crypto_viber</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-[#0057FF] text-white font-mono pulse-blue">
                    <Trophy className="w-3 h-3 mr-1" />
                    {userStats.reputation}
                  </Badge>
                  <Badge className="glass-dark border-[#0057FF] text-[#0057FF] font-mono">
                    level_{userStats.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="w-5 h-5 text-[#0057FF] animate-pulse" />
                <span className="text-2xl font-bold text-[#0057FF] font-mono">
                  {userStats.totalEarnings.toFixed(3)}_VIBE
                </span>
              </div>
              <Button className="btn-glow bg-[#0057FF] hover:bg-[#0041CC] text-white font-mono">
                <Download className="w-4 h-4 mr-2" />
                withdraw_earnings
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-mono">progress_to_level_{userStats.level + 1}</span>
              <span className="text-gray-900 font-bold font-mono">{userStats.nextLevelProgress}%</span>
            </div>
            <Progress value={userStats.nextLevelProgress} className="h-3 rounded-full">
              <div className="h-full bg-[#0057FF] rounded-full transition-all duration-500 pulse-blue"></div>
            </Progress>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            icon={Coins}
            label="avg_earnings/chat"
            value={`${userStats.avgEarningsPerChat.toFixed(3)}_VIBE`}
            color="text-[#0057FF]"
            loading={loading}
          />
          <StatCard
            icon={Target}
            label="success_rate"
            value={`${userStats.successRate}%`}
            color="text-[#0057FF]"
            loading={loading}
          />
          <StatCard icon={MessageCircle} label="total_conversations" value={conversations.length} loading={loading} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="conversations" className="w-full">
          <TabsList className="glass border border-white/20">
            <TabsTrigger
              value="conversations"
              className="data-[state=active]:bg-[#0057FF] data-[state=active]:text-white font-mono"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              conversations
            </TabsTrigger>
            <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-[#0057FF] data-[state=active]:text-white font-mono"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              investments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="mt-6">
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="glass border border-white/20 p-4 animate-pulse">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-12 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                    </Card>
                  ))
                : conversations.map((conv) => (
                    <Card
                      key={conv.id}
                      className="glass border border-white/20 p-4 transition-all duration-300 btn-glow float"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 font-mono">{conv.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 font-mono">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{conv.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-[#0057FF]" />
                                <span>{conv.rating}</span>
                              </div>
                              <span>{conv.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-[#0057FF] font-bold font-mono">
                            <Coins className="w-4 h-4 animate-spin" />
                            <span>+{conv.earned.toFixed(3)}_VIBE</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="glass border border-white/20 p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </Card>
                  ))
                : investments.map((investment) => (
                    <Card key={investment.id} className="glass border border-white/20 p-4 float">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 font-mono">{investment.conversation}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 font-mono">
                            <span>invested: {investment.amount}_VIBE</span>
                            <Badge
                              className={
                                investment.status === "active"
                                  ? "glass-dark text-[#0057FF] font-mono"
                                  : "glass text-gray-600 font-mono"
                              }
                            >
                              {investment.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 font-mono">
                            {investment.currentValue}_VIBE
                          </div>
                          <div className="text-sm text-[#0057FF] font-mono">+{investment.roi}%_ROI</div>
                        </div>
                      </div>
                    </Card>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
