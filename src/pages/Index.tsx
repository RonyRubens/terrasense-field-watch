import { ArrowRight, Leaf, Shield, TrendingUp, Users, CheckCircle, Play, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

const Index = () => {
  const isMobile = useIsMobile()

  const features = [
    {
      icon: Leaf,
      title: "Monitoramento Inteligente",
      description: "Acompanhe suas plantações em tempo real com sensores avançados"
    },
    {
      icon: Shield,
      title: "Alertas Preventivos",
      description: "Sistema de alertas para proteger suas culturas de problemas"
    },
    {
      icon: TrendingUp,
      title: "Análise de Produtividade",
      description: "Relatórios detalhados para otimizar sua produção agrícola"
    },
    {
      icon: Users,
      title: "Gestão Colaborativa",
      description: "Trabalhe em equipe com ferramentas de colaboração"
    }
  ]

  const benefits = [
    "Aumento de 40% na produtividade",
    "Redução de 30% no consumo de água",
    "Monitoramento 24/7 automatizado",
    "Alertas em tempo real",
    "Relatórios detalhados",
    "Interface móvel otimizada"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">TerraSense</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Field Watch</p>
              </div>
            </div>
            <Link
              to="/crops"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-colors text-sm sm:text-base"
            >
              Acessar Sistema
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Tecnologia Avançada</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Monitore suas{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    plantações
                  </span>
                  {" "}com inteligência
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Sistema completo de monitoramento agrícola com sensores IoT, 
                  análise de dados em tempo real e alertas inteligentes para 
                  maximizar sua produtividade.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/crops"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 text-lg"
                >
                  <Play className="w-5 h-5" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/analytics"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-primary text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all text-lg"
                >
                  Ver Analytics
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">1.2K+</div>
                  <div className="text-sm text-muted-foreground">Plantações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">94%</div>
                  <div className="text-sm text-muted-foreground">Eficiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoramento</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop"
                  alt="Campo agrícola"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">+15%</div>
                    <div className="text-xs text-gray-600">Produtividade</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">98%</div>
                    <div className="text-xs text-gray-600">Proteção</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Recursos Avançados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para revolucionar seu método de cultivo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-background rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop"
                alt="Tecnologia agrícola"
                className="w-full h-[300px] sm:h-[400px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl"></div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Resultados Comprovados
                </h2>
                <p className="text-lg text-muted-foreground">
                  Milhares de agricultores já transformaram suas operações com nossa plataforma
                </p>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold group"
              >
                Ver casos de sucesso
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Pronto para revolucionar sua agricultura?
            </h2>
            <p className="text-lg text-muted-foreground">
              Junte-se a milhares de agricultores que já aumentaram sua produtividade com nossa plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/crops"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 text-lg"
              >
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">TerraSense Field Watch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TerraSense. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index