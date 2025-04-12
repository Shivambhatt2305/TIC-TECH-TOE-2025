"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plane,
  Train,
  Ship,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Globe,
  Clock,
  Shield,
  Award,
  Info,
} from "lucide-react"
import Logo from "../../components/Logo"
import { Badge } from "@/components/ui/badge"

interface TransportMode {
  icon: any
  name: string
  description: string
  details: string
  color: string
}

const transportModes: TransportMode[] = [
  {
    icon: Plane,
    name: "Air Transport",
    description: "Lightning-fast international shipping",
    details:
      "Our air freight services offer the quickest transit times for urgent shipments. We partner with major airlines to ensure global coverage and reliable schedules.",
    color: "from-sky-100 to-sky-200",
  },
  {
    icon: Train,
    name: "Rail Transport",
    description: "Eco-friendly continental shipping",
    details:
      "Rail transport is perfect for heavy or bulky items. It's a cost-effective and environmentally friendly option for continental shipments.",
    color: "from-violet-100 to-violet-200",
  },
  {
    icon: Ship,
    name: "Sea Transport",
    description: "Cost-effective bulk shipping",
    details:
      "Sea freight is the most economical option for large volume international shipments. We offer both FCL (Full Container Load) and LCL (Less than Container Load) services.",
    color: "from-cyan-100 to-cyan-200",
  },
  {
    icon: Truck,
    name: "Road Transport",
    description: "Flexible door-to-door delivery",
    details:
      "Our road freight services offer door-to-door delivery with flexible scheduling. It's ideal for local and regional shipments with multiple stops.",
    color: "from-rose-100 to-rose-200",
  },
]

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to over 190 countries with local expertise in every region",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Monitor your shipments 24/7 with our advanced tracking technology",
  },
  {
    icon: Shield,
    title: "Secure Handling",
    description: "Industry-leading security protocols to protect your valuable cargo",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "ISO certified operations with award-winning customer service",
  },
]

const InformationPage = () => {
  const [activeTab, setActiveTab] = useState("transport")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleCardDetails = (name: string) => {
    if (expandedCard === name) {
      setExpandedCard(null)
    } else {
      setExpandedCard(name)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
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
        <Link href="/" className="text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-2 group">
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
        TransportSolutions
        </motion.h1>

        <motion.div className="scale-75 sm:scale-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Logo />
        </motion.div>
      </header>

      <main className="relative container mx-auto px-4 py-8 sm:py-12 z-10 flex flex-col">
        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-full p-1 border border-slate-200 shadow-sm">
            <div className="flex space-x-1">
              <motion.button
                className={`relative px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === "transport" ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setActiveTab("transport")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === "transport" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
                    layoutId="activeTab"
                    initial={false}
                  />
                )}
                <span className="relative z-10">Transport Options</span>
                
              </motion.button>

              <motion.button
                className={`relative px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === "features" ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setActiveTab("features")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === "features" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
                    layoutId="activeTab"
                    initial={false}
                  />
                )}
                <span className="relative z-10">Our Uniqueness</span>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "transport" && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {transportModes.map((mode, index) => (
                  <motion.div
                    key={mode.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="w-full"
                  >
                    <TransportModeCard
                      {...mode}
                      isExpanded={expandedCard === mode.name}
                      onToggle={() => toggleCardDetails(mode.name)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-10">
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 text-transparent bg-clip-text mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Why Choose Our Services?
                </motion.h2>
                <motion.p
                  className="text-slate-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  We combine cutting-edge technology with decades of logistics expertise to deliver unparalleled
                  shipping solutions tailored to your needs.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-sky-100 to-violet-100 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 bg-gradient-to-r from-sky-50 to-violet-50 rounded-xl p-6 border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <Badge className="bg-gradient-to-r from-sky-500 to-violet-500 mb-3">Industry Leader</Badge>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Trusted by 10,000+ Businesses Worldwide</h3>
                    <p className="text-slate-600">
                      From startups to Fortune 500 companies, our logistics solutions power businesses of all sizes.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {["99.8% On-time", "Carbon Neutral", "24/7 Support", "Custom Solutions"].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 shadow-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-sky-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href="/options"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-500 to-violet-500 
              rounded-full font-semibold text-white hover:from-sky-600 hover:to-violet-600 transition-all duration-300 
              shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 text-base relative overflow-hidden group"
          >
            <span className="relative z-10">Continue to Next Step</span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="relative z-10 ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

// Inline TransportModeCard component to avoid the 3D model loading issue
function TransportModeCard({
  icon: Icon,
  name,
  description,
  details,
  color,
  isExpanded,
  onToggle,
}: TransportMode & { isExpanded: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className={`relative bg-white/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 h-full`}
      layout
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50`} />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg">
            <Icon className="h-6 w-6 text-slate-700" />
          </div>

          <motion.button
            className="text-slate-500 hover:text-slate-800 transition-colors"
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="h-5 w-5" />
          </motion.button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">{name}</h3>
        <p className="text-slate-600 mb-4">{description}</p>

        <motion.div
          className="mt-auto"
          animate={{ height: isExpanded ? "auto" : "0" }}
          initial={{ height: "0" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="pt-4 border-t border-slate-200 mt-2">
            <p className="text-sm text-slate-600">{details}</p>

            {/* Image instead of 3D model */}
            <div className="h-32 mt-4 rounded-lg overflow-hidden bg-white/50 flex items-center justify-center">
              <div className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-2 text-slate-600" />
                <p className="text-sm text-slate-500">Interactive {name.toLowerCase()} visualization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InformationPage
