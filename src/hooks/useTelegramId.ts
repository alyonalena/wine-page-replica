import { useMemo } from 'react'
//import { useLaunchParams } from '@telegram-apps/sdk-react'
// Retrieve the launch parameters, including the initData raw string.
import { useLaunchParams } from '@telegram-apps/sdk-react'

export const useTelegramId = (): number => {
  const launchParams = useLaunchParams()
  
  return useMemo(() => { 
    let telegramId = 1739711844

     //The user data is located within the initData
    console.info('HELLO '+launchParams)
    if (launchParams?.tgWebAppData?.user?.id) {
      telegramId = launchParams?.tgWebAppData?.user?.id
      console.log("User Telegram ID:", telegramId)
     //Use the telegramId as needed in your application
    } else {
      console.error("User data not available in initData")
    }

    return Number(telegramId)
  }, [])
}

