
import { Sprout, Thermometer, Droplets, Calendar, TrendingUp } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const cropsData = [
  {
    id: 1,
    name: "Milho - Setor A",
    area: "2.5 ha",
    plantingDate: "15 Mar 2024",
    expectedHarvest: "25 Jul 2024",
    stage: "Floração",
    health: "Excelente",
    temperature: "26°C",
    humidity: "72%",
    soilMoisture: "65%",
    productivity: "95%",
    waterUsage: "1,250L hoje"
  },
  {
    id: 2,
    name: "Soja - Setor B",
    area: "3.2 ha",
    plantingDate: "05 Abr 2024",
    expectedHarvest: "15 Ago 2024",
    stage: "Desenvolvimento",
    health: "Bom",
    temperature: "24°C",
    humidity: "68%",
    soilMoisture: "58%",
    productivity: "88%",
    waterUsage: "980L hoje"
  },
  {
    id: 3,
    name: "Tomate - Setor C",
    area: "1.8 ha",
    plantingDate: "20 Mar 2024",
    expectedHarvest: "10 Jul 2024",
    stage: "Frutificação",
    health: "Excelente",
    temperature: "28°C",
    humidity: "75%",
    soilMoisture: "70%",
    productivity: "92%",
    waterUsage: "1,450L hoje"
  },
  {
    id: 4,
    name: "Alface - Setor D",
    area: "0.8 ha",
    plantingDate: "10 Abr 2024",
    expectedHarvest: "25 Jun 2024",
    stage: "Crescimento",
    health: "Bom",
    temperature: "22°C",
    humidity: "80%",
    soilMoisture: "68%",
    productivity: "85%",
    waterUsage: "650L hoje"
  }
]

const getHealthColor = (health: string) => {
  switch (health) {
    case "Excelente": return "bg-green-100 text-green-800"
    case "Bom": return "bg-blue-100 text-blue-800"
    case "Regular": return "bg-yellow-100 text-yellow-800"
    case "Ruim": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const Crops = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Plantações</h1>
                <p className="text-sm text-muted-foreground">Monitoramento individual de cada cultura</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {cropsData.map((crop) => (
                <Card key={crop.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-terra-100 rounded-full flex items-center justify-center">
                          <Sprout className="w-5 h-5 text-terra-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-terra-700">{crop.name}</CardTitle>
                          <CardDescription>Área: {crop.area}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getHealthColor(crop.health)}>
                        {crop.health}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Plantio:</span>
                          <span className="font-medium">{crop.plantingDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Colheita:</span>
                          <span className="font-medium">{crop.expectedHarvest}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Estágio:</span>
                          <span className="font-medium">{crop.stage}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium">{crop.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-muted-foreground">Umidade:</span>
                          <span className="font-medium">{crop.humidity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Droplets className="w-4 h-4 text-terra-500" />
                          <span className="text-muted-foreground">Solo:</span>
                          <span className="font-medium">{crop.soilMoisture}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Produtividade: </span>
                          <span className="font-bold text-terra-600">{crop.productivity}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Água hoje: </span>
                          <span className="font-bold text-blue-600">{crop.waterUsage}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Crops
