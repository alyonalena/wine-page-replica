import { useMemo } from 'react'
//import { useLaunchParams } from '@telegram-apps/sdk-react'

export const useTelegramId = (): number => {
  /*const launchParams = useLaunchParams()*/

  return useMemo(() => { 
  /*  let telegramId = -1

    if (launchParams?.tgWebAppData?.user?.id) {
      telegramId = launchParams?.tgWebAppData?.user?.id
      console.log("User Telegram ID:", telegramId)
    } else {
      console.error("User data not available in initData")
    }*/
    const telegramId = 1739711843

    return Number(telegramId)
  }, [])
}

