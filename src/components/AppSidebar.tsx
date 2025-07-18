import { useState } from "react"
import { 
  Home, 
  MapPin, 
  BarChart3, 
  Sprout, 
  Thermometer, 
  Droplets,
  AlertTriangle,
  Settings,
  Satellite,
  Building,
  PieChart
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

const items = [
  { title: "Início", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Mapa das Culturas", url: "/map", icon: MapPin },
  { title: "Análises", url: "/analytics", icon: PieChart },
  { title: "Plantações", url: "/crops", icon: Sprout },
  { title: "Sensores", url: "/sensors", icon: Satellite },
  { title: "Clima", url: "/weather", icon: Thermometer },
  { title: "Irrigação", url: "/irrigation", icon: Droplets },
  { title: "Alertas", url: "/alerts", icon: AlertTriangle },
  { title: "iTwin Viewer", url: "/itwin-viewer", icon: Building },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-terra-100 text-terra-700 font-medium border-r-2 border-terra-500" 
      : "hover:bg-terra-50 text-muted-foreground hover:text-terra-600"

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-terra-500 to-terra-600 rounded-lg flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-terra-700">TerraSense</h2>
              <p className="text-xs text-muted-foreground">Monitoramento Agrícola</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls(item.url)}>
                      <item.icon className="mr-3 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className="hover:bg-terra-50 text-muted-foreground hover:text-terra-600">
                <Settings className="mr-3 h-4 w-4" />
                {!isCollapsed && <span>Configurações</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
