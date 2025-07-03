
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "stable"
  trendValue?: string
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  className 
}: MetricCardProps) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600", 
    stable: "text-gray-600"
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-terra-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && trendValue && (
          <p className={cn("text-xs mt-1 flex items-center gap-1", trendColors[trend])}>
            {trend === "up" && "↗"}
            {trend === "down" && "↘"}
            {trend === "stable" && "→"}
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
