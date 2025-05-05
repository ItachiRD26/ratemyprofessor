'use client'

import { useEffect, useRef } from 'react'

interface AdsterraBannerProps {
  adKey: string
  width: number
  height: number
}

export default function AdsterraBanner({ adKey, width, height }: AdsterraBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!adRef.current) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`
    script.async = true
    adRef.current.appendChild(script)
  }, [adKey])

  return (
    <div
      ref={adRef}
      style={{ width: `${width}px`, height: `${height}px`, margin: '0 auto' }}
    />
  )
}
