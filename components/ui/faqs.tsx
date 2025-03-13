"use client"

import { Fragment, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: "How does your road safety system work?",
      answer:
        "Our system uses AI-powered cameras and sensors installed at key locations to monitor traffic conditions and detect potential hazards in real-time. When a dangerous situation is detected, the system automatically sends alerts to relevant parties including drivers, pedestrians, and emergency services.",
    },
    {
      question: "Which areas in Rwanda are currently covered?",
      answer:
        "We're currently focusing on major urban areas including Kigali, Butare, and Gisenyi, with plans to expand to other cities and major highways across Rwanda in the coming months.",
    },
    {
      question: "How accurate is the accident prediction system?",
      answer:
        "Our system has demonstrated over 92% accuracy in predicting potential accident scenarios based on real-time traffic patterns, weather conditions, and historical data. The AI continuously learns and improves its prediction capabilities over time.",
    },
    {
      question: "Can I receive alerts on my mobile phone?",
      answer:
        "Yes, we offer a mobile application that provides real-time alerts based on your location. The app is available for both Android and iOS devices and can be configured to provide different types of safety notifications.",
    },
    {
      question: "How quickly are emergency services notified?",
      answer:
        "Our system notifies emergency services within seconds of detecting a critical situation. The average response time from detection to notification is under 30 seconds, significantly reducing emergency response times.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-16 md:py-24" id="faqs">
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
              <h2 className="text-3xl md:text-4xl font-bold text-black">
              Frequently Asked <span className="text-green-600 font-italic"> Questions</span>
              </h2>
              <p className="text-gray-600 max-w-2xl text-lg mx-auto">
                Find answers to common questions about our road safety system
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div
                    onClick={() => toggleFAQ(index)}
                    className={`flex justify-between items-center p-5 rounded-lg cursor-pointer transition-all duration-200 ${
                      openIndex === index ? "bg-green-50 shadow-sm" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-medium text-12px text-gray-800">{item.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        openIndex === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-5 rounded-b-lg text-14px text-gray-600 border-t border-gray-100"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    </section>
  )
}

