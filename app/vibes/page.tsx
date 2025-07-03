"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Coins,
  Video,
  Sparkles,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

interface VideoCard {
  id: string
  title: string
  creator: string
  avatar: string
  price: number
  duration: string
  likes: number
  comments: number
  description: string
  tags: string[]
}

export default function Vibes() {
  const [videos, setVideos] = useState<VideoCard[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
        e.preventDefault()
        handleScroll("up")
      } else if (e.key === 'ArrowDown' && currentVideoIndex < videos.length - 1) {
        e.preventDefault()
        handleScroll("down")
      } else if (e.key === 'Tab') {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentVideoIndex, videos.length, isPlaying])

  useEffect(() => {
    setTimeout(() => {
      setVideos([
        {
          id: "1",
          title: "tech_startup_discussion",
          creator: "crypto_viber",
          avatar: "🚀",
          price: 0.25,
          duration: "0:45",
          likes: 1234,
          comments: 89,
          description: "deep_dive_into_web3_startups",
          tags: ["tech", "startup"],
        },
        {
          id: "2",
          title: "creative_writing_session",
          creator: "artistic_soul",
          avatar: "🎨",
          price: 0.18,
          duration: "0:52",
          likes: 892,
          comments: 45,
          description: "exploring_creative_techniques",
          tags: ["creative", "writing"],
        },
        {
          id: "3",
          title: "philosophy_deep_dive",
          creator: "philoso_friend",
          avatar: "🧠",
          price: 0.32,
          duration: "0:58",
          likes: 2156,
          comments: 234,
          description: "questioning_reality_consciousness",
          tags: ["philosophy", "deep"],
        },
        {
          id: "4",
          title: "music_production_talk",
          creator: "music_maven",
          avatar: "🎵",
          price: 0.21,
          duration: "0:41",
          likes: 1567,
          comments: 123,
          description: "electronic_music_production",
          tags: ["music", "production"],
        },
        {
          id: "5",
          title: "fitness_motivation",
          creator: "fit_guru",
          avatar: "💪",
          price: 0.15,
          duration: "0:37",
          likes: 3421,
          comments: 567,
          description: "daily_fitness_motivation",
          tags: ["fitness", "health"],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Handle scroll navigation with smooth transition
  const handleScroll = (direction: "up" | "down") => {
    if (isTransitioning) return
    
    if (direction === "up" && currentVideoIndex > 0) {
      setIsTransitioning(true)
      setCurrentVideoIndex(currentVideoIndex - 1)
      setTimeout(() => setIsTransitioning(false), 300)
    } else if (direction === "down" && currentVideoIndex < videos.length - 1) {
      setIsTransitioning(true)
      setCurrentVideoIndex(currentVideoIndex + 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Handle touch events for mobile scrolling with smooth feel
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsScrolling(true)
    setScrollOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScrolling) return
    const deltaY = startY - e.touches[0].clientY
    setScrollOffset(deltaY)
    setCurrentY(e.touches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!isScrolling) return
    
    const deltaY = startY - currentY
    const threshold = 80 // Increased threshold for better UX
    
    if (Math.abs(deltaY) > threshold && !isTransitioning) {
      if (deltaY > 0 && currentVideoIndex < videos.length - 1) {
        // Swipe up - next video
        setIsTransitioning(true)
        setCurrentVideoIndex(currentVideoIndex + 1)
        setTimeout(() => setIsTransitioning(false), 300)
      } else if (deltaY < 0 && currentVideoIndex > 0) {
        // Swipe down - previous video
        setIsTransitioning(true)
        setCurrentVideoIndex(currentVideoIndex - 1)
        setTimeout(() => setIsTransitioning(false), 300)
      }
    }
    
    // Reset states
    setIsScrolling(false)
    setStartY(0)
    setCurrentY(0)
    setScrollOffset(0)
  }

  // Handle wheel scroll for desktop with smooth feel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    
    if (isTransitioning) return
    
    const threshold = 100 // Require more scroll for better control
    
    if (Math.abs(e.deltaY) > threshold) {
      if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
        // Scroll down - next video
        setIsTransitioning(true)
        setCurrentVideoIndex(currentVideoIndex + 1)
        setTimeout(() => setIsTransitioning(false), 300)
      } else if (e.deltaY < 0 && currentVideoIndex > 0) {
        // Scroll up - previous video
        setIsTransitioning(true)
        setCurrentVideoIndex(currentVideoIndex - 1)
        setTimeout(() => setIsTransitioning(false), 300)
      }
    }
  }

  // Handle video click to pause/play
  const handleVideoClick = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLike = (videoId: string) => {
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, likes: video.likes + 1 } : video)))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-mono text-sm">
          loading_vibes<span className="loading-dots"></span>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Header - Compact for all devices */}
      {/* <header className="absolute top-0 left-0 right-0 z-50 glass-dark">
        <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0057FF] rounded-lg flex items-center justify-center">
                <Video className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <h1 className="text-white font-mono font-bold text-xs sm:text-sm">vibe</h1>
            </div>
          </Link>
          <div className="text-white font-mono text-xs sm:text-sm">marketplace</div>
        </div>
      </header> */}

      {/* Main Video Container */}
      <div 
        className="h-screen w-full items-center justify-center relative flex"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Video Background */}
        <div className="w-full h-full max-w-2xs sm:max-w-xs lg:max-w-sm xl:max-w-md mx-auto relative">
          {/* Vertical Video Container */}
          <div
            className="h-full w-full relative rounded-none sm:rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(45deg, #000428, #004e92, #000428)`,
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              aspectRatio: "9/16",
              transform: `translateY(${isScrolling ? Math.max(-50, Math.min(50, -scrollOffset * 0.3)) : 0}px)`,
            }}
            onClick={handleVideoClick}
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Video className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/60" />
                </div>
              </div>
            </div>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                </div>
              </div>
            )}

            {/* Bottom Content Overlay - Compact */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              {/* Creator Info - Single Line */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0057FF] rounded-full flex items-center justify-center text-xs sm:text-sm pulse-blue flex-shrink-0">
                    {currentVideo.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-mono font-bold text-xs sm:text-sm truncate">{currentVideo.creator}</p>
                  </div>
                </div>
              </div>

              {/* Title - Single Line */}
              <h2 className="text-white font-mono font-bold text-sm sm:text-base mb-1 truncate">
                {currentVideo.title}
              </h2>

              {/* Description - Single Line */}
              <p className="text-white/80 font-mono text-xs sm:text-sm mb-2 truncate">{currentVideo.description}</p>

              {/* Tags - Horizontal Scroll */}
              <div className="flex space-x-1 mb-2 overflow-x-auto scrollbar-hide">
                {currentVideo.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-white/20 text-white font-mono text-xs backdrop-blur-sm whitespace-nowrap flex-shrink-0"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Price and Join Button - Single Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-[#0057FF]" />
                  <span className="text-[#0057FF] font-mono font-bold text-sm sm:text-base">
                    {currentVideo.price}_VIBE
                  </span>
                </div>
                <Button className="bg-[#0057FF] hover:bg-[#0041CC] text-white font-mono font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Buy
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="absolute right-2 sm:right-4 lg:right-6 bottom-20 sm:bottom-24 flex flex-col space-y-3 sm:space-y-4">
            {/* More Options */}
            <div className="flex flex-col items-center">
              <Button
                size="sm"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
              >
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
            </div>

            {/* Like */}
            <div className="flex flex-col items-center">
              <Button
                size="sm"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(currentVideo.id)
                }}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
              <span className="text-white font-mono text-xs mt-1">
                {currentVideo.likes > 999 ? `${(currentVideo.likes / 1000).toFixed(1)}k` : currentVideo.likes}
              </span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center">
              <Button
                size="sm"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
              <span className="text-white font-mono text-xs mt-1">{currentVideo.comments}</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <Button
                size="sm"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
            </div>

            {/* Creator Avatar */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#0057FF] rounded-full flex items-center justify-center text-sm sm:text-base border-2 border-white pulse-blue">
              {currentVideo.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Hidden on Mobile */}
      <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 hidden sm:flex flex-col space-y-2">
        <Button
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 transition-all duration-200"
          onClick={() => handleScroll("up")}
          disabled={currentVideoIndex === 0 || isTransitioning}
        >
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </Button>
        <Button
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 transition-all duration-200"
          onClick={() => handleScroll("down")}
          disabled={currentVideoIndex === videos.length - 1 || isTransitioning}
        >
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </Button>
      </div>

      {/* Bottom Media Controls - Compact */}
      <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 z-50 flex space-x-2">
        <Button
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          )}
        </Button>
        <Button
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          )}
        </Button>
        <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1 backdrop-blur-sm">
          <span className="text-white font-mono text-xs">{currentVideo.duration}</span>
        </div>
      </div>

      {/* Progress Indicator - Left Side */}
      <div className="fixed left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-1">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`w-0.5 sm:w-1 h-4 sm:h-6 lg:h-8 rounded-full transition-all duration-300 ${
                index === currentVideoIndex ? "bg-[#0057FF]" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Counter - Top Right */}
      <div className="fixed top-12 sm:top-16 right-2 sm:right-4 z-50">
        <div className="bg-white/20 rounded-full px-2 py-1 backdrop-blur-sm">
          <span className="text-white font-mono text-xs">
            {currentVideoIndex + 1}/{videos.length}
          </span>
        </div>
      </div>
    </div>
  )
}