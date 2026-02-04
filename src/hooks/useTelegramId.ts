import { useMemo } from 'react';
//import { useLaunchParams } from '@telegram-apps/sdk-react'
// Retrieve the launch parameters, including the initData raw string.


export const useTelegramId = (): number => {
  return useMemo(() => { 
    let telegramId = 0
    //const launchParams = useLaunchParams()
    // The user data is located within the initData
    if (window.Telegram?.WebApp) {
      telegramId = window.Telegram.WebApp.initDataUnsafe.user.id
      console.log("User Telegram ID:", telegramId)
    // Use the telegramId as needed in your application
    } else {
      console.error("User data not available in initData")
    }
  
    return Number(telegramId)
  }, [])
}

