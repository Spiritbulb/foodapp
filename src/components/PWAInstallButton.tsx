// components/PWAInstallButton.tsx
import { useIsMobile } from '@/components/hooks/use-mobile'
import { usePWA } from '@/components/hooks/usePWA'
import { Button } from '@/components/ui/button'

export function PWAInstallButton() {
  const isMobile = useIsMobile()
  const { promptInstall, installPWA, isAppInstalled } = usePWA()

  if (!isMobile || !promptInstall || isAppInstalled) {
    return null
  }

  return (
    <Button 
      variant="food" 
      onClick={installPWA}
      className="fixed bottom-4 right-4 z-50 shadow-lg"
    >
      Install App
    </Button>
  )
}