// app/sesiones/[id]/page.tsx
import { notFound } from 'next/navigation';
import { ServiceFactory } from '@/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  obtenerNombreCamara, 
  obtenerColorCamara, 
  obtenerNombreTipoSesion,
  obtenerColorTipoSesion,
  obtenerNombreEstadoSesion,
  obtenerColorEstadoSesion,
  formatearFecha, 
  formatearHora 
} from '@/lib/utils';
import { Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';

interface SesionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SesionDetailPage({ params }: SesionDetailPageProps) {
  const { id } = await params;
  const sesionService = ServiceFactory.getSesionService();
  const asistenciaService = ServiceFactory.getAsistenciaService();
  const politicoService = ServiceFactory.getPoliticoService();

  const sesion = await sesionService.obtenerPorId(id);
  
  if (!sesion) {
    notFound();
  }

  const asistencias = await asistenciaService.obtenerPorSesion(id);
  
  // Obtener detalles de los políticos
  const politicosConAsistencia = await Promise.all(
    asistencias.map(async (asistencia) => {
      const politico = await politicoService.obtenerPorId(asistencia.politicoId);
      return { politico, asistencia };
    })
  );

  const asistentes = politicosConAsistencia.filter(p => p.asistencia.asistio);
  const ausentes = politicosConAsistencia.filter(p => !p.asistencia.asistio);

  return (
    <div className="space-y-6">
      {/* Header de la sesión */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {sesion.titulo}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={obtenerColorCamara(sesion.camara)}>
                  {obtenerNombreCamara(sesion.camara)}
                </Badge>
                <Badge className={obtenerColorTipoSesion(sesion.tipo)}>
                  {obtenerNombreTipoSesion(sesion.tipo)}
                </Badge>
                <Badge className={obtenerColorEstadoSesion(sesion.estado)}>
                  {obtenerNombreEstadoSesion(sesion.estado)}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{formatearFecha(sesion.fecha)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{formatearHora(sesion.horaInicio)} - {formatearHora(sesion.horaFin)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{sesion.ubicacion}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{asistentes.length} de {politicosConAsistencia.length} asistentes</span>
              </div>
            </div>
            
            {sesion.descripcion && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Descripción</span>
                </div>
                <p className="text-gray-600">{sesion.descripcion}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de asistencia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{politicosConAsistencia.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Asistentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{asistentes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Porcentaje de Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {politicosConAsistencia.length > 0 
                ? Math.round((asistentes.length / politicosConAsistencia.length) * 100)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de asistentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">
              Asistentes ({asistentes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {asistentes.map(({ politico, asistencia }) => (
                politico && (
                  <div key={asistencia.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {politico.nombre} {politico.apellidos}
                        </p>
                        <p className="text-xs text-gray-600">
                          {politico.carreraPolitica.find(c => c.activo)?.partido || 'Sin partido'}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Asistió</Badge>
                  </div>
                )
              ))}
            </div>
            {asistentes.length === 0 && (
              <p className="text-center text-gray-600 py-8">
                No hay asistentes registrados
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-red-600">
              Ausentes ({ausentes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {ausentes.map(({ politico, asistencia }) => (
                politico && (
                  <div key={asistencia.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {politico.nombre} {politico.apellidos}
                        </p>
                        <p className="text-xs text-gray-600">
                          {politico.carreraPolitica.find(c => c.activo)?.partido || 'Sin partido'}
                        </p>
                        {asistencia.justificacion && (
                          <p className="text-xs text-gray-500 italic">
                            {asistencia.justificacion}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge variant="destructive">No asistió</Badge>
                  </div>
                )
              ))}
            </div>
            {ausentes.length === 0 && (
              <p className="text-center text-gray-600 py-8">
                No hay ausentes registrados
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
