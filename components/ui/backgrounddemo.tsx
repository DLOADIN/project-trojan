"use client"

import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Navbar } from "@/components/ui/navbar"

export function AccidentDetectionDemo() {
  return (
    <AuroraBackground>
      <Navbar />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-4 h-screen"
      >
        <div className="text-3xl md:text-6xl font-bold text-gray-800 text-center">
          Advanced Accident Detection System
        </div>
        <div className="font-light text-base md:text-2xl text-gray-600 text-center max-w-2xl">
          Leveraging cutting-edge AI and sensor technology to detect accidents with unparalleled accuracy
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
            Learn More
          </button>
          <button className="bg-gray-200 text-gray-800 rounded-full px-6 py-3 font-semibold hover:bg-gray-300 transition-colors">
            Request Demo
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600">Continuous analysis of traffic patterns and vehicle behavior</p>
          </div>
          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">Advanced algorithms for instant accident detection and classification</p>
          </div>
          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Rapid Response</h3>
            <p className="text-gray-600">Immediate alerts to emergency services for faster intervention</p>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  )
}

