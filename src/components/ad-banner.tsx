"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  adKey: string
  width: number
  height: number
  label?: string
  className?: string
}

export default function AdBanner({
  adKey,
  width,
  height,
  label = "Publicidad",
  className = "",
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Copiar el ref a una variable local — esto es lo que exige React para
    // que el cleanup no use un valor que puede haber cambiado (react-hooks/exhaustive-deps)
    const container = containerRef.current
    if (!adKey || !container) return

    container.innerHTML = ""

    const configScript = document.createElement("script")
    configScript.type = "text/javascript"
    configScript.text = `
      atOptions = {
        'key': '${adKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `
    container.appendChild(configScript)

    const invokeScript = document.createElement("script")
    invokeScript.type = "text/javascript"
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`
    invokeScript.async = true
    container.appendChild(invokeScript)

    return () => {
      // Usamos la variable local, no containerRef.current
      container.innerHTML = ""
    }
  }, [adKey, width, height])

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-medium select-none">
        {label}
      </p>

      {adKey ? (
        <div
          ref={containerRef}
          style={{ width: `${width}px`, maxWidth: "100%", minHeight: `${height}px` }}
          aria-label="Espacio publicitario"
        />
      ) : (
        <div
          style={{ width: `${width}px`, maxWidth: "100%", height: `${height}px` }}
          className="bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center"
        >
          <div className="text-center text-slate-400 text-xs px-4">
            <p className="font-medium mb-0.5">📢 Espacio publicitario</p>
            <p className="text-slate-300">{width}×{height}</p>
          </div>
        </div>
      )}
    </div>
  )
}