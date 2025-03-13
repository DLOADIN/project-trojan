"use client"

import { Navbar } from "@/components/ui/navbar"
import { Hero } from "@/components/ui/hero"
import { BentoGrid } from "@/components/ui/bentogrid"
import { RoadSafetySection } from "@/components/ui/roadsafety"
import { GlobalCoverage } from "@/components/ui/globalcoverage"
import { FAQs } from "@/components/ui//faqs"
import { Footer } from "@/components/ui//footer"
import { motion } from "framer-motion"

export default function Home() {
  return (
      <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:1.5}}
        style={{ backgroundImage: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)" }}
        className='relative z-0 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'
      >
        <main >
          <Navbar />
          <Hero />
          <BentoGrid />
          <RoadSafetySection />
          <GlobalCoverage />
          <FAQs/>
          <Footer />
        </main>
    </motion.div>
  )
}

