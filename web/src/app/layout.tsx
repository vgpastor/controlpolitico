// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Control de Asistencia Política',
  description: 'Seguimiento de la asistencia de políticos a sesiones gubernamentales en España y Europa',
  keywords: ['política', 'transparencia', 'asistencia', 'democracia', 'España', 'Europa'],
  authors: [{ name: 'Control Político' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8b5cf6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen relative">
          {/* Background decorative elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <Navigation />
          
          <main className="relative z-10 pb-20 lg:pb-8">
            <div className="container-custom section-padding">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 glass-effect border-t border-white/20 mt-16 mb-16 lg:mb-0">
            <div className="container-custom py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-50"></div>
                      <div className="relative bg-white p-2 rounded-lg shadow-md">
                        <Image
                          src="/logo.png"
                          alt="Control Político Logo"
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gradient">Control Político</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Promoviendo la transparencia democrática a través del seguimiento 
                    de la asistencia política en España y Europa.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Enlaces rápidos</h4>
                  <div className="space-y-2">
                    <Link href="/politicos" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      Ver Políticos
                    </Link>
                    <Link href="/sesiones" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      Sesiones Recientes
                    </Link>
                    <Link href="/estadisticas" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      Estadísticas
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Información</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Datos actualizados diariamente
                    </p>
                    <p className="text-sm text-gray-600">
                      Fuentes oficiales verificadas
                    </p>
                    <p className="text-sm text-gray-600">
                      © 2025 Control Político
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
