import { useMemo } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk'

// Retrieve the launch parameters, including the initData raw string.
const launchParams = retrieveLaunchParams()


export const useTelegramId = (): number => {
  return useMemo(() => {
    // The user data is located within the initData
    let telegramId = ''
    if (launchParams.initData?.user) {
      telegramId = launchParams.initData.user?.id
      console.log("User Telegram ID:", telegramId)
    // Use the telegramId as needed in your application
    } else {
      console.error("User data not available in initData")
    }
    const localTelegramId = localStorage.getItem('telegramId')
    return Number(telegramId || localTelegramId)
  }, [])
}

