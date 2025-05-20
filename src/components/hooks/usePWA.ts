// components/hooks/usePWA.ts
import { useState, useEffect } from 'react'

export function usePWA() {
  const [promptInstall, setPromptInstall] = useState<any>(null)
  const [isAppInstalled, setIsAppInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPromptInstall(e)
    }

    const handleAppInstalled = () => {
      setIsAppInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installPWA = async () => {
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
    const { outcome } = await promptInstall.userChoice
    if (outcome === 'accepted') {
      setPromptInstall(null)
    }
  }

  return { promptInstall, installPWA, isAppInstalled }
}