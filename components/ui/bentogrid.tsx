"use client"

import { motion } from "framer-motion"
import { Camera, AlertTriangle, Siren, LineChart, Brain, Car } from "lucide-react"
import { Fragment } from "react"

export function BentoGrid() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const cards = [
    {
      title: "AI-Powered Detection",
      description: "Real-time accident detection using advanced computer vision and machine learning algorithms",
      icon: Brain,
      className: "col-span-2 md:row-span-2 bg-gradient-to-br from-violet-500 to-purple-500",
      iconClass: "w-10 h-10",
    },
    {
      title: "Smart Cameras",
      description: "High-resolution cameras with night vision capabilities",
      icon: Camera,
      className: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconClass: "w-8 h-8",
    },
    {
      title: "Instant Alerts",
      description: "Immediate notification system for emergency services",
      icon: AlertTriangle,
      className: "bg-gradient-to-br from-amber-500 to-orange-500",
      iconClass: "w-8 h-8",
    },
    {
      title: "Vehicle Tracking",
      description: "Advanced vehicle recognition and tracking system",
      icon: Car,
      className: "bg-gradient-to-br from-emerald-500 to-teal-500",
      iconClass: "w-8 h-8",
    },
    {
      title: "Emergency Response",
      description: "Automated dispatch system with precise location data",
      icon: Siren,
      className: "col-span-2 bg-gradient-to-br from-pink-500 to-rose-500",
      iconClass: "w-8 h-8",
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive data analysis and reporting system",
      icon: LineChart,
      className: "md:col-span-2 bg-gradient-to-br from-[#00D959] to-emerald-500",
      iconClass: "w-8 h-8",
    },
  ]

  return (
    <section className="py-24 px-4 relative" id="Features">
      <Fragment>
        <div className="absolute inset-0 z-0">
          {/* Background pattern by @ibelick (https://bg.ibelick.com/) */}
          <div className="relative size-full bg-white">
            <div className="absolute size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>
        </div>
        <div className="relative z-1">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
              Comprehensive Safety <span className="text-green-600">Features</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our system combines multiple technologies to ensure maximum road safety
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  className={`${card.className} rounded-3xl p-8 text-white flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-white/10" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <card.icon className={`${card.iconClass} text-white/90`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white/90">{card.title}</h3>
                    <p className="text-sm text-white/70">{card.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    </section>
  )
}

