import { ConfigProvider } from 'antd'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import WinesPage from "./pages/WinesPage"
import EventsPage from "./pages/EventsPage"
import WineDetailPage from "./pages/WineDetailPage"
import UserProfilePage from "./pages/UserProfilePage"
import TeamPage from "./pages/TeamPage"
import AboutClubPage from "./pages/AboutClubPage"
import NotFound from "./pages/NotFound"
import ProducersPage from "./pages/ProducersPage"
import EventDetailPage from "./pages/EventDetailPage"
import ProducerDetailPage from "./pages/ProducerDetailPage"


const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8B1538',
            borderRadius: 3,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          },
          components: {
            Rate: {
                starColor: '#E7014C',
            },
            Card: {
              fontFamily: "Ubuntu"
            }
          }
        }}
      >
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wines" element={<WinesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/wine/:id" element={<WineDetailPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/producers" element={<ProducersPage />} />
            <Route path="/about" element={<AboutClubPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/producer/:id" element={<ProducerDetailPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>      
      </ConfigProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
