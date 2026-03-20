import { useMemo } from 'react'
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { getApiBaseUrl } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export const useTelegramId = (): number => {
  const launchParams = useLaunchParams()

  return useMemo(() => { 
    let telegramId = -1

    if (launchParams?.tgWebAppData?.user?.id) {
      telegramId = launchParams?.tgWebAppData?.user?.id
      console.log("User Telegram ID:", telegramId)
    } else {
      console.error("User data not available in initData")
    }

    return Number(telegramId)
  }, [])
}

export const useUserInfo = () => {
  const telegramId = useTelegramId()

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
    queryKey: ['user', telegramId],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/persons/?telegram_id=${telegramId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return {
          fullName: 'Пользователь',
          status: 'Гость',
          initials: 'U',
        }
      }

      return response.json().then(userList => {
        const currentUser = userList[0]
        return {
          fullName: `${currentUser.firstname || ''} ${currentUser.lastname || ''}`.trim() || currentUser.nickname || 'Пользователь',
          status: currentUser.grade?.name || 'Гость',
          initials: `${currentUser.firstname?.[0] || ''}${currentUser.lastname?.[0] || ''}`.toUpperCase() || currentUser.nickname?.[0]?.toUpperCase() || 'U',
          ...currentUser
        }
      })
    },
  })

  const isSXPrime = user && (user.subscription.price > 0)

  return { user, isSXPrime, isLoadingUser, isErrorUser }
}

