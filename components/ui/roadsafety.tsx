"use client"

// import { Globe } from "@/components/ui/globe"
import { Fragment } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import globe from '@/components/ui/globe.png'

export function RoadSafetySection() {
  return (
    <section className="relative py-16 md:py-24" id="mission">
      <Fragment>
        <div className="absolute inset-0 z-0">
          {/* Background pattern by @ibelick (https://bg.ibelick.com/) */}
          <div className="relative size-full bg-white">
            <div className="absolute size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>
        </div>
        <div className="relative z-1">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 mb-4">
                <Shield className="w-4 h-4" />
                Road Safety Initiative
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Revolutionizing Road Safety in <span className="text-green-600">Rwanda</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <p className="text-lg mb-6 text-gray-700">
                  Our advanced scanning system is transforming how we approach road safety across Rwanda. By utilizing
                  cutting-edge camera and AI technology, we're creating a network of intelligent monitoring systems
                  that can detect potential hazards before they become accidents.
                </p>

                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-green-700 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Real-time Alert System
                  </h3>
                  <p className="text-gray-700 mb-3">The system provides real-time alerts to:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      Drivers about upcoming road conditions and potential hazards
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      Pedestrians through mobile notifications in high-risk areas
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      Emergency services with precise location data for faster response
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      Traffic management systems to optimize flow and reduce congestion
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative order-1 md:order-2 h-[400px]"
              >
                <div className="relative flex size-full max-w-lg mx-auto items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white/80 backdrop-blur-sm px-8 pb-40 pt-8 md:pb-60 shadow-xl">
                  {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-green-700 to-green-300/80 bg-clip-text text-center text-5xl font-bold leading-none text-transparent">
                    Rwanda's Road Safety
                  </span> */}
                  <Image 
                  src= {globe} 
                  alt="Globe representing road safety in Rwanda"
                  />
                  {/* <Globe className="top-28" /> */}
                  <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.1),rgba(255,255,255,0))]" />
                </div>

                
              </motion.div>
            </div>
          </div>
        </div>
      </Fragment>
    </section>
  )
}

