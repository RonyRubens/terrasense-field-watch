
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Info, Settings, AlertCircle } from "lucide-react";
import { Viewer } from "@itwin/web-viewer-react";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { useEffect, useState } from "react";

const ItwinViewer = () => {
  const [authClient, setAuthClient] = useState<BrowserAuthorizationClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Suas credenciais do iTwin
  const clientId = "spa-YfTQCa1v4vbar8vj7bCA797sl";
  const iTwinId = "684386ce-566a-49ad-a10f-2a28282e29f9";
  const iModelId = "81d04e17-8722-48e3-95fc-772163e9d2b7";

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const client = new BrowserAuthorizationClient({
          clientId: clientId,
          redirectUri: `${window.location.origin}/signin-callback`,
          scope: "imodels:read itwin-platform",
          responseType: "code",
        });

        setAuthClient(client);
        setIsInitialized(true);
      } catch (err) {
        console.error("Erro ao inicializar autenticação:", err);
        setError("Erro ao inicializar autenticação do iTwin");
      }
    };

    initializeAuth();
  }, []);

  return (
    <MobileLayout 
      title="iTwin Viewer"
      description="Visualização 3D e modelagem digital da propriedade"
    >
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
          <div className="w-full h-96 bg-gray-100 rounded-lg border overflow-hidden">
            {error ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Erro na Inicialização
                  </h3>
                  <p className="text-red-600 mb-4">{error}</p>
                </div>
              </div>
            ) : !isInitialized || !authClient ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Building className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Inicializando iTwin Viewer...
                  </h3>
                  <p className="text-gray-600">
                    Carregando visualizador 3D
                  </p>
                </div>
              </div>
            ) : (
              <Viewer
                iTwinId={iTwinId}
                iModelId={iModelId}
                authClient={authClient}
                enablePerformanceMonitors={true}
              />
            )}
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
                  iTwin ID
                </label>
                <p className="text-xs text-gray-500 font-mono">
                  {iTwinId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  iModel ID
                </label>
                <p className="text-xs text-gray-500 font-mono">
                  {iModelId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className={`text-sm font-medium ${isInitialized ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isInitialized ? 'Conectado' : 'Inicializando...'}
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
            <CardTitle className="text-lg">Visualização 3D</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tema</span>
                <span className="text-sm font-medium">Sistema</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm font-medium text-green-600">Monitorada</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Renderização</span>
                <span className="text-sm font-medium">WebGL 2.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações de ajuda */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Instruções de Uso:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use o mouse para navegar pelo modelo 3D</li>
                  <li>• Clique e arraste para rotacionar a visualização</li>
                  <li>• Use a roda do mouse para zoom in/out</li>
                  <li>• Clique com o botão direito para menu de contexto</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MobileLayout>
  );
};

export default ItwinViewer;
