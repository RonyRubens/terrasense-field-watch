
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Satellite } from "lucide-react"

const plantationLocations = [
  {
    id: 1,
    name: "Setor A - Milho",
    coordinates: "23°32'45\"S, 46°38'10\"W",
    area: "15.5 hectares",
    altitude: "720m",
    status: "Ativa",
    lastUpdate: "há 2 minutos"
  },
  {
    id: 2,
    name: "Setor B - Soja",
    coordinates: "23°33'12\"S, 46°37'55\"W",
    area: "22.3 hectares",
    altitude: "715m",
    status: "Ativa",
    lastUpdate: "há 5 minutos"
  },
  {
    id: 3,
    name: "Setor C - Trigo",
    coordinates: "23°32'58\"S, 46°38'25\"W",
    area: "18.7 hectares",
    altitude: "725m",
    status: "Manutenção",
    lastUpdate: "há 1 hora"
  },
  {
    id: 4,
    name: "Setor D - Feijão",
    coordinates: "23°33'05\"S, 46°38'05\"W",
    area: "12.1 hectares",
    altitude: "718m",
    status: "Ativa",
    lastUpdate: "há 3 minutos"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-terra-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-terra-700 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8" />
            Localização das Plantações
          </h1>
          <p className="text-terra-600 text-lg">
            Monitoramento geográfico e coordenadas dos setores agrícolas
          </p>
        </div>

        {/* Mapa Visual */}
        <Card className="bg-white/80 backdrop-blur-sm border-terra-200">
          <CardHeader>
            <CardTitle className="text-terra-700 flex items-center gap-2">
              <Satellite className="w-5 h-5" />
              Mapa Interativo da Propriedade
            </CardTitle>
            <CardDescription>
              Visualização das coordenadas e distribuição dos setores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-dashed border-terra-300 overflow-hidden">
              {/* Simulação de mapa */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-terra-100 to-terra-200"></div>
              </div>
              
              {/* Pontos das plantações */}
              {plantationLocations.map((location, index) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${20 + index * 20}%`, 
                    top: `${30 + (index % 2) * 40}%` 
                  }}
                >
                  <div className={`w-6 h-6 rounded-full ${
                    location.status === "Ativa" ? "bg-green-500" :
                    location.status === "Manutenção" ? "bg-yellow-500" :
                    "bg-red-500"
                  } border-4 border-white shadow-lg animate-pulse`}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-white p-3 rounded-lg shadow-lg border text-xs whitespace-nowrap">
                      <div className="font-semibold text-terra-700 mb-1">{location.name}</div>
                      <div className="text-terra-600">{location.coordinates}</div>
                      <div className="text-terra-600">{location.area}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Rosa dos ventos */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
                <Navigation className="w-6 h-6 text-terra-600" />
                <div className="text-xs text-terra-600 mt-1 font-medium">N</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Coordenadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {plantationLocations.map((location) => (
            <Card key={location.id} className="bg-white/80 backdrop-blur-sm border-terra-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-terra-700 text-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location.name}
                  </CardTitle>
                  <Badge className={getStatusColor(location.status)}>
                    {location.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-terra-600">Coordenadas:</span>
                    <span className="text-sm text-terra-800 font-mono bg-terra-50 px-2 py-1 rounded">
                      {location.coordinates}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-terra-600">Área:</span>
                    <span className="text-sm text-terra-800 font-semibold">
                      {location.area}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-terra-600">Altitude:</span>
                    <span className="text-sm text-terra-800 font-semibold">
                      {location.altitude}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-terra-600">Última atualização:</span>
                    <span className="text-sm text-terra-500">
                      {location.lastUpdate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Gerais */}
        <Card className="bg-white/80 backdrop-blur-sm border-terra-200">
          <CardHeader>
            <CardTitle className="text-terra-700">Informações Gerais da Propriedade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-terra-700">68.6</div>
                <div className="text-sm text-terra-600">Hectares Totais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terra-700">4</div>
                <div className="text-sm text-terra-600">Setores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terra-700">720m</div>
                <div className="text-sm text-terra-600">Altitude Média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Map
