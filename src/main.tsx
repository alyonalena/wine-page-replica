import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { init, miniApp } from '@telegram-apps/sdk'

const initializeTelegramSDK = async () => {
    try {
      await init()
  
      if (miniApp.ready.isAvailable()) {
        await miniApp.ready()
        console.log('Mini App готово')
      }
  
    } catch (error) {
      console.error('Ошибка инициализации:', error)
    }
  }
  
initializeTelegramSDK()

createRoot(document.getElementById("root")!).render(<App />);
