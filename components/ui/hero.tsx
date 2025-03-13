"use client"

import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Shield, Bell, Car, Activity, Map, Phone } from "lucide-react"

export function Hero() {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  }

  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 text-center max-w-5xl tracking-tight leading-[1.15] mb-8">
            Transforming Road Safety
            <br />
            Through <span className="text-green-700">Model</span> Detection
          </h1>

          <p className="text-[15px] text-gray-600 text-center max-w-2xl mb-12 leading-relaxed">
            We are developing cutting-edge camera system that monitor and detect accidents in real-time, enhancing road safety and emergency response capabilities for a safer tomorrow.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
            {[
              { icon: Shield, text: "AI Detection" },
              { icon: Bell, text: "Instant Alerts" },
              { icon: Car, text: "Vehicle Tracking" },
              { icon: Activity, text: "Real-time Analysis" },
              { icon: Map, text: "Location Data" },
              { icon: Phone, text: "Mobile Updates" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <item.icon className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-[13px] text-gray-600">{item.text}</span>
              </motion.div>
            ))}
          </div>


        </motion.div>
      </div>
    </AuroraBackground>
  )
}

