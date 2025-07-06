
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Info, Settings } from "lucide-react";

const ItwinViewer = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                iTwin Viewer
              </h1>
              <p className="text-gray-600">
                Visualização 3D e modelagem digital da propriedade
              </p>
            </div>

            {/* Container principal do iTwin Viewer */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building className="w-6 h-6 text-terra-600" />
                  <CardTitle>Modelo Digital da Propriedade</CardTitle>
                </div>
                <CardDescription>
                  Visualize em 3D sua propriedade com dados integrados dos sensores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      iTwin Viewer Container
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Aqui será integrado o iTwin Viewer da Bentley
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium mb-2">
                            Para integrar o iTwin Viewer:
                          </p>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Configure sua chave de API da Bentley</li>
                            <li>• Adicione o script do iTwin Viewer</li>
                            <li>• Configure o modelo 3D da propriedade</li>
                            <li>• Integre dados dos sensores ao modelo</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Painel de controles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Configurações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Modelo Ativo
                      </label>
                      <p className="text-sm text-gray-500">
                        Nenhum modelo carregado
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Visualização
                      </label>
                      <p className="text-sm text-gray-500">
                        Modo padrão
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Dados Integrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sensores</span>
                      <span className="text-sm font-medium text-green-600">Conectados</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Clima</span>
                      <span className="text-sm font-medium text-green-600">Ativo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Irrigação</span>
                      <span className="text-sm font-medium text-green-600">Monitorado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Área Total</span>
                      <span className="text-sm font-medium">-- ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Zonas</span>
                      <span className="text-sm font-medium">-- regiões</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pontos de Dados</span>
                      <span className="text-sm font-medium">-- sensores</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ItwinViewer;
