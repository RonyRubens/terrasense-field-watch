
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { time: "00:00", temperatura: 18, umidade: 75, ph: 6.2 },
  { time: "04:00", temperatura: 16, umidade: 82, ph: 6.3 },
  { time: "08:00", temperatura: 22, umidade: 68, ph: 6.1 },
  { time: "12:00", temperatura: 28, umidade: 55, ph: 6.0 },
  { time: "16:00", temperatura: 32, umidade: 48, ph: 6.2 },
  { time: "20:00", temperatura: 25, umidade: 65, ph: 6.3 },
  { time: "24:00", temperatura: 20, umidade: 78, ph: 6.2 },
]

export function MonitoringChart() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-terra-700">Monitoramento em Tempo Real</CardTitle>
        <CardDescription>
          Dados coletados nas últimas 24 horas das principais métricas ambientais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="temperatura" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Temperatura (°C)"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="umidade" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Umidade (%)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="hsl(120 60% 35%)" 
              strokeWidth={2}
              name="pH do Solo"
              dot={{ fill: 'hsl(120 60% 35%)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
