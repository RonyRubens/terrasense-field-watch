import { Leaf, ArrowRight, Droplets, TrendingUp, Shield, BarChart3, Smartphone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  const features = [
    {
      icon: Leaf,
      title: "Culturas",
      description: "Gerencie suas plantações",
      link: "/crops"
    },
    {
      icon: Droplets,
      title: "Irrigação",
      description: "Controle inteligente de água",
      link: "/irrigation"
    },
    {
      icon: Shield,
      title: "Alertas",
      description: "Monitoramento preventivo",
      link: "/alerts"
    },
    {
      icon: TrendingUp,
      title: "Sensores",
      description: "Dados em tempo real",
      link: "/sensors"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Análise de produtividade",
      link: "/analytics"
    },
    {
      icon: MapPin,
      title: "Mapa",
      description: "Visualização geográfica",
      link: "/map"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Simples */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-800">TerraSense</h1>
            </div>
            <Link
              to="/crops"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Acessar Sistema
            </Link>
          </div>
        </div>
      </header>

      {/* Seção Principal */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Título Principal */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-green-800">
              TerraSense
            </h1>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-green-700 font-medium">
                Energia Limpa e Tecnologia
                <br />
                para sua plantação
              </p>
              <div className="max-w-3xl mx-auto mt-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-3">
                  Monitore suas plantações com inteligência
                </h2>
                <p className="text-lg text-green-700">
                  Sistema completo de monitoramento agrícola com sensores IoT, 
                  análise de dados em tempo real e alertas inteligentes para 
                  maximizar sua produtividade.
                </p>
              </div>
            </div>
          </div>

          {/* Cards de Funcionalidades */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-200 hover:border-green-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-green-600">{feature.description}</p>
              </Link>
            ))}
          </div>

          {/* Ilustração Central */}
          <div className="relative py-8">
            <div className="w-80 h-80 mx-auto relative">
              {/* Base da plantação com sensores */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-green-500 rounded-lg shadow-lg">
                <div className="absolute inset-2 bg-amber-600 rounded"></div>
                
                {/* Plantas com sensores */}
                <div className="absolute inset-0 flex items-end justify-center gap-6 pb-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center relative">
                      <div className="relative">
                        {/* Sensor de umidade */}
                        <div className="w-2 h-6 bg-blue-400 rounded-full absolute -left-6 top-2"></div>
                        {/* Folhas */}
                        <div className="w-4 h-8 bg-green-400 rounded-full transform -rotate-12 absolute -left-2 -top-4"></div>
                        <div className="w-4 h-8 bg-green-400 rounded-full transform rotate-12 absolute -right-2 -top-4"></div>
                        <div className="w-5 h-10 bg-green-500 rounded-full"></div>
                      </div>
                      {/* Caule */}
                      <div className="w-1 h-12 bg-green-600"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Painel Solar com indicador */}
              <div className="absolute top-0 right-0 transform rotate-12">
                <div className="w-20 h-14 bg-green-600 rounded shadow-lg relative">
                  <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-green-500 rounded-sm"></div>
                    ))}
                  </div>
                  {/* Indicador de energia */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-2 h-16 bg-green-700 mx-auto"></div>
              </div>

              {/* Dispositivo de Monitoramento com antena */}
              <div className="absolute bottom-8 right-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-lg border-2 border-green-500 flex items-center justify-center relative">
                  <Smartphone className="w-6 h-6 text-green-600" />
                  {/* Antena */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-400"></div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                </div>
                <div className="w-2 h-8 bg-green-600 mx-auto"></div>
              </div>

              {/* Ondas de conectividade */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-2 border-green-300 rounded-full opacity-30 animate-ping"></div>
                <div className="absolute inset-4 border border-green-400 rounded-full opacity-50 animate-ping animation-delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="pt-4">
            <Link
              to="/crops"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all hover:scale-105 text-lg shadow-lg"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index