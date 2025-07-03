
import { useState } from "react"
import { Droplets, Power, Activity, Gauge, Settings } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

const irrigationData = {
  general: {
    totalWaterUsed: 4330,
    activeZones: 2,
    totalZones: 4,
    pressure: 2.5,
    flowRate: 45
  },
  zones: [
    {
      id: 1,
      name: "Milho - Setor A",
      isActive: true,
      waterUsed: 1250,
      flowRate: 12,
      pressure: 2.3,
      lastIrrigation: "Hoje, 06:00",
      nextScheduled: "Hoje, 18:00",
      soilMoisture: 65
    },
    {
      id: 2,
      name: "Soja - Setor B",
      isActive: false,
      waterUsed: 980,
      flowRate: 0,
      pressure: 0,
      lastIrrigation: "Ontem, 18:00",
      nextScheduled: "Hoje, 16:00",
      soilMoisture: 58
    },
    {
      id: 3,
      name: "Tomate - Setor C",
      isActive: true,
      waterUsed: 1450,
      flowRate: 18,
      pressure: 2.7,
      lastIrrigation: "Hoje, 07:00",
      nextScheduled: "Hoje, 19:00",
      soilMoisture: 70
    },
    {
      id: 4,
      name: "Alface - Setor D",
      isActive: false,
      waterUsed: 650,
      flowRate: 0,
      pressure: 0,
      lastIrrigation: "Hoje, 05:30",
      nextScheduled: "Hoje, 17:30",
      soilMoisture: 68
    }
  ]
}

const Irrigation = () => {
  const [zones, setZones] = useState(irrigationData.zones)

  const toggleZone = (zoneId: number) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, isActive: !zone.isActive, flowRate: zone.isActive ? 0 : 15 }
        : zone
    ))
  }

  const getMoistureColor = (moisture: number) => {
    if (moisture >= 65) return "text-green-600"
    if (moisture >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getMoistureBadge = (moisture: number) => {
    if (moisture >= 65) return "bg-green-100 text-green-800"
    if (moisture >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Sistema de Irrigação</h1>
                <p className="text-sm text-muted-foreground">Controle remoto e monitoramento de água</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Status Geral */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Hoje</p>
                      <p className="text-2xl font-bold text-blue-600">{irrigationData.general.totalWaterUsed}L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Zonas Ativas</p>
                      <p className="text-2xl font-bold text-green-600">
                        {zones.filter(z => z.isActive).length}/{irrigationData.general.totalZones}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gauge className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pressão</p>
                      <p className="text-2xl font-bold text-purple-600">{irrigationData.general.pressure} bar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fluxo Total</p>
                      <p className="text-2xl font-bold text-orange-600">{zones.reduce((acc, zone) => acc + zone.flowRate, 0)} L/min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controle por Zona */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-terra-700">
                  <Settings className="w-5 h-5" />
                  Controle por Zona de Irrigação
                </CardTitle>
                <CardDescription>
                  Ative ou desative a irrigação individualmente para cada plantação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {zones.map((zone) => (
                    <Card key={zone.id} className={`transition-all ${zone.isActive ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{zone.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={zone.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {zone.isActive ? "Ativa" : "Inativa"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Irrigação</span>
                          <Switch 
                            checked={zone.isActive}
                            onCheckedChange={() => toggleZone(zone.id)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Água hoje:</span>
                            <p className="font-semibold text-blue-600">{zone.waterUsed}L</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fluxo atual:</span>
                            <p className="font-semibold">{zone.flowRate} L/min</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Pressão:</span>
                            <p className="font-semibold">{zone.pressure} bar</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Umidade solo:</span>
                            <p className={`font-semibold ${getMoistureColor(zone.soilMoisture)}`}>
                              {zone.soilMoisture}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-3 space-y-2 text-xs text-muted-foreground">
                          <p>Última irrigação: {zone.lastIrrigation}</p>
                          <p>Próxima programada: {zone.nextScheduled}</p>
                        </div>

                        <Button 
                          variant={zone.isActive ? "destructive" : "default"}
                          className="w-full"
                          onClick={() => toggleZone(zone.id)}
                        >
                          <Power className="w-4 h-4 mr-2" />
                          {zone.isActive ? "Parar Irrigação" : "Iniciar Irrigação"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Histórico e Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-terra-700">Consumo Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { day: "Segunda", usage: 4250 },
                      { day: "Terça", usage: 3890 },
                      { day: "Quarta", usage: 4150 },
                      { day: "Quinta", usage: 3950 },
                      { day: "Sexta", usage: 4330 },
                      { day: "Sábado", usage: 3600 },
                      { day: "Domingo", usage: 3200 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.day}</span>
                        <span className="font-semibold text-blue-600">{item.usage}L</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-terra-700">Alertas do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Pressão baixa no Setor B</p>
                    <p className="text-xs text-yellow-600">Verificar conexões da tubulação</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Sistema funcionando normalmente</p>
                    <p className="text-xs text-green-600">Todos os sensores operacionais</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Economia de água: 15%</p>
                    <p className="text-xs text-blue-600">Comparado à semana passada</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Irrigation
