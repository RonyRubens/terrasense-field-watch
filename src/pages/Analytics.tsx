
import { useState } from "react"
import { BarChart3, TrendingUp, Activity } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts"

const cropsAnalytics = {
  milho: {
    name: "Milho - Setor A",
    tempData: [
      { day: "Seg", temp: 24, humidity: 68, soil: 62 },
      { day: "Ter", temp: 26, humidity: 72, soil: 65 },
      { day: "Qua", temp: 28, humidity: 70, soil: 63 },
      { day: "Qui", temp: 25, humidity: 75, soil: 68 },
      { day: "Sex", temp: 27, humidity: 73, soil: 66 },
      { day: "Sáb", temp: 29, humidity: 69, soil: 64 },
      { day: "Dom", temp: 26, humidity: 71, soil: 67 }
    ],
    productivity: [
      { week: "Sem 1", growth: 15, health: 90 },
      { week: "Sem 2", growth: 25, health: 92 },
      { week: "Sem 3", growth: 35, health: 95 },
      { week: "Sem 4", growth: 48, health: 93 }
    ]
  },
  soja: {
    name: "Soja - Setor B",
    tempData: [
      { day: "Seg", temp: 22, humidity: 65, soil: 58 },
      { day: "Ter", temp: 24, humidity: 68, soil: 60 },
      { day: "Qua", temp: 26, humidity: 66, soil: 57 },
      { day: "Qui", temp: 23, humidity: 70, soil: 62 },
      { day: "Sex", temp: 25, humidity: 67, soil: 59 },
      { day: "Sáb", temp: 27, humidity: 64, soil: 56 },
      { day: "Dom", temp: 24, humidity: 69, soil: 61 }
    ],
    productivity: [
      { week: "Sem 1", growth: 12, health: 85 },
      { week: "Sem 2", growth: 22, health: 87 },
      { week: "Sem 3", growth: 32, health: 88 },
      { week: "Sem 4", growth: 42, health: 90 }
    ]
  },
  tomate: {
    name: "Tomate - Setor C",
    tempData: [
      { day: "Seg", temp: 26, humidity: 72, soil: 68 },
      { day: "Ter", temp: 28, humidity: 75, soil: 70 },
      { day: "Qua", temp: 30, humidity: 73, soil: 67 },
      { day: "Qui", temp: 27, humidity: 78, soil: 72 },
      { day: "Sex", temp: 29, humidity: 76, soil: 69 },
      { day: "Sáb", temp: 31, humidity: 74, soil: 66 },
      { day: "Dom", temp: 28, humidity: 77, soil: 71 }
    ],
    productivity: [
      { week: "Sem 1", growth: 18, health: 88 },
      { week: "Sem 2", growth: 28, health: 90 },
      { week: "Sem 3", growth: 38, health: 92 },
      { week: "Sem 4", growth: 50, health: 94 }
    ]
  },
  alface: {
    name: "Alface - Setor D",
    tempData: [
      { day: "Seg", temp: 20, humidity: 78, soil: 66 },
      { day: "Ter", temp: 22, humidity: 80, soil: 68 },
      { day: "Qua", temp: 24, humidity: 77, soil: 65 },
      { day: "Qui", temp: 21, humidity: 82, soil: 70 },
      { day: "Sex", temp: 23, humidity: 79, soil: 67 },
      { day: "Sáb", temp: 25, humidity: 76, soil: 64 },
      { day: "Dom", temp: 22, humidity: 81, soil: 69 }
    ],
    productivity: [
      { week: "Sem 1", growth: 20, health: 82 },
      { week: "Sem 2", growth: 30, health: 84 },
      { week: "Sem 3", growth: 40, health: 85 },
      { week: "Sem 4", growth: 52, health: 87 }
    ]
  }
}

const Analytics = () => {
  const [selectedCrop, setSelectedCrop] = useState("milho")
  const currentData = cropsAnalytics[selectedCrop as keyof typeof cropsAnalytics]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Análises</h1>
                <p className="text-sm text-muted-foreground">Dados detalhados de cada plantação</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(cropsAnalytics).map(([key, crop]) => (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all ${selectedCrop === key ? 'ring-2 ring-terra-500 bg-terra-50' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedCrop(key)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-terra-700">{crop.name}</h3>
                    <p className="text-sm text-muted-foreground">Clique para ver dados</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-terra-700">
                  <BarChart3 className="w-5 h-5" />
                  Dados de {currentData.name}
                </CardTitle>
                <CardDescription>
                  Análise detalhada dos últimos 7 dias e evolução semanal
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="environmental" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="environmental">Dados Ambientais</TabsTrigger>
                    <TabsTrigger value="productivity">Produtividade</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="environmental" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentData.tempData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="day" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="temp" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            name="Temperatura (°C)"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="humidity" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="Umidade (%)"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="soil" 
                            stroke="hsl(120 60% 35%)" 
                            strokeWidth={2}
                            name="Umidade do Solo (%)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="productivity" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData.productivity}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="week" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="growth" 
                            fill="hsl(120 60% 35%)" 
                            name="Crescimento (%)"
                          />
                          <Bar 
                            dataKey="health" 
                            fill="#3b82f6" 
                            name="Saúde da Planta (%)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Analytics
