import { Toaster } from '@/components/ui/toaster';
import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
  params: any;
}
 
const Layout: React.FC<LayoutProps> = ({
  children,params
}) => {
  return <main>
      {children}
      <Toaster/>
  </main>
}

export default Layout;