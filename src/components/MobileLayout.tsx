
import { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function MobileLayout({ children, title, description }: MobileLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className={`
          flex-1 
          ${isMobile ? 'mobile-padding' : 'p-6'} 
          ${isMobile ? 'pt-16' : ''} 
          bg-gray-50 
          mobile-scroll
          android-safe-area
        `}>
          <div className={`max-w-7xl mx-auto ${isMobile ? 'px-0' : ''}`}>
            {(title || description) && (
              <div className={`mb-6 ${isMobile ? 'mb-4' : ''}`}>
                {title && (
                  <h1 className={`
                    text-gray-900 mb-2 font-bold
                    ${isMobile ? 'mobile-header' : 'text-3xl'}
                  `}>
                    {title}
                  </h1>
                )}
                {description && (
                  <p className={`
                    text-gray-600
                    ${isMobile ? 'mobile-text' : ''}
                  `}>
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
