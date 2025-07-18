import { Thermometer, Droplets, Sprout, BarChart3, Sun, CloudRain } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MetricCard } from "@/components/MetricCard"
import { MonitoringChart } from "@/components/MonitoringChart"
import { FarmMap } from "@/components/FarmMap"
import { AlertsPanel } from "@/components/AlertsPanel"

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-nature">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-terra-600" />
              <div>
                <h1 className="text-xl font-bold text-terra-700">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Monitoramento em tempo real das suas plantações</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span>28°C</span>
                <CloudRain className="w-4 h-4 text-blue-500 ml-2" />
                <span>65%</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Métricas principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Temperatura Média"
                value="24°C"
                subtitle="Últimas 24 horas"
                icon={Thermometer}
                trend="up"
                trendValue="+2°C desde ontem"
                className="animate-fade-in"
              />
              <MetricCard
                title="Umidade do Solo"
                value="68%"
                subtitle="Nível adequado"
                icon={Droplets}
                trend="stable"
                trendValue="Estável"
                className="animate-fade-in"
              />
              <MetricCard
                title="Plantas Monitoradas"
                value="1,247"
                subtitle="Área total: 15.2 ha"
                icon={Sprout}
                trend="up"
                trendValue="+23 esta semana"
                className="animate-fade-in"
              />
              <MetricCard
                title="Produtividade"
                value="94%"
                subtitle="Acima da média"
                icon={BarChart3}
                trend="up"
                trendValue="+5% este mês"
                className="animate-fade-in"
              />
            </div>

            {/* Gráficos e Mapa */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MonitoringChart />
              </div>
              <div>
                <FarmMap />
              </div>
            </div>

            {/* Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AlertsPanel />
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-terra text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Status Geral</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Suas plantações estão em ótima condição. Continue o excelente trabalho!
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Sistema Operacional</span>
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-terra-700 mb-2">Próximas Ações</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Irrigação Setor B (Hoje, 16:00)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Análise de solo (Amanhã)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Colheita Setor A (5 dias)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard