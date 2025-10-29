import { useEffect, useState } from 'react'

const useCountdown = (seconds = 5, onFinish?: () => void) => {
  const [countdown, setCountdown] = useState(seconds)

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onFinish?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, onFinish])

  const resetCountdown = () => setCountdown(seconds)

  return { countdown, resetCountdown }
}

export default useCountdown
