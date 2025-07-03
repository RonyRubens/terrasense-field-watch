
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Droplets, Thermometer, Bug } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    icon: Droplets,
    title: "Baixa umidade do solo",
    description: "Setor B necessita irrigação",
    time: "2 horas atrás",
    severity: "Média"
  },
  {
    id: 2,
    type: "critical",
    icon: Bug,
    title: "Possível infestação detectada",
    description: "Setor D - Verificação recomendada",
    time: "30 min atrás",
    severity: "Alta"
  },
  {
    id: 3,
    type: "info",
    icon: Thermometer,
    title: "Temperatura ideal",
    description: "Condições favoráveis para crescimento",
    time: "1 hora atrás",
    severity: "Baixa"
  }
]

export function AlertsPanel() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alta": return "destructive"
      case "Média": return "secondary"
      case "Baixa": return "outline"
      default: return "outline"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "text-red-600"
      case "warning": return "text-yellow-600"
      case "info": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-terra-700 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Alertas e Notificações
        </CardTitle>
        <CardDescription>
          Últimas notificações do sistema de monitoramento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <alert.icon className={`w-5 h-5 mt-0.5 ${getTypeColor(alert.type)}`} />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <button className="text-sm text-terra-600 hover:text-terra-700 font-medium">
            Ver todos os alertas →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
