import { useMemo } from 'react';
//import { useLaunchParams } from '@telegram-apps/sdk-react'
// Retrieve the launch parameters, including the initData raw string.
import { useLaunchParams } from '@telegram-apps/sdk-react'

export const useTelegramId = (): number => {
  return useMemo(() => { 
    let telegramId = -1
    //const launchParams = useLaunchParams()
    // The user data is located within the initData
    //if (launchParams.tgWebAppData?.user?.id) {
      //telegramId = launchParams.tgWebAppData?.user?.id
      //console.log("User Telegram ID:", telegramId)
    // Use the telegramId as needed in your application
   // } else {
     // console.error("User data not available in initData")
   // }
  alert(telegramId)
    return Number(telegramId)
  }, [])
}

