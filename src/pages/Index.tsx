import { Leaf, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Título Principal */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-green-800">
              TerraSense
            </h1>
            <p className="text-xl md:text-2xl text-green-700 font-medium">
              Energia Limpa e Tecnologia
              <br />
              para sua plantação
            </p>
          </div>

          {/* Ilustração Central */}
          <div className="relative py-12">
            <div className="w-80 h-80 mx-auto relative">
              {/* Base da plantação */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-green-500 rounded-lg shadow-lg">
                <div className="absolute inset-2 bg-amber-600 rounded"></div>
                
                {/* Plantas */}
                <div className="absolute inset-0 flex items-end justify-center gap-6 pb-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative">
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

              {/* Painel Solar */}
              <div className="absolute top-0 right-0 transform rotate-12">
                <div className="w-20 h-14 bg-green-600 rounded shadow-lg"></div>
                <div className="w-2 h-16 bg-green-700 mx-auto"></div>
              </div>

              {/* Dispositivo de Monitoramento */}
              <div className="absolute bottom-8 right-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-lg border-2 border-green-500 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-2 h-8 bg-green-600 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="pt-8">
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