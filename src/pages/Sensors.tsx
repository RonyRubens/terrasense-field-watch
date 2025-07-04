
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Droplets, Wifi, WifiOff, Calendar, Activity } from "lucide-react";

interface Sensor {
  id: string;
  ativo: boolean;
  created_at: string;
  umidade: number | null;
  epoch: string;
}

interface Leitura {
  id: number;
  sensor_id: string;
  umidade: number | null;
  created_at: string;
  epoch: string;
}

const Sensors = () => {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [leituras, setLeituras] = useState<Leitura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensores();
    fetchLeituras();
  }, []);

  const fetchSensores = async () => {
    try {
      const { data, error } = await supabase
        .from('sensores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSensores(data || []);
    } catch (error) {
      console.error('Erro ao buscar sensores:', error);
    }
  };

  const fetchLeituras = async () => {
    try {
      const { data, error } = await supabase
        .from('leituras')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setLeituras(data || []);
    } catch (error) {
      console.error('Erro ao buscar leituras:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUltmaLeitura = (sensorId: string) => {
    return leituras.find(leitura => leitura.sensor_id === sensorId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusColor = (ativo: boolean) => {
    return ativo ? 'bg-green-500' : 'bg-red-500';
  };

  const getUmidadeColor = (umidade: number | null) => {
    if (!umidade) return 'text-gray-500';
    if (umidade < 30) return 'text-red-500';
    if (umidade < 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terra-600"></div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sensores IoT
              </h1>
              <p className="text-gray-600">
                Monitoramento em tempo real dos sensores de umidade
              </p>
            </div>

            {/* Resumo dos sensores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-terra-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total de Sensores</p>
                      <p className="text-2xl font-bold">{sensores.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Sensores Ativos</p>
                      <p className="text-2xl font-bold text-green-600">
                        {sensores.filter(s => s.ativo).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <WifiOff className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Sensores Inativos</p>
                      <p className="text-2xl font-bold text-red-600">
                        {sensores.filter(s => !s.ativo).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total de Leituras</p>
                      <p className="text-2xl font-bold">{leituras.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de sensores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensores.map((sensor) => {
                const ultimaLeitura = getUltmaLeitura(sensor.id);
                
                return (
                  <Card key={sensor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Sensor {sensor.id}
                        </CardTitle>
                        <Badge 
                          className={`${getStatusColor(sensor.ativo)} text-white`}
                        >
                          {sensor.ativo ? (
                            <><Wifi className="w-3 h-3 mr-1" /> Online</>
                          ) : (
                            <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
                          )}
                        </Badge>
                      </div>
                      <CardDescription>
                        Instalado em {formatDate(sensor.created_at)}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Umidade atual */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">Umidade</span>
                          </div>
                          <span className={`text-xl font-bold ${getUmidadeColor(sensor.umidade)}`}>
                            {sensor.umidade ? `${sensor.umidade}%` : 'N/A'}
                          </span>
                        </div>

                        {/* Última leitura */}
                        {ultimaLeitura && (
                          <div className="border-t pt-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>Última Leitura</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">Data:</span> {formatDate(ultimaLeitura.created_at)}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Umidade:</span> 
                                <span className={getUmidadeColor(ultimaLeitura.umidade)}>
                                  {ultimaLeitura.umidade ? ` ${ultimaLeitura.umidade}%` : ' N/A'}
                                </span>
                              </p>
                              {ultimaLeitura.epoch && (
                                <p className="text-xs text-gray-500">
                                  Epoch: {ultimaLeitura.epoch}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {sensores.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum sensor encontrado
                  </h3>
                  <p className="text-gray-600">
                    Ainda não há sensores cadastrados no sistema.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Sensors;
