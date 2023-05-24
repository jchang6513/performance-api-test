import { useEffect, useState } from "react";

type PerfState = {
  startTime: number
  duration: number
}

type PerfTiming = {
  fp?: PerfState
  fcp?: PerfState
  lcp?: PerfState
}

export const usePerfTiming = () => {
  const [timing, setTiming] = useState<PerfTiming>({})

  useEffect(() => {
    const observer = new PerformanceObserver((entryList) => {
      const updateTiming: PerfTiming = {}

      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          updateTiming.lcp = {
            startTime: entry.startTime,
            duration: entry.duration,
          }
        } else if (entry.name === 'first-paint') {
          updateTiming.fp = {
            startTime: entry.startTime,
            duration: entry.duration,
          }
        } else if (entry.name === 'first-contentful-paint') {
          updateTiming.fcp = {
            startTime: entry.startTime,
            duration: entry.duration,
          }
        } else {
          console.log(entry)
        }
      }
      setTiming(org => ({ ...org, ...updateTiming }))
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'], buffered: true });

    return () => observer.disconnect()
  }, [])

  return timing
}
