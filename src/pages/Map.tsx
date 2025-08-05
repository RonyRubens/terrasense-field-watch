
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MapPin, Navigation, Satellite, Filter, Search, Eye, Zap, BarChart3 } from "lucide-react"

const plantationLocations = [
  {
    id: 1,
    name: "Setor A - Milho",
    coordinates: "23°32'45\"S, 46°38'10\"W",
    area: "15.5 hectares",
    altitude: "720m",
    status: "Ativa",
    lastUpdate: "há 2 minutos",
    health: "Excelente",
    sensors: 12,
    temperature: "26°C",
    humidity: "72%",
    soilMoisture: "65%"
  },
  {
    id: 2,
    name: "Setor B - Soja",
    coordinates: "23°33'12\"S, 46°37'55\"W",
    area: "22.3 hectares",
    altitude: "715m",
    status: "Ativa",
    lastUpdate: "há 5 minutos",
    health: "Bom",
    sensors: 15,
    temperature: "24°C",
    humidity: "68%",
    soilMoisture: "58%"
  },
  {
    id: 3,
    name: "Setor C - Trigo",
    coordinates: "23°32'58\"S, 46°38'25\"W",
    area: "18.7 hectares",
    altitude: "725m",
    status: "Manutenção",
    lastUpdate: "há 1 hora",
    health: "Regular",
    sensors: 8,
    temperature: "25°C",
    humidity: "65%",
    soilMoisture: "45%"
  },
  {
    id: 4,
    name: "Setor D - Feijão",
    coordinates: "23°33'05\"S, 46°38'05\"W",
    area: "12.1 hectares",
    altitude: "718m",
    status: "Ativa",
    lastUpdate: "há 3 minutos",
    health: "Excelente",
    sensors: 10,
    temperature: "27°C",
    humidity: "75%",
    soilMoisture: "70%"
  }
]

const Map = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800 border-green-200"
      case "Manutenção":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Inativa":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Excelente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Bom":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Regular":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Ruim":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{background: 'linear-gradient(135deg, hsl(120 20% 98%) 0%, hsl(120 15% 95%) 100%)'}}>
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white/80 backdrop-blur-lg border-b border-terra-200/50 flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-terra-600 hover:text-terra-700" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-terra-700 to-terra-500 bg-clip-text text-transparent flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-terra-600" />
                    Mapa das Culturas
                  </h1>
                  <p className="text-sm text-terra-600">Localização e monitoramento dos setores agrícolas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{/* Content aqui */}

            <div className="max-w-7xl mx-auto space-y-6">
              {/* Mapa Visual Aprimorado */}
              <Card className="bg-white/90 backdrop-blur-sm border-terra-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-terra-700 flex items-center gap-2">
                        <Satellite className="w-5 h-5" />
                        Mapa Interativo da Propriedade
                      </CardTitle>
                      <CardDescription>
                        Visualização em tempo real dos setores com sensores IoT
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Vista 3D
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dados
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[500px] bg-gradient-to-br from-green-100 via-green-50 to-terra-50 rounded-xl border-2 border-terra-200 overflow-hidden shadow-inner">
                    {/* Grid de fundo */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full" style={{
                        backgroundImage: `
                          linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                      }}></div>
                    </div>
                    
                    {/* Pontos das plantações aprimorados */}
                    {plantationLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ 
                          left: `${15 + index * 20}%`, 
                          top: `${25 + (index % 2) * 35}%` 
                        }}
                      >
                        {/* Zona de influência do sensor */}
                        <div className={`absolute w-20 h-20 rounded-full border-2 border-dashed opacity-30 -top-10 -left-10 ${
                          location.status === "Ativa" ? "border-green-400 bg-green-100" :
                          location.status === "Manutenção" ? "border-yellow-400 bg-yellow-100" :
                          "border-red-400 bg-red-100"
                        }`}></div>
                        
                        {/* Ponto principal */}
                        <div className={`relative w-8 h-8 rounded-full border-4 border-white shadow-xl ${
                          location.status === "Ativa" ? "bg-green-500" :
                          location.status === "Manutenção" ? "bg-yellow-500" :
                          "bg-red-500"
                        } group-hover:scale-125 transition-transform duration-200`}>
                          <div className="absolute inset-0 rounded-full animate-ping opacity-40 bg-current"></div>
                          <div className="absolute inset-2 rounded-full bg-white/30"></div>
                        </div>
                        
                        {/* Indicador de sensores */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        
                        {/* Tooltip aprimorado */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                          <div className="bg-white p-4 rounded-xl shadow-2xl border border-terra-200 min-w-[250px]">
                            <div className="font-bold text-terra-700 mb-2 flex items-center justify-between">
                              {location.name}
                              <Badge className={getHealthColor(location.health)}>
                                {location.health}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-terra-600">
                              <div className="flex justify-between">
                                <span>Coordenadas:</span>
                                <span className="font-mono">{location.coordinates}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Área:</span>
                                <span className="font-semibold">{location.area}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Sensores:</span>
                                <span className="font-semibold">{location.sensors} ativos</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Temperatura:</span>
                                <span className="font-semibold">{location.temperature}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Umidade:</span>
                                <span className="font-semibold">{location.humidity}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Rosa dos ventos aprimorada */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
                      <div className="relative w-12 h-12">
                        <Navigation className="w-12 h-12 text-terra-600" />
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-terra-700">N</div>
                        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-xs font-bold text-terra-700">E</div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-terra-700">S</div>
                        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-xs font-bold text-terra-700">O</div>
                      </div>
                    </div>
                    
                    {/* Legenda */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
                      <div className="text-xs font-bold text-terra-700 mb-2">Status dos Setores</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-terra-600">Ativa</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-terra-600">Manutenção</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-terra-600">Inativa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Coordenadas Aprimorada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plantationLocations.map((location) => (
                  <Card key={location.id} className="bg-white/90 backdrop-blur-sm border-terra-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-terra-700 text-lg flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          {location.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(location.status)}>
                            {location.status}
                          </Badge>
                          <Badge className={getHealthColor(location.health)}>
                            {location.health}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Informações básicas */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-2 bg-terra-50 rounded-lg">
                          <span className="text-sm font-medium text-terra-600">Coordenadas:</span>
                          <span className="text-sm text-terra-800 font-mono bg-white px-2 py-1 rounded border">
                            {location.coordinates}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                            <span className="text-xs font-medium text-blue-600 uppercase">Área</span>
                            <span className="text-sm text-blue-800 font-bold">{location.area}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                            <span className="text-xs font-medium text-green-600 uppercase">Altitude</span>
                            <span className="text-sm text-green-800 font-bold">{location.altitude}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg">
                            <span className="text-xs font-medium text-red-600 uppercase">Temp</span>
                            <span className="text-sm text-red-800 font-bold">{location.temperature}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                            <span className="text-xs font-medium text-blue-600 uppercase">Umid</span>
                            <span className="text-sm text-blue-800 font-bold">{location.humidity}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-terra-50 rounded-lg">
                            <span className="text-xs font-medium text-terra-600 uppercase">Solo</span>
                            <span className="text-sm text-terra-800 font-bold">{location.soilMoisture}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="flex justify-between items-center pt-2 border-t border-terra-100">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-terra-600">{location.sensors} sensores</span>
                        </div>
                        <span className="text-xs text-terra-500">
                          Atualizado {location.lastUpdate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Informações Gerais Aprimoradas */}
              <Card className="bg-white/90 backdrop-blur-sm border-terra-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-terra-700 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas da Propriedade
                  </CardTitle>
                  <CardDescription>
                    Resumo geral dos setores e sensores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-3xl font-bold text-green-700 mb-1">68.6</div>
                      <div className="text-sm text-green-600 font-medium">Hectares Totais</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-3xl font-bold text-blue-700 mb-1">4</div>
                      <div className="text-sm text-blue-600 font-medium">Setores Ativos</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-terra-50 to-terra-100 rounded-xl">
                      <div className="text-3xl font-bold text-terra-700 mb-1">45</div>
                      <div className="text-sm text-terra-600 font-medium">Sensores IoT</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="text-3xl font-bold text-purple-700 mb-1">720m</div>
                      <div className="text-sm text-purple-600 font-medium">Altitude Média</div>
                    </div>
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

export default Map
