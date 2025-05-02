// "use client"

// import { useEffect, useRef } from "react"

// interface AdBannerProps {
//   slot: string
//   format?: "auto" | "rectangle" | "horizontal" | "vertical"
//   responsive?: boolean
//   className?: string
// }

// export default function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
//   const adRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     try {
//       const adsbygoogle = window.adsbygoogle || []
//       adsbygoogle.push({})
//     } catch (error) {
//       console.error("AdSense error:", error)
//     }
//   }, [])

//   return (
//     <div className={`ad-container overflow-hidden ${className}`} ref={adRef}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
//         data-ad-slot={slot}
//         data-ad-format={format}
//         data-full-width-responsive={responsive ? "true" : "false"}
//       />
//     </div>
//   )
// }

