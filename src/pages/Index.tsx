import { Leaf, ArrowRight, Droplets, TrendingUp, Shield, BarChart3, Smartphone, MapPin, Users, Zap, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import farmImage from "@/assets/farm-3d-view.png"

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

  const benefits = [
    {
      icon: Eye,
      title: "Visão Completa",
      description: "Visualização 3D da sua propriedade com dados em tempo real"
    },
    {
      icon: Zap,
      title: "Energia Limpa",
      description: "Sistema alimentado por painéis solares sustentáveis"
    },
    {
      icon: Users,
      title: "Fácil de Usar",
      description: "Interface intuitiva para produtores de todos os níveis"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-green-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                TerraSense
              </h1>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link to="/crops">
                Acessar Sistema
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Title and Description */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-6">
              TerraSense
            </h1>
            <p className="text-xl md:text-2xl text-green-700 font-medium mb-4">
              Energia Limpa e Tecnologia para sua plantação
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6">
              Monitore suas plantações com inteligência
            </h2>
            <p className="text-lg text-green-700 max-w-3xl mx-auto mb-8">
              Sistema completo de monitoramento agrícola com sensores IoT, 
              análise de dados em tempo real e alertas inteligentes para 
              maximizar sua produtividade.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link to="/crops" className="group">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Main Farm Image */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="w-full h-[600px] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                {/* 3D Farm Illustration */}
                <div className="relative w-full h-full max-w-4xl mx-auto p-8">
                  {/* Campo de plantação */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-40 bg-amber-700 rounded-lg shadow-xl">
                    <div className="absolute inset-2 bg-amber-600 rounded grid grid-cols-8 gap-1 p-2">
                      {[...Array(32)].map((_, i) => (
                        <div key={i} className="bg-green-500 rounded-sm h-3"></div>
                      ))}
                    </div>
                    
                    {/* Sensores IoT */}
                    <div className="absolute -top-2 left-8 w-3 h-6 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -top-2 right-8 w-3 h-6 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                  </div>
                  
                  {/* Casa da fazenda */}
                  <div className="absolute bottom-28 left-16 w-16 h-12 bg-amber-800 rounded shadow-lg">
                    <div className="absolute -top-3 -left-1 w-18 h-6 bg-red-600 rounded-t-lg"></div>
                    <div className="absolute inset-1 flex">
                      <div className="w-4 h-4 bg-yellow-200 rounded-sm m-1"></div>
                      <div className="w-3 h-6 bg-amber-900 rounded-sm mt-3 ml-1"></div>
                    </div>
                  </div>
                  
                  {/* Painel Solar */}
                  <div className="absolute top-20 right-20 transform rotate-12">
                    <div className="w-24 h-16 bg-slate-800 rounded shadow-xl relative">
                      <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="bg-blue-900 rounded-sm"></div>
                        ))}
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="w-2 h-20 bg-gray-600 mx-auto"></div>
                  </div>
                  
                  {/* Torre de comunicação */}
                  <div className="absolute bottom-32 right-24">
                    <div className="w-8 h-16 bg-gray-300 rounded shadow-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="w-1 h-12 bg-gray-400 mx-auto"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Ondas de conectividade */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 border-2 border-white/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-8 border border-white/50 rounded-full animate-ping animation-delay-1000"></div>
                    <div className="absolute inset-16 border border-white/70 rounded-full animate-ping animation-delay-2000"></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Visualização 3D da Sua Propriedade</h3>
                <p className="text-lg opacity-90">Sensores distribuídos para monitoramento completo</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-800">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-green-600 text-center">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-green-800 text-center mb-12">
              Funcionalidades do Sistema
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.link}
                  className="group"
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                        <feature.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg text-green-800">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-green-600 text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Pronto para Revolucionar sua Agricultura?</h3>
            <p className="text-xl mb-8 opacity-90">
              Junte-se aos produtores que já estão maximizando sua produtividade com o TerraSense
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
              <Link to="/crops" className="group">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index