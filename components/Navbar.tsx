"use client"
import { Video, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(false)
  
  return (
       
         <div className="bg-white/80  backdrop-blur-sm border-b border-gray-200 border-white/20 relative z-10 px-4 sm:px-6 py-2 sm:py-3">
           <div className="max-w-7xl mx-auto flex justify-between items-center">
                          <Link href="/" >

             <div className="flex items-center space-x-2 sm:space-x-3">
               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Video className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
               </div>
               <h1 className="text-base sm:text-xl font-bold text-gray-900 font-mono  tracking-tight">vibe</h1>
             </div>
             </Link>
   
             <div className="flex items-center space-x-2 sm:space-x-3">
               <div className="bg-gray-100 rounded-full px-2 sm:px-3 py-1 flex items-center space-x-1 sm:space-x-2">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse"></div>
                 <span className="text-xs font-medium text-gray-700">🪙 2,847</span>
               </div>
               <Button
                 onClick={() => setIsConnected(!isConnected)}
                 size="sm"
                 className={`text-xs px-2 sm:px-3 py-1 sm:py-2 ${
                   isConnected
                     ? "bg-blue-600 hover:bg-blue-700 text-white"
                     : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                 }`}
               >
                 <Wallet className="w-3 h-3 mr-1" />
                 <span className="hidden sm:inline">{isConnected ? "Connected" : "Connect"}</span>
                 <span className="sm:hidden">{isConnected ? "✓" : "Con"}</span>
               </Button>
             </div>
           </div>
         </div>
  )
}

export default Navbar
