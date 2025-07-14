
import { Sprout, Thermometer, Droplets, Calendar, TrendingUp, Menu, ChevronRight, Zap, Leaf } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useState } from "react"

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
    waterUsage: "1,250L hoje",
    progress: 75
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
    waterUsage: "980L hoje",
    progress: 60
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
    waterUsage: "1,450L hoje",
    progress: 85
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
    waterUsage: "650L hoje",
    progress: 45
  }
]

const getHealthColor = (health: string) => {
  switch (health) {
    case "Excelente": return "bg-gradient-to-r from-green-400 to-green-600 text-white"
    case "Bom": return "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
    case "Regular": return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
    case "Ruim": return "bg-gradient-to-r from-red-400 to-red-600 text-white"
    default: return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
  }
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return "from-green-400 to-green-600"
  if (progress >= 60) return "from-blue-400 to-blue-600"
  if (progress >= 40) return "from-yellow-400 to-yellow-600"
  return "from-red-400 to-red-600"
}

const Crops = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{background: 'linear-gradient(135deg, hsl(120 20% 98%) 0%, hsl(120 15% 95%) 100%)'}}>
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header customizado */}
          <header className="h-20 bg-white/80 backdrop-blur-lg border-b border-terra-200/50 flex items-center px-8 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-xl bg-terra-100 hover:bg-terra-200 text-terra-700 transition-all duration-200 hover:scale-105"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-terra-700 to-terra-500 bg-clip-text text-transparent">
                    🌱 Plantações
                  </h1>
                  <p className="text-sm text-terra-600 mt-1">Monitoramento inteligente de culturas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gradient-to-r from-terra-500 to-terra-600 text-white rounded-full text-sm font-medium shadow-lg">
                  {cropsData.length} Culturas Ativas
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8">
            {/* Grid de plantações */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cropsData.map((crop) => (
                <div 
                  key={crop.id} 
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-terra-100/50 overflow-hidden"
                >
                  {/* Fundo decorativo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-terra-100/30 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                  
                  {/* Header do card */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-terra-400 to-terra-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Sprout className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-terra-800 mb-1">{crop.name}</h3>
                        <p className="text-terra-600 font-medium">📏 {crop.area}</p>
                      </div>
                    </div>
                    
                    {/* Badge de saúde */}
                    <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getHealthColor(crop.health)}`}>
                      {crop.health}
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-terra-700">Progresso do Cultivo</span>
                      <span className="text-sm font-bold text-terra-800">{crop.progress}%</span>
                    </div>
                    <div className="w-full bg-terra-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getProgressColor(crop.progress)} transition-all duration-500 rounded-full relative`}
                        style={{ width: `${crop.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Informações principais */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-terra-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-terra-600" />
                        <div>
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Plantio</p>
                          <p className="text-sm font-bold text-terra-800">{crop.plantingDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-terra-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-terra-600" />
                        <div>
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Colheita</p>
                          <p className="text-sm font-bold text-terra-800">{crop.expectedHarvest}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Estágio</p>
                          <p className="text-sm font-bold text-blue-800">{crop.stage}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                        <Thermometer className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Temperatura</p>
                          <p className="text-sm font-bold text-red-800">{crop.temperature}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Umidade</p>
                          <p className="text-sm font-bold text-blue-800">{crop.humidity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-terra-50 to-terra-100 rounded-xl">
                        <Leaf className="w-5 h-5 text-terra-500" />
                        <div>
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Solo</p>
                          <p className="text-sm font-bold text-terra-800">{crop.soilMoisture}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer com métricas */}
                  <div className="border-t border-terra-100 pt-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Produtividade</p>
                        <p className="text-lg font-bold text-terra-700">{crop.productivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Água Hoje</p>
                        <p className="text-lg font-bold text-blue-700">{crop.waterUsage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-terra-500/5 to-terra-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Crops
