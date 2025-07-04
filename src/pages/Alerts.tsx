
import { AlertTriangle, Clock, CheckCircle, XCircle, Thermometer, Droplets, Zap } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const alertsData = [
  {
    id: 1,
    type: "critical",
    title: "Umidade Solo Crítica - Setor A",
    description: "Sensor detectou umidade abaixo de 30% no Setor A (Milho)",
    timestamp: "há 5 minutos",
    status: "active",
    icon: Droplets,
    priority: "Alta"
  },
  {
    id: 2,
    type: "warning",
    title: "Temperatura Elevada - Setor C",
    description: "Temperatura ambiente está acima de 35°C no Setor C (Tomate)",
    timestamp: "há 15 minutos",
    status: "active",
    icon: Thermometer,
    priority: "Média"
  },
  {
    id: 3,
    type: "info",
    title: "Irrigação Programada Concluída",
    description: "Sistema de irrigação do Setor B foi executado com sucesso",
    timestamp: "há 1 hora",
    status: "resolved",
    icon: CheckCircle,
    priority: "Baixa"
  },
  {
    id: 4,
    type: "critical",
    title: "Sensor Offline - Setor D",
    description: "Sensor de umidade do Setor D (Alface) não responde há 30 minutos",
    timestamp: "há 30 minutos",
    status: "active",
    icon: Zap,
    priority: "Alta"
  },
  {
    id: 5,
    type: "warning",
    title: "Bateria Baixa - Sensor #003",
    description: "Nível de bateria do sensor #003 está em 15%",
    timestamp: "há 2 horas",
    status: "acknowledged",
    icon: Zap,
    priority: "Média"
  }
]

const getAlertColor = (type: string, status: string) => {
  if (status === "resolved") return "bg-green-100 text-green-800 border-green-200"
  if (status === "acknowledged") return "bg-blue-100 text-blue-800 border-blue-200"
  
  switch (type) {
    case "critical": return "bg-red-100 text-red-800 border-red-200"
    case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "info": return "bg-blue-100 text-blue-800 border-blue-200"
    default: return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta": return "bg-red-500"
    case "Média": return "bg-yellow-500"
    case "Baixa": return "bg-green-500"
    default: return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Ativo"
    case "resolved": return "Resolvido"
    case "acknowledged": return "Reconhecido"
    default: return "Desconhecido"
  }
}

const Alerts = () => {
  const activeAlerts = alertsData.filter(alert => alert.status === "active")
  const resolvedAlerts = alertsData.filter(alert => alert.status !== "active")

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Alertas do Sistema</h1>
                <p className="text-sm text-muted-foreground">Monitoramento de alertas e notificações</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Badge className="bg-red-100 text-red-800">
                {activeAlerts.length} alertas ativos
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Resumo de Alertas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Críticos</p>
                      <p className="text-2xl font-bold text-red-700">
                        {alertsData.filter(a => a.type === "critical" && a.status === "active").length}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Avisos</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {alertsData.filter(a => a.type === "warning" && a.status === "active").length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Informativos</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {alertsData.filter(a => a.type === "info" && a.status === "active").length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Resolvidos</p>
                      <p className="text-2xl font-bold text-green-700">
                        {alertsData.filter(a => a.status === "resolved").length}
                      </p>
                    </div>
                    <XCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alertas Ativos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-terra-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertas Ativos
                </CardTitle>
                <CardDescription>
                  Alertas que requerem atenção imediata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeAlerts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>Nenhum alerta ativo no momento</p>
                  </div>
                ) : (
                  activeAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-terra-50 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAlertColor(alert.type, alert.status)}`}>
                        <alert.icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-terra-700">{alert.title}</h3>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`}></div>
                            <span className="text-xs text-muted-foreground">{alert.priority}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              Reconhecer
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              Resolver
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Histórico de Alertas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-terra-700 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Histórico Recente
                </CardTitle>
                <CardDescription>
                  Alertas resolvidos e reconhecidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resolvedAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg opacity-75">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getAlertColor(alert.type, alert.status)}`}>
                      <alert.icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-terra-700">{alert.title}</h3>
                        <Badge className={getAlertColor(alert.type, alert.status)}>
                          {getStatusText(alert.status)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Alerts
