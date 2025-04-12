"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, useGLTF } from "@react-three/drei"

interface TransportModeCardProps {
  icon: any
  name: string
  description: string
  details: string
  model: string
  color: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

export default function TransportModeCard({
  icon: Icon,
  name,
  description,
  details,
  model,
  color,
}: TransportModeCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      className={`relative bg-white/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 h-full`}
      whileHover={{ scale: 1.02 }}
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
            onClick={() => setShowDetails(!showDetails)}
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
          animate={{ height: showDetails ? "auto" : "0" }}
          initial={{ height: "0" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="pt-4 border-t border-slate-200 mt-2">
            <p className="text-sm text-slate-600">{details}</p>

            <div className="h-32 mt-4 rounded-lg overflow-hidden">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 400 }}
                >
                  <Model url={model} />
                </PresentationControls>
              </Canvas>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
