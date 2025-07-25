
import { Sprout, Thermometer, Droplets, Calendar, TrendingUp, Menu, ChevronRight, Zap, Leaf, MoreVertical, Edit, Trash2, X } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [editingCrop, setEditingCrop] = useState<any | null>(null)
  const [cropsList, setCropsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const isMobile = useIsMobile()

  // Buscar plantações do banco de dados
  useEffect(() => {
    fetchCrops()
  }, [])

  const fetchCrops = async () => {
    try {
      const { data, error } = await supabase
        .from('plantacoes')
        .select('*')
        .order('nome', { ascending: true })

      if (error) {
        console.error('Erro ao buscar plantações:', error)
        // Se der erro, usar dados fictícios
        setCropsList(cropsData)
      } else {
        // Mapear dados do banco para o formato da interface
        const mappedCrops = data.map(crop => ({
          id: crop.id,
          name: crop.nome || 'Sem nome',
          area: crop.area || 'N/A',
          plantingDate: crop.plantio || 'N/A',
          expectedHarvest: crop.colheita || 'N/A',
          stage: crop.estagio || 'Plantio',
          health: crop.status || 'Bom',
          temperature: crop.temperatura || 'N/A',
          humidity: crop.umidade || 'N/A',
          soilMoisture: crop.solo || 'N/A',
          productivity: crop.produtividade || 'N/A',
          waterUsage: crop.agua_hoje || 'N/A',
          progress: 50 // Valor padrão para progresso
        }))
        
        setCropsList(mappedCrops.length > 0 ? mappedCrops : cropsData)
      }
    } catch (error) {
      console.error('Erro ao conectar com banco:', error)
      setCropsList(cropsData)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (crop: any) => {
    setEditingCrop(crop)
    setOpenDropdown(null)
  }

  const handleDelete = async (cropId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta plantação?')) return

    try {
      // Tentar deletar do banco de dados
      const { error } = await supabase
        .from('plantacoes')
        .delete()
        .eq('id', cropId)

      if (error) {
        console.error('Erro ao deletar:', error)
        alert('Erro ao deletar plantação')
        return
      }

      // Atualizar lista local
      setCropsList(prev => prev.filter(c => c.id !== cropId))
      alert('Plantação deletada com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar:', error)
      // Se der erro, deletar apenas localmente
      setCropsList(prev => prev.filter(c => c.id !== cropId))
    }
    setOpenDropdown(null)
  }

  const handleSaveEdit = async (updatedCrop: any) => {
    setSaving(true)
    try {
      // Mapear dados para o formato do banco
      const dbData = {
        nome: updatedCrop.name,
        area: updatedCrop.area,
        plantio: updatedCrop.plantingDate,
        colheita: updatedCrop.expectedHarvest,
        estagio: updatedCrop.stage,
        status: updatedCrop.health,
        temperatura: updatedCrop.temperature,
        umidade: updatedCrop.humidity,
        solo: updatedCrop.soilMoisture,
        produtividade: updatedCrop.productivity,
        agua_hoje: updatedCrop.waterUsage,
      }

      // Atualizar no banco de dados
      const { error } = await supabase
        .from('plantacoes')
        .update(dbData)
        .eq('id', updatedCrop.id)

      if (error) {
        console.error('Erro ao salvar:', error)
        alert('Erro ao salvar alterações')
        return
      }

      // Atualizar lista local
      setCropsList(prev => prev.map(c => c.id === updatedCrop.id ? updatedCrop : c))
      setEditingCrop(null)
      alert('Plantação atualizada com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      // Se der erro, atualizar apenas localmente
      setCropsList(prev => prev.map(c => c.id === updatedCrop.id ? updatedCrop : c))
      setEditingCrop(null)
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingCrop(null)
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full" style={{background: 'linear-gradient(135deg, hsl(120 20% 98%) 0%, hsl(120 15% 95%) 100%)'}}>
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terra-600 mx-auto mb-4"></div>
              <p className="text-terra-600 font-medium">Carregando plantações...</p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{background: 'linear-gradient(135deg, hsl(120 20% 98%) 0%, hsl(120 15% 95%) 100%)'}}>
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header customizado - Otimizado para mobile */}
          <header className="h-16 sm:h-20 bg-white/80 backdrop-blur-lg border-b border-terra-200/50 flex items-center px-4 sm:px-8 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 sm:gap-6">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-xl bg-terra-100 hover:bg-terra-200 text-terra-700 transition-all duration-200 hover:scale-105"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-terra-700 to-terra-500 bg-clip-text text-transparent">
                    🌱 Plantações
                  </h1>
                  <p className="text-xs sm:text-sm text-terra-600 mt-1 hidden sm:block">Monitoramento inteligente de culturas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-terra-500 to-terra-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg">
                  <span className="hidden sm:inline">{cropsList.length} Culturas Ativas</span>
                  <span className="sm:hidden">{cropsList.length}</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Grid de plantações - Otimizado para mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {cropsList.map((crop) => (
                <div 
                  key={crop.id} 
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-terra-100/50 overflow-visible"
                >
                  {/* Fundo decorativo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-terra-100/30 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                  
                  {/* Menu de 3 pontos */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === crop.id ? null : crop.id)}
                        className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-terra-600 transition-all duration-200 hover:scale-110"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {openDropdown === crop.id && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-30">
                          <button
                            onClick={() => handleEdit(crop)}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-terra-50 hover:text-terra-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="font-medium">Editar</span>
                          </button>
                          <button
                            onClick={() => handleDelete(crop.id)}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="font-medium">Deletar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Header do card - Otimizado para mobile */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6 relative z-10 pr-8 sm:pr-12">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-terra-400 to-terra-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-xl font-bold text-terra-800 mb-1 leading-tight truncate">{crop.name}</h3>
                        <p className="text-sm sm:text-base text-terra-600 font-medium">📏 {crop.area}</p>
                      </div>
                    </div>
                    
                    {/* Badge de saúde - Responsivo */}
                    <div className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ${getHealthColor(crop.health)} whitespace-nowrap`}>
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

                  {/* Informações principais - Otimizado para mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-terra-50 rounded-lg sm:rounded-xl">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-terra-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Plantio</p>
                          <p className="text-xs sm:text-sm font-bold text-terra-800 truncate">{crop.plantingDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-terra-50 rounded-lg sm:rounded-xl">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-terra-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Colheita</p>
                          <p className="text-xs sm:text-sm font-bold text-terra-800 truncate">{crop.expectedHarvest}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg sm:rounded-xl">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Estágio</p>
                          <p className="text-xs sm:text-sm font-bold text-blue-800 truncate">{crop.stage}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg sm:rounded-xl">
                        <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Temperatura</p>
                          <p className="text-xs sm:text-sm font-bold text-red-800 truncate">{crop.temperature}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg sm:rounded-xl">
                        <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Umidade</p>
                          <p className="text-xs sm:text-sm font-bold text-blue-800 truncate">{crop.humidity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-terra-50 to-terra-100 rounded-lg sm:rounded-xl">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-terra-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Solo</p>
                          <p className="text-xs sm:text-sm font-bold text-terra-800 truncate">{crop.soilMoisture}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer com métricas - Otimizado para mobile */}
                  <div className="border-t border-terra-100 pt-3 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-terra-600 uppercase tracking-wide">Produtividade</p>
                        <p className="text-base sm:text-lg font-bold text-terra-700 truncate">{crop.productivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Água Hoje</p>
                        <p className="text-base sm:text-lg font-bold text-blue-700 truncate">{crop.waterUsage}</p>
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

        {/* Modal de Edição */}
        {editingCrop && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-terra-800">✏️ Editar Plantação</h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const updatedCrop = {
                  ...editingCrop,
                  name: formData.get('name') as string,
                  area: formData.get('area') as string,
                  plantingDate: formData.get('plantingDate') as string,
                  expectedHarvest: formData.get('expectedHarvest') as string,
                  stage: formData.get('stage') as string,
                  health: formData.get('health') as string,
                  temperature: formData.get('temperature') as string,
                  humidity: formData.get('humidity') as string,
                  soilMoisture: formData.get('soilMoisture') as string,
                  productivity: formData.get('productivity') as string,
                  waterUsage: formData.get('waterUsage') as string,
                }
                handleSaveEdit(updatedCrop)
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Nome</label>
                    <input
                      name="name"
                      defaultValue={editingCrop.name}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Área</label>
                    <input
                      name="area"
                      defaultValue={editingCrop.area}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Data de Plantio</label>
                    <input
                      name="plantingDate"
                      defaultValue={editingCrop.plantingDate}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Colheita Prevista</label>
                    <input
                      name="expectedHarvest"
                      defaultValue={editingCrop.expectedHarvest}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Estágio</label>
                    <select
                      name="stage"
                      defaultValue={editingCrop.stage}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="Plantio">Plantio</option>
                      <option value="Germinação">Germinação</option>
                      <option value="Crescimento">Crescimento</option>
                      <option value="Desenvolvimento">Desenvolvimento</option>
                      <option value="Floração">Floração</option>
                      <option value="Frutificação">Frutificação</option>
                      <option value="Maturação">Maturação</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Saúde</label>
                    <select
                      name="health"
                      defaultValue={editingCrop.health}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="Excelente">Excelente</option>
                      <option value="Bom">Bom</option>
                      <option value="Regular">Regular</option>
                      <option value="Ruim">Ruim</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Temperatura</label>
                    <input
                      name="temperature"
                      defaultValue={editingCrop.temperature}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Umidade</label>
                    <input
                      name="humidity"
                      defaultValue={editingCrop.humidity}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Umidade do Solo</label>
                    <input
                      name="soilMoisture"
                      defaultValue={editingCrop.soilMoisture}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Produtividade</label>
                    <input
                      name="productivity"
                      defaultValue={editingCrop.productivity}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-terra-700 mb-2">Consumo de Água Hoje</label>
                    <input
                      name="waterUsage"
                      defaultValue={editingCrop.waterUsage}
                      className="w-full px-4 py-3 border border-terra-200 rounded-xl focus:ring-2 focus:ring-terra-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-terra-500 to-terra-600 text-white rounded-xl hover:from-terra-600 hover:to-terra-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Overlay para fechar dropdown */}
        {openDropdown && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpenDropdown(null)}
          />
        )}
      </div>
    </SidebarProvider>
  )
}

export default Crops
