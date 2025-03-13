// "use client"

// import createGlobe, { type COBEOptions } from "cobe"
// import { useCallback, useEffect, useRef, useState } from "react"
// import { cn } from "@/lib/utils"

// const GLOBE_CONFIG: COBEOptions = {
//   width: 800,
//   height: 800,
//   onRender: () => {},
//   devicePixelRatio: 2,
//   phi: 0,
//   theta: 0.3,
//   dark: 0,
//   diffuse: 0.4,
//   mapSamples: 16000,
//   mapBrightness: 1.2,
//   baseColor: [1, 1, 1],
//   markerColor: [251 / 255, 100 / 255, 21 / 255],
//   glowColor: [1, 1, 1],
//   markers: [
//     { location: [14.5995, 120.9842], size: 0.03 },
//     { location: [19.076, 72.8777], size: 0.1 },
//     { location: [39.9042, 116.4074], size: 0.08 },
//     { location: [-23.5505, -46.6333], size: 0.1 },
//     { location: [34.6937, 135.5022], size: 0.05 },
//     { location: [41.0082, 28.9784], size: 0.06 },
//     { location: [-1.9403, 29.8739], size: 0.05 },
//   ],
// }

// export function Globe({
//   className,
//   config = GLOBE_CONFIG,
// }: {
//   className?: string
//   config?: COBEOptions
// }) {
//   const [width, setWidth] = useState(0)
//   const [r, setR] = useState(0)
//   const [phi, setPhi] = useState(0)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const pointerInteracting = useRef(null)
//   const pointerInteractionMovement = useRef(0)
//   const globeRef = useRef<any>(null);

//   const updatePointerInteraction = useCallback((value: any) => {
//     pointerInteracting.current = value
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = value ? "grabbing" : "grab"
//     }
//   }, [])

//   const updateMovement = useCallback((clientX: any) => {
//     if (pointerInteracting.current !== null) {
//       const delta = clientX - pointerInteractionMovement.current
//       pointerInteractionMovement.current = delta
//       setR(delta / 200)
//     }
//   }, [])

//   const onRender = useCallback(
//     (state: Record<string, any>) => {
//       if (!pointerInteracting.current) setPhi((prevPhi) => prevPhi + 0.005)
//       state.phi = phi + r
//       state.width = width * 2
//       state.height = width * 2
//     },
//     [r, phi, width],
//   )

//   const onResize = useCallback(() => {
//     if (canvasRef.current) {
//       setWidth(canvasRef.current.offsetWidth)
//     }
//   }, [])

//   useEffect(() => {
//     window.addEventListener("resize", onResize)
//     onResize()

//     globeRef.current = createGlobe(canvasRef.current!, {
//       ...config,
//       width: width * 2,
//       height: width * 2,
//       onRender,
//     })

//     setTimeout(() => (canvasRef.current!.style.opacity = "1"))
//     return () => {
//       window.removeEventListener("resize", onResize)
//       globeRef.current?.destroy()
//     }
//   }, [config, onResize, onRender, width])

//   return (
//     <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
//       <canvas
//         className={cn("size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]")}
//         ref={canvasRef}
//         onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
//         onPointerUp={() => updatePointerInteraction(null)}
//         onPointerOut={() => updatePointerInteraction(null)}
//         onMouseMove={(e) => updateMovement(e.clientX)}
//         onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
//       />
//     </div>
//   )
// }