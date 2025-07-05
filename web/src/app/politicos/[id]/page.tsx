// app/politicos/[id]/page.tsx
import { notFound } from 'next/navigation';
import { ServiceFactory } from '@/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AsistenciaChart } from '@/components/AsistenciaChart';
import { 
  obtenerNombreCamara, 
  obtenerColorCamara, 
  formatearFecha, 
  formatearFechaCorta 
} from '@/lib/utils';
import { User, Calendar, Building } from 'lucide-react';

interface PoliticoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PoliticoDetailPage({ params }: PoliticoDetailPageProps) {
  const { id } = await params;
  const politicoService = ServiceFactory.getPoliticoService();
  const asistenciaService = ServiceFactory.getAsistenciaService();
  const sesionService = ServiceFactory.getSesionService();

  const politico = await politicoService.obtenerPorId(id);
  
  if (!politico) {
    notFound();
  }

  // Get current active career
  const carreraActiva = politico.carreraPolitica.find(c => c.activo);

  const [estadisticas, asistencias] = await Promise.all([
    asistenciaService.obtenerEstadisticas(id),
    asistenciaService.obtenerPorPolitico(id)
  ]);

  // Obtener detalles de las sesiones
  const sesionesConDetalles = await Promise.all(
    asistencias.map(async (asistencia) => {
      const sesion = await sesionService.obtenerPorId(asistencia.sesionId);
      return { asistencia, sesion };
    })
  );

  return (
    <div className="space-y-6">
      {/* Header del político */}
      <Card>
        <CardHeader>
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {politico.nombre} {politico.apellidos}
              </h1>
              {carreraActiva && (
                <p className="text-xl text-gray-600 mb-4">{carreraActiva.cargo}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {carreraActiva && (
                  <>
                    <Badge className={obtenerColorCamara(carreraActiva.camara)}>
                      {obtenerNombreCamara(carreraActiva.camara)}
                    </Badge>
                    <Badge variant="secondary">{carreraActiva.partido}</Badge>
                  </>
                )}
                {politico.activo && (
                  <Badge variant="default">Activo</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Información Personal</h3>
              {carreraActiva && (
                <>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      En el cargo desde {formatearFecha(carreraActiva.fechaInicio)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{obtenerNombreCamara(carreraActiva.camara)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas de asistencia */}
        <div className="lg:col-span-1">
          <AsistenciaChart estadisticas={estadisticas} />
        </div>

        {/* Historial de asistencias */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Asistencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sesionesConDetalles.map(({ asistencia, sesion }) => (
                  <div 
                    key={asistencia.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {sesion?.titulo || 'Sesión no encontrada'}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {sesion && formatearFechaCorta(sesion.fecha)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={asistencia.asistio ? "default" : "destructive"}
                      >
                        {asistencia.asistio ? 'Asistió' : 'No asistió'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              {sesionesConDetalles.length === 0 && (
                <p className="text-center text-gray-600 py-8">
                  No hay registros de asistencia disponibles
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
