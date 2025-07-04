"use client"

import { useState, useEffect,useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, SkipForward, Flag, Zap, Sparkles, Clock, Coins, Eye, Users } from "lucide-react"
import Link from "next/link"
import {initiateChannel,joinChannelAsAudience, joinChannelAsInfluencer} from "@/library/webrtc"
import Peer from "peerjs"
import {io} from "socket.io-client"
const socket = io("http://localhost:8000")
export default function ConversationRoom() {
  const [earnings, setEarnings] = useState(0.048)
  const [timer, setTimer] = useState(60) // Start at 60 seconds
  const [viewers, setViewers] = useState(132)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [showLoading, setShowLoading] = useState(true)
  const [currentTopic] = useState("Technology & Innovation") // Topic they joined with
  const initiatorPeerRef = useRef<Peer.Instance | null>(null);
  const audiencePeerRef = useRef<Peer.Instance | null>(null);
  let initiatorSignalData = useRef<string>("")
  let audienceSignalData = useRef<string>("")
  let [audiencePeer, setAudiencePeer] = useState<Peer.Instance | null>(null);
  useEffect(() => {
  // Connect and emit match request
  socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);
      setShowLoading(false);

    socket.emit("connectWithRandom");
  });




  return () => {
    // Cleanup socket connection on unmount
    socket.off("connect");
    socket.off("matched");
    socket.off("noMatch");
    socket.off("receiveIntiatorMessageSignal");
    socket.off("receiveReceiverMessageSignal");
  }
  
}, []);


  // These listeners should NOT be inside 'connect'
  socket.off("matched").on("matched", async(data) => {
    console.log("Matched with random user", data);
    if(socket.id != data.id) {
    if(initiatorPeerRef.current == null) {
    let res =  await joinAsInitiator()
    initiatorPeerRef.current = res.peer
    socket.emit("passIntiatorMessageSignal", {room:data.room,message:res.signalData});
    }
  }

  });

  socket.off("receiveIntiatorMessageSignal").on("receiveIntiatorMessageSignal", async(data) => {
    if(socket.id != data.id) {

    console.log("Received initiator signal data", data);
    if(initiatorSignalData.current == "") {
      initiatorSignalData.current = data.message;
      let res =  await joinAsAudience(data.message)
      socket.emit("passReceiverMessageSignal", {room:data.room,message:res.signalData});

    }
    }
  });

  socket.off("receiveReceiverMessageSignal").on("receiveReceiverMessageSignal", (data) => {
    if(socket.id != data.id) {
      console.log("Received receiver signal data", data);
      if(audienceSignalData.current == ""){
              audienceSignalData.current = data.message;

          connectBoth(data.message,initiatorPeerRef.current as Peer.Instance);

      }

    }
  });

  socket.off("noMatch").on("noMatch", () => {
    console.log("No match found, waiting...");
  });


    async function joinAsInitiator() {
    console.log("function called")
    let peer = await initiateChannel()
    console.log("Influencer channel initiated", peer)
    console.log("storing peer: ", peer.peer)
    initiatorSignalData.current = peer.signalData
    return peer

  }


  async function joinAsAudience(message: string) {
    let rs = await joinChannelAsAudience(message)
    console.log("Audience channel initiated", rs.peer)
    console.log("Audience signal data", rs.signalData)
    audiencePeerRef.current = rs.peer
    audienceSignalData.current = rs.signalData
    setAudiencePeer(rs.peer)

    return rs

  }

  function connectBoth(message: string,peer:Peer.Instance) {
    let parsedSignal = JSON.parse(message)
    console.log("initiator peer", peer)
    joinChannelAsInfluencer(message,peer)

  }

  audiencePeer?.on('data', (data) => {
   console.log("Data received from audience:", data.toString())
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (showLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-ping"></div>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-2xl p-8 sm:p-12 text-center max-w-sm sm:max-w-md mx-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#0057FF] to-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-mono">
            Connecting to Viber<span className="animate-pulse">...</span>
          </h2>
          <p className="text-sm font-mono text-gray-600 mb-4">Establishing secure connection</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-[#0057FF] to-[#4F46E5] h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
  <div className="flex justify-center md:justify-end p-2 ">
  <Badge className="bg-[#055FFF] text-white  text-xs font-mono">
    {currentTopic}
     
              <span className="ml-2 flex justify-center items-center text-sm sm:text-sm font-bold font-mono text-white bg-transparent px-3 py-1 rounded-lg border border-white/40 shadow-sm">
               <Clock className="w-5 h-5 text-white" />  {formatTime(timer)}
              </span>
  </Badge>
 
</div>

      <div className="max-w-7xl space-y-6 mx-auto px-4 ">

        {/* Topic Badge - Simple & Small */}

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Your Video */}
          <Card className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden aspect-video relative group shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/80 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Video className="w-8 h-8 sm:w-10 sm:h-10 text-[#0057FF]" />
                </div>
                <p className="text-lg font-bold text-gray-800 font-mono">You</p>
              </div>
              <Badge className="absolute top-4 left-4 bg-[#0057FF] text-white font-mono shadow-md">
                You
              </Badge>
              {!isVideoOn && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full font-mono text-sm">
                    Camera Off
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Stranger Video */}
          <Card className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden aspect-video relative group shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/80 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-800 font-mono">Stranger</p>
              </div>
              <Badge className="absolute top-4 left-4 bg-gray-600 text-white font-mono shadow-md">
                Stranger
              </Badge>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {/* Media Controls */}
          <div className="flex gap-2">
            <Button
              size="lg"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`font-mono transition-all duration-200 ${
                isVideoOn 
                  ? "bg-white/70 hover:bg-white/90 text-gray-700 border border-white/40" 
                  : "bg-red-500 hover:bg-red-600 text-white border border-red-600"
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
              size="lg"
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`font-mono transition-all duration-200 ${
                isAudioOn 
                  ? "bg-white/70 hover:bg-white/90 text-gray-700 border border-white/40" 
                  : "bg-red-500 hover:bg-red-600 text-white border border-red-600"
              }`}
            >
              {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
          </div>

          {/* Action Controls */}
          <div className="flex gap-2">
            <Button 
              size="lg" 
              className="bg-white/70 hover:bg-white/90 text-gray-700 border border-white/40 font-mono transition-all duration-200 hover:shadow-md"
            >
              <SkipForward className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Skip</span>
            </Button>

            <Button 
              size="lg" 
              className="bg-white/70 hover:bg-white/90 text-gray-700 border border-white/40 font-mono transition-all duration-200 hover:shadow-md"
            >
              <Flag className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Report</span>
            </Button>
          </div>

          {/* End & Mint */}
          <Link href="/profile">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0057FF] to-[#4F46E5] hover:from-[#0041CC] hover:to-[#3730A3] text-white px-6 sm:px-8 font-mono transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>End & Mint</span>
              <Sparkles className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}