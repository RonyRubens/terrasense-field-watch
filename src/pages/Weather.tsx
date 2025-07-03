
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const weatherData = {
  current: {
    temperature: 28,
    condition: "Ensolarado",
    humidity: 65,
    windSpeed: 12,
    pressure: 1015,
    visibility: 10,
    uvIndex: 7,
    feelsLike: 31
  },
  forecast: [
    { day: "Hoje", icon: Sun, temp: "28°/18°", condition: "Ensolarado", rain: 0 },
    { day: "Amanhã", icon: CloudRain, temp: "24°/16°", condition: "Chuva leve", rain: 80 },
    { day: "Quarta", icon: Cloud, temp: "22°/14°", condition: "Nublado", rain: 20 },
    { day: "Quinta", icon: Sun, temp: "26°/17°", condition: "Sol", rain: 5 },
    { day: "Sexta", icon: CloudRain, temp: "23°/15°", condition: "Chuva", rain: 90 },
    { day: "Sábado", icon: Sun, temp: "29°/19°", condition: "Ensolarado", rain: 0 },
    { day: "Domingo", icon: Cloud, temp: "25°/16°", condition: "Parcialmente nublado", rain: 15 }
  ],
  hourly: [
    { time: "09:00", temp: 22, condition: "Sol" },
    { time: "12:00", temp: 28, condition: "Sol" },
    { time: "15:00", temp: 31, condition: "Sol" },
    { time: "18:00", temp: 26, condition: "Parcialmente nublado" },
    { time: "21:00", temp: 22, condition: "Limpo" },
    { time: "00:00", temp: 18, condition: "Limpo" }
  ]
}

const Weather = () => {
  const { current, forecast, hourly } = weatherData

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Clima</h1>
                <p className="text-sm text-muted-foreground">Previsão meteorológica e condições atuais</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Condições Atuais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-700">
                    <Sun className="w-6 h-6 text-yellow-500" />
                    Condições Atuais
                  </CardTitle>
                  <CardDescription>Fazenda TerraSense - Atualizado agora</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-4xl font-bold text-terra-700">{current.temperature}°C</div>
                      <div className="text-lg text-muted-foreground">{current.condition}</div>
                      <div className="text-sm text-muted-foreground">Sensação térmica: {current.feelsLike}°C</div>
                    </div>
                    <Sun className="w-16 h-16 text-yellow-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Umidade</div>
                      <div className="font-semibold">{current.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Vento</div>
                      <div className="font-semibold">{current.windSpeed} km/h</div>
                    </div>
                    <div className="text-center">
                      <Gauge className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Pressão</div>
                      <div className="font-semibold">{current.pressure} hPa</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-5 h-5 text-green-500 mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Visibilidade</div>
                      <div className="font-semibold">{current.visibility} km</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-terra-700">Hoje por Hora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hourly.map((hour, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{hour.time}</span>
                      <span className="font-medium">{hour.temp}°C</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Previsão de 7 dias */}
            <Card>
              <CardHeader>
                <CardTitle className="text-terra-700">Previsão de 7 dias</CardTitle>
                <CardDescription>Planeje suas atividades agrícolas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {forecast.map((day, index) => {
                    const Icon = day.icon
                    return (
                      <div key={index} className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="font-medium text-sm mb-2">{day.day}</div>
                        <Icon className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                        <div className="font-semibold mb-1">{day.temp}</div>
                        <div className="text-xs text-muted-foreground mb-1">{day.condition}</div>
                        <div className="text-xs text-blue-600">
                          {day.rain > 0 ? `${day.rain}%` : '0%'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Alertas Meteorológicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-terra-700 flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    Alerta de Chuva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Chuva moderada prevista para amanhã (80% de chance)
                  </p>
                  <p className="text-xs text-orange-600 font-medium">
                    Recomendação: Suspender irrigação e proteger equipamentos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-terra-700 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    Condições Ideais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Temperatura e umidade ideais para o crescimento das culturas
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Todas as plantações em condições favoráveis
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Weather
