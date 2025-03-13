"use client"

import { Fragment } from "react"

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-gray-200">
      <Fragment>
        <div className="absolute inset-0 z-0">
          {/* Background pattern by @ibelick (https://bg.ibelick.com/) */}
          <div className="relative size-full bg-white">
            <div className="absolute size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>
        </div>
        <div className="relative z-1">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600 text-sm">Made by Ivan Manzi</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">&copy; 2025 Road Safety System. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </footer>
  )
}

