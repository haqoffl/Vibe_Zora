"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Star, TrendingUp, Zap, Video, Coins, Target, Sparkles } from "lucide-react"
import Link from "next/link"

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  earnings: number
  conversations: number
  rating: number
  badge?: string
  isCurrentUser?: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  reward: string
  progress: number
  maxProgress: number
  icon: string
}

export default function LeaderboardPage() {
  const [topVibers, setTopVibers] = useState<LeaderboardEntry[]>([])
  const [viralHall, setViralHall] = useState<LeaderboardEntry[]>([])
  const [recentWins, setRecentWins] = useState<any[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTopVibers([
        {
          rank: 1,
          name: "crypto_viber",
          avatar: "🚀",
          earnings: 24.847,
          conversations: 156,
          rating: 4.9,
          badge: "influencer",
          isCurrentUser: true,
        },
        {
          rank: 2,
          name: "tech_talker",
          avatar: "💻",
          earnings: 22.234,
          conversations: 143,
          rating: 4.8,
          badge: "expert",
        },
        {
          rank: 3,
          name: "philoso_friend",
          avatar: "🧠",
          earnings: 19.892,
          conversations: 128,
          rating: 4.7,
          badge: "sage",
        },
        {
          rank: 4,
          name: "music_maven",
          avatar: "🎵",
          earnings: 18.654,
          conversations: 134,
          rating: 4.6,
          badge: "virtuoso",
        },
        {
          rank: 5,
          name: "artistic_soul",
          avatar: "🎨",
          earnings: 17.432,
          conversations: 121,
          rating: 4.5,
          badge: "creator",
        },
      ])

      setViralHall([
        {
          rank: 1,
          name: "quantum_thinker",
          avatar: "⚛️",
          earnings: 45.67,
          conversations: 1,
          rating: 5.0,
          badge: "legendary",
        },
        {
          rank: 2,
          name: "cosmic_debater",
          avatar: "🌌",
          earnings: 38.92,
          conversations: 1,
          rating: 4.9,
          badge: "mythical",
        },
      ])

      setRecentWins([
        { name: "tech_guru", amount: 2.34, time: "2_min_ago", conversation: "ai_future_discussion" },
        { name: "creative_minds", amount: 1.89, time: "5_min_ago", conversation: "art_&_technology" },
        { name: "philosophy_king", amount: 3.12, time: "8_min_ago", conversation: "ethics_in_ai" },
      ])

      setChallenges([
        {
          id: "1",
          title: "marathon_talker",
          description: "have_a_conversation_lasting_1_hour",
          reward: "2x_rewards",
          progress: 45,
          maxProgress: 60,
          icon: "⏰",
        },
        {
          id: "2",
          title: "social_butterfly",
          description: "connect_with_10_different_people_today",
          reward: "5_VIBE_bonus",
          progress: 7,
          maxProgress: 10,
          icon: "🦋",
        },
        {
          id: "3",
          title: "quality_conversationalist",
          description: "maintain_4.5+_rating_for_5_conversations",
          reward: "special_badge",
          progress: 3,
          maxProgress: 5,
          icon: "⭐",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-[#0057FF] animate-pulse" />
      case 2:
        return <Trophy className="w-6 h-6 text-[#0057FF]" />
      case 3:
        return <Trophy className="w-6 h-6 text-[#0057FF]" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-700 font-mono">
            #{rank}
          </span>
        )
    }
  }

  const LeaderboardSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="glass border border-white/20 p-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </Card>
      ))}
    </div>
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
              <h1 className="text-2xl font-bold text-gray-900 font-mono glitch">leaderboard</h1>
            </div>
          </Link>

          <div className="flex items-center space-x-2 text-sm text-gray-500 font-mono">
            <Zap className="w-4 h-4 text-[#0057FF] animate-pulse" />
            <span>updates_every_5_minutes</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <Tabs defaultValue="top-vibers" className="w-full">
          <TabsList className="glass border border-white/20 mb-6">
            <TabsTrigger
              value="top-vibers"
              className="data-[state=active]:bg-[#0057FF] data-[state=active]:text-white font-mono"
            >
              <Trophy className="w-4 h-4 mr-2" />
              top_vibers
            </TabsTrigger>
            <TabsTrigger
              value="viral-hall"
              className="data-[state=active]:bg-[#0057FF] data-[state=active]:text-white font-mono"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              viral_hall_of_fame
            </TabsTrigger>
            <TabsTrigger
              value="recent-wins"
              className="data-[state=active]:bg-[#0057FF] data-[state=active]:text-white font-mono"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              recent_wins
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TabsContent value="top-vibers">
                {loading ? (
                  <LeaderboardSkeleton />
                ) : (
                  <div className="space-y-4">
                    {topVibers.map((entry) => (
                      <Card
                        key={entry.rank}
                        className={`glass border border-white/20 p-4 transition-all duration-300 btn-glow float ${
                          entry.isCurrentUser ? "ring-2 ring-[#0057FF] glass-dark" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12">{getRankIcon(entry.rank)}</div>
                            <div className="w-12 h-12 bg-[#0057FF] rounded-full flex items-center justify-center text-xl text-white pulse-blue morph">
                              {entry.avatar}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold text-lg text-gray-900 font-mono">{entry.name}</h3>
                                {entry.isCurrentUser && (
                                  <Badge className="bg-[#0057FF] text-white text-xs font-mono pulse-blue">you</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 font-mono">
                                <span>{entry.conversations}_conversations</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-[#0057FF]" />
                                  <span>{entry.rating}</span>
                                </div>
                                {entry.badge && (
                                  <Badge className="glass-dark text-[#0057FF] text-xs font-mono">{entry.badge}</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-[#0057FF] font-bold text-xl font-mono">
                              <Coins className="w-5 h-5 animate-spin" />
                              <span>{entry.earnings.toFixed(3)}_VIBE</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="viral-hall">
                <div className="space-y-4">
                  {viralHall.map((entry) => (
                    <Card
                      key={entry.rank}
                      className="glass border border-white/20 p-4 bg-gradient-to-r from-blue-50/50 to-blue-100/50 float"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            <Sparkles className="w-8 h-8 text-[#0057FF] animate-pulse" />
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-r from-[#0057FF] to-blue-600 rounded-full flex items-center justify-center text-xl text-white morph">
                            {entry.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 font-mono">{entry.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 font-mono">
                              <span>single_conversation_record</span>
                              <Badge className="bg-[#0057FF] text-white text-xs font-mono pulse-blue">
                                {entry.badge}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-[#0057FF] font-bold text-xl font-mono">
                            <Coins className="w-5 h-5 animate-spin" />
                            <span>{entry.earnings.toFixed(2)}_VIBE</span>
                          </div>
                          <div className="text-sm text-gray-600 font-mono">in_one_conversation!</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent-wins">
                <div className="space-y-4">
                  {recentWins.map((win, index) => (
                    <Card key={index} className="glass border border-white/20 p-4 float">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 font-mono">{win.name}</h3>
                          <p className="text-sm text-gray-500 font-mono">{win.conversation}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-[#0057FF] font-bold font-mono">
                            <Coins className="w-4 h-4 animate-spin" />
                            <span>+{win.amount}_VIBE</span>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">{win.time}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>

            {/* Challenges Sidebar */}
            <div className="space-y-6">
              <Card className="glass border border-white/20 p-4 float">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center font-mono">
                  <Target className="w-5 h-5 mr-2 text-[#0057FF] animate-pulse" />
                  active_challenges
                </h3>
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="glass-dark border border-white/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{challenge.icon}</span>
                        <h4 className="font-bold text-sm text-gray-900 font-mono">{challenge.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 font-mono">{challenge.description}</p>
                      <div className="flex justify-between items-center text-xs mb-1 font-mono">
                        <span className="text-gray-600">
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                        <Badge className="glass text-[#0057FF] text-xs font-mono">{challenge.reward}</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#0057FF] h-2 rounded-full transition-all duration-500 pulse-blue"
                          style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Success Stories */}
              <Card className="glass border border-white/20 p-4 bg-gradient-to-br from-blue-50/30 to-blue-100/30 float-delayed">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center font-mono">
                  <Star className="w-5 h-5 mr-2 text-[#0057FF] animate-pulse" />
                  success_story
                </h3>
                <div className="text-sm">
                  <p className="text-gray-700 mb-2 font-mono">
                    "i_earned_50_VIBE_in_my_first_week_just_by_having_genuine_conversations_about_my_passion_for_astronomy!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-[#0057FF] rounded-full flex items-center justify-center text-xs text-white pulse-blue">
                      🌟
                    </div>
                    <span className="text-[#0057FF] font-bold font-mono">star_gazer_42</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
