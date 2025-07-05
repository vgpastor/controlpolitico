// app/page.tsx
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ServiceFactory } from '@/services';
import { PoliticoCard } from '@/components/PoliticoCard';
import { SesionCard } from '@/components/SesionCard';
import { Users, Calendar, Building, TrendingUp, Eye, Shield, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

async function HomePage() {
  const politicoService = ServiceFactory.getPoliticoService();
  const sesionService = ServiceFactory.getSesionService();

  // Obtener datos para el dashboard
  const [politicos, sesiones] = await Promise.all([
    politicoService.obtenerTodos({ activo: true }),
    sesionService.obtenerTodas()
  ]);

  const sesionesRecientes = sesiones.slice(0, 6);
  const politicosDestacados = politicos.slice(0, 6);

  // Estadísticas generales
  const totalPoliticos = politicos.length;
  const totalSesiones = sesiones.length;
  const sesionesEsteAno = sesiones.filter(s => s.fecha.getFullYear() === 2025).length;

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-3xl"></div>
        <div className="relative glass-effect rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6 animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <span className="text-gradient">Control de Asistencia</span>
            <br />
            <span className="text-gray-900">Política</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transparencia y seguimiento de la asistencia de políticos a sesiones 
            gubernamentales en <span className="font-semibold text-purple-600">España y Europa</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link href="/politicos" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto btn-gradient text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Ver Políticos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/sesiones" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 glass-effect border-white/30 hover:bg-white/50">
                <Calendar className="w-5 h-5 mr-2" />
                Ver Sesiones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="glass-effect rounded-2xl p-6 lg:p-8 text-center card-hover">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-4">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Transparencia Total</h3>
          <p className="text-gray-600">Acceso completo a datos de asistencia y participación política</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 lg:p-8 text-center card-hover">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Datos en Tiempo Real</h3>
          <p className="text-gray-600">Información actualizada diariamente desde fuentes oficiales</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 lg:p-8 text-center card-hover">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Fuentes Verificadas</h3>
          <p className="text-gray-600">Datos oficiales de instituciones gubernamentales europeas</p>
        </div>
      </section>

      {/* Estadísticas generales */}
      <section>
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Estadísticas <span className="text-gradient">en Vivo</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Datos actualizados en tiempo real sobre la actividad política
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Card className="glass-effect border-white/30 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Políticos</CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient mb-1">{totalPoliticos}</div>
              <p className="text-xs text-gray-500">Políticos activos monitoreados</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/30 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Sesiones 2025</CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient mb-1">{sesionesEsteAno}</div>
              <p className="text-xs text-gray-500">De {totalSesiones} sesiones totales</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/30 card-hover sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Instituciones</CardTitle>
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg">
                <Building className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient mb-1">6</div>
              <p className="text-xs text-gray-500">Cámaras monitoreadas</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sesiones recientes */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Sesiones <span className="text-gradient">Recientes</span>
            </h2>
            <p className="text-gray-600">Las últimas sesiones parlamentarias registradas</p>
          </div>
          <Link href="/sesiones" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto glass-effect border-white/30 hover:bg-white/50">
              Ver todas las sesiones
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {sesionesRecientes.map((sesion, index) => (
            <div key={sesion.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <SesionCard sesion={sesion} />
            </div>
          ))}
        </div>
      </section>

      {/* Políticos destacados */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Políticos <span className="text-gradient">Destacados</span>
            </h2>
            <p className="text-gray-600">Los representantes con mayor actividad reciente</p>
          </div>
          <Link href="/politicos" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto glass-effect border-white/30 hover:bg-white/50">
              Ver todos los políticos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {politicosDestacados.map((politico, index) => (
            <div key={politico.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <PoliticoCard politico={politico} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 animate-pulse-slow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg text-gray-600">Cargando datos...</p>
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
}
