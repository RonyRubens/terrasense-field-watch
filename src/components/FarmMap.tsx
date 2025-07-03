
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Sprout } from "lucide-react"

const farmAreas = [
  { id: 1, name: "Setor A", crop: "Milho", status: "Saudável", x: 20, y: 30 },
  { id: 2, name: "Setor B", crop: "Soja", status: "Atenção", x: 60, y: 25 },
  { id: 3, name: "Setor C", crop: "Trigo", status: "Saudável", x: 75, y: 60 },
  { id: 4, name: "Setor D", crop: "Feijão", status: "Crítico", x: 30, y: 70 },
]

export function FarmMap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saudável": return "bg-green-500"
      case "Atenção": return "bg-yellow-500"
      case "Crítico": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-terra-700 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Mapa da Propriedade
        </CardTitle>
        <CardDescription>
          Visualização das diferentes áreas de cultivo e seus status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-dashed border-terra-200 overflow-hidden">
          {/* Fundo simulando terreno */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-terra-100 to-terra-200"></div>
          </div>
          
          {/* Áreas da fazenda */}
          {farmAreas.map((area) => (
            <div
              key={area.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${area.x}%`, top: `${area.y}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(area.status)} animate-pulse-grow`}>
                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
                  <div className="font-semibold text-terra-700">{area.name}</div>
                  <div className="text-terra-600">{area.crop}</div>
                  <div className={`text-xs ${
                    area.status === "Saudável" ? "text-green-600" :
                    area.status === "Atenção" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {area.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Legenda */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-xs">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Saudável</span>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Atenção</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Crítico</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
