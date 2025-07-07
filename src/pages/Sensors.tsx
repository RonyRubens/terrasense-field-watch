import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Droplets, Wifi, WifiOff, Calendar, Activity, Plus } from "lucide-react";
import AddSensorForm from "@/components/AddSensorForm";

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
  const [showAddForm, setShowAddForm] = useState(false);

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
        .limit(100);

      if (error) throw error;
      setLeituras(data || []);
    } catch (error) {
      console.error('Erro ao buscar leituras:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSensorAdded = () => {
    fetchSensores();
    fetchLeituras();
  };

  const getUltimaLeitura = (sensorId: string) => {
    return leituras.find(leitura => leitura.sensor_id === sensorId);
  };

  const getLeiturasSensor = (sensorId: string) => {
    return leituras.filter(leitura => leitura.sensor_id === sensorId);
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

  const getSensoresAtivos = () => {
    return sensores.filter(s => s.ativo).length;
  };

  const getTotalLeituras = () => {
    return leituras.length;
  };

  const getMediaUmidade = () => {
    const leituraComUmidade = leituras.filter(l => l.umidade !== null);
    if (leituraComUmidade.length === 0) return 0;
    const soma = leituraComUmidade.reduce((acc, l) => acc + (l.umidade || 0), 0);
    return Math.round(soma / leituraComUmidade.length);
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Sensores IoT
                  </h1>
                  <p className="text-gray-600">
                    Monitoramento em tempo real dos sensores de umidade
                  </p>
                </div>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-terra-600 hover:bg-terra-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Sensor
                </Button>
              </div>
            </div>

            {/* Formulário de adicionar sensor */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <AddSensorForm 
                  onSensorAdded={handleSensorAdded}
                  onClose={() => setShowAddForm(false)}
                />
              </div>
            )}

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
                        {getSensoresAtivos()}
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
                      <p className="text-sm text-gray-600">Média de Umidade</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {getMediaUmidade()}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total de Leituras</p>
                      <p className="text-2xl font-bold">{getTotalLeituras()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de sensores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensores.map((sensor) => {
                const ultimaLeitura = getUltimaLeitura(sensor.id);
                const leiturasSensor = getLeiturasSensor(sensor.id);
                
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
                        {/* Estatísticas das leituras */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <p className="text-xs text-gray-600">Leituras</p>
                            <p className="text-lg font-bold text-blue-600">
                              {leiturasSensor.length}
                            </p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="text-xs text-gray-600">Umidade Atual</p>
                            <p className={`text-lg font-bold ${getUmidadeColor(ultimaLeitura?.umidade)}`}>
                              {ultimaLeitura?.umidade ? `${ultimaLeitura.umidade}%` : 'N/A'}
                            </p>
                          </div>
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
                                  Timestamp: {ultimaLeitura.epoch}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Histórico recente */}
                        {leiturasSensor.length > 1 && (
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Histórico Recente
                            </p>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {leiturasSensor.slice(1, 6).map((leitura) => (
                                <div key={leitura.id} className="flex justify-between text-xs">
                                  <span className="text-gray-500">
                                    {new Date(leitura.created_at).toLocaleString('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                  <span className={getUmidadeColor(leitura.umidade)}>
                                    {leitura.umidade ? `${leitura.umidade}%` : 'N/A'}
                                  </span>
                                </div>
                              ))}
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
                  <p className="text-gray-600 mb-4">
                    Ainda não há sensores cadastrados no sistema.
                  </p>
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="bg-terra-600 hover:bg-terra-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Sensor
                  </Button>
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
