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
  Menu,
  X
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

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
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Mapa das Culturas", url: "/map", icon: MapPin },
  { title: "Análises", url: "/analytics", icon: BarChart3 },
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
  const isMobile = useIsMobile()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-terra-100 text-terra-700 font-medium border-r-2 border-terra-500" 
      : "hover:bg-terra-50 text-muted-foreground hover:text-terra-600"

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Mobile menu overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-terra-500 text-white rounded-lg shadow-lg md:hidden"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
            <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
              <div className="p-4 border-b border-border mt-16">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-terra-500 to-terra-600 rounded-lg flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-terra-700">TerraSense</h2>
                    <p className="text-xs text-muted-foreground">Monitoramento Agrícola</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Navegação Principal</p>
                  {items.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${getNavCls(item.url)}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <NavLink
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-terra-50 text-muted-foreground hover:text-terra-600"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Configurações</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop sidebar (unchanged)
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
