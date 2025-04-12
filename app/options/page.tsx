"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import {
  Package,
  Search,
  ArrowLeft,
  ArrowRight,
  Clock,
  Shield,
  Truck,
  Globe,
  CheckCircle,
  MessageSquare,
  X,
} from "lucide-react"
import Logo from "../../components/Logo"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/router"

import SchedulePickupComponent from '../payment/page'; // Import your component

function YourComponent() {
  const [showSchedulePickup, setShowSchedulePickup] = useState(false);
  
  const handleSchedulePickup = () => {
    setShowSchedulePickup(true);
  };
}
export default function OptionsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock support and pickup scheduling",
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "End-to-end package protection and insurance",
    },
    {
      icon: Truck,
      title: "Express Delivery",
      description: "Priority shipping with guaranteed delivery times",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Shipping to over 190 countries worldwide",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-100/30 via-violet-100/20 to-transparent"
        />

        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-sky-200/20 to-violet-200/20 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
              rotate: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Mouse follow effect */}
        <motion.div
          className="hidden md:block absolute w-96 h-96 rounded-full bg-gradient-to-r from-sky-300/10 to-violet-300/10 pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
        />
      </div>

      <header className="relative bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 sm:py-5 px-4 sm:px-8 flex justify-between items-center z-20 sticky top-0">
        <Link
          href="/information"
          className="text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-2 group"
        >
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <ArrowLeft className="h-5 w-5" />
          </motion.div>
          <span className="text-sm font-medium hidden sm:inline-block group-hover:underline">Back</span>
        </Link>

        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Select Your Option
        </motion.h1>

        <motion.div className="scale-75 sm:scale-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Logo />
        </motion.div>
      </header>

      <main className="relative flex-grow container mx-auto px-4 py-8 sm:py-12 z-10">
        <motion.div
          className="max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-gradient-to-r from-sky-500 to-violet-500">Fast & Reliable</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-sky-700 to-violet-700 text-transparent bg-clip-text">
            What would you like to do today?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose from our premium services designed to make shipping and tracking as seamless as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/payment" className="block h-full">
              <motion.div
                className="h-full bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center border border-slate-200 relative overflow-hidden group"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-200 opacity-50" />
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-300/20 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-full mb-4 sm:mb-6"
                    whileHover={{ rotate: 10 }}
                  >
                    <Package className="h-12 w-12 sm:h-16 sm:w-16 text-sky-600" />
                  </motion.div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-slate-800" onClick={YourComponent}>Schedule Pickup</h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-4">
                    Arrange for your package to be collected from your location at a time that suits you.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {["Same-day", "International", "Fragile Items", "Heavy Cargo"].map((tag, i) => (
                      <span key={i} className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className="inline-flex items-center text-sky-600 font-medium text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Get started <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/track" className="block h-full">
              <motion.div
                className="h-full bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center border border-slate-200 relative overflow-hidden group"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-200 opacity-50" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-violet-300/20 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-full mb-4 sm:mb-6"
                    whileHover={{ rotate: -10 }}
                  >
                    <Search className="h-12 w-12 sm:h-16 sm:w-16 text-violet-600" />
                  </motion.div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-slate-800">Track Package</h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-4">
                    Monitor your shipment in real-time with detailed updates on location and estimated delivery.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {["Real-time", "GPS Tracking", "Status Updates", "Delivery ETA"].map((tag, i) => (
                      <span key={i} className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className="inline-flex items-center text-violet-600 font-medium text-sm"
                    whileHover={{ x: 5 }}
                  >
                    Track now <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Uniqueness section */}
        
      </main>

      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChat ? (
          <motion.button
            className="bg-gradient-to-r from-sky-500 to-violet-500 text-white p-4 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-xl border border-slate-200 w-72 sm:w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-gradient-to-r from-sky-500 to-violet-500 text-white p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="font-medium">Customer Support</h3>
              <button onClick={() => setShowChat(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-slate-600 text-sm mb-4">Hello! How can we help you with your shipping needs today?</p>
              <div className="bg-slate-100 rounded-lg p-3 mb-4">
                <p className="text-sm text-slate-700">
                  Our support team is online and ready to assist you with any questions.
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border border-slate-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-500">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
