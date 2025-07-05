// app/estadisticas/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Politico, Camara } from '@/types';
import { ServiceFactory } from '@/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { obtenerNombreCamara, obtenerColorPorcentaje } from '@/lib/utils';
import { TrendingUp, Users, Calendar, Award, AlertTriangle } from 'lucide-react';

export default function EstadisticasPage() {
  const [estadisticas, setEstadisticas] = useState<{
    mejoresAsistencias: Array<{ politico: Politico; porcentaje: number }>;
    peoresAsistencias: Array<{ politico: Politico; porcentaje: number }>;
    estadisticasPorCamara: Array<{ camara: Camara; total: number; promedio: number }>;
    resumenGeneral: {
      totalPoliticos: number;
      totalSesiones: number;
      promedioAsistenciaGeneral: number;
    };
  } | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      setCargando(true);
      try {
        const politicoService = ServiceFactory.getPoliticoService();
        const sesionService = ServiceFactory.getSesionService();
        const asistenciaService = ServiceFactory.getAsistenciaService();

        const [politicos, sesiones] = await Promise.all([
          politicoService.obtenerTodos({ activo: true }),
          sesionService.obtenerTodas()
        ]);

        // Calcular estadísticas de asistencia para cada político
        const politicosConEstadisticas = await Promise.all(
          politicos.map(async (politico) => {
            const porcentaje = await asistenciaService.calcularPorcentajeAsistencia(politico.id);
            return { politico, porcentaje };
          })
        );

        // Mejores y peores asistencias
        const politicosOrdenados = politicosConEstadisticas.sort((a, b) => b.porcentaje - a.porcentaje);
        const mejoresAsistencias = politicosOrdenados.slice(0, 5);
        const peoresAsistencias = politicosOrdenados.slice(-5).reverse();

        // Estadísticas por cámara
        const camaras = Object.values(Camara);
        const estadisticasPorCamara = await Promise.all(
          camaras.map(async (camara) => {
            const politicosCamara = politicos.filter(p => 
              p.carreraPolitica.some(c => c.activo && c.camara === camara)
            );
            if (politicosCamara.length === 0) {
              return { camara, total: 0, promedio: 0 };
            }

            const porcentajes = await Promise.all(
              politicosCamara.map(p => asistenciaService.calcularPorcentajeAsistencia(p.id))
            );

            const promedio = porcentajes.reduce((acc, p) => acc + p, 0) / porcentajes.length;
            
            return {
              camara,
              total: politicosCamara.length,
              promedio: Math.round(promedio)
            };
          })
        );

        // Resumen general
        const promedioAsistenciaGeneral = Math.round(
          politicosConEstadisticas.reduce((acc, p) => acc + p.porcentaje, 0) / politicosConEstadisticas.length
        );

        setEstadisticas({
          mejoresAsistencias,
          peoresAsistencias,
          estadisticasPorCamara: estadisticasPorCamara.filter(e => e.total > 0),
          resumenGeneral: {
            totalPoliticos: politicos.length,
            totalSesiones: sesiones.length,
            promedioAsistenciaGeneral
          }
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarEstadisticas();
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando estadísticas...</p>
      </div>
    );
  }

  if (!estadisticas) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Error al cargar las estadísticas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Estadísticas
        </h1>
        <p className="text-gray-600">
          Análisis y métricas de asistencia política
        </p>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Políticos</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.resumenGeneral.totalPoliticos}</div>
            <p className="text-xs text-gray-500">Políticos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sesiones</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.resumenGeneral.totalSesiones}</div>
            <p className="text-xs text-gray-500">Sesiones registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${obtenerColorPorcentaje(estadisticas.resumenGeneral.promedioAsistenciaGeneral)}`}>
              {estadisticas.resumenGeneral.promedioAsistenciaGeneral}%
            </div>
            <p className="text-xs text-gray-500">Promedio general</p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas por cámara */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Estadísticas por Cámara</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {estadisticas.estadisticasPorCamara.map((stat) => (
              <div key={stat.camara} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">
                  {obtenerNombreCamara(stat.camara)}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Políticos:</span>
                    <span className="font-medium">{stat.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Asistencia promedio:</span>
                    <span className={`font-medium ${obtenerColorPorcentaje(stat.promedio)}`}>
                      {stat.promedio}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mejores y peores asistencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-600" />
              <span>Mejor Asistencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {estadisticas.mejoresAsistencias.map(({ politico, porcentaje }, index) => (
                <div key={politico.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">#{index + 1}</span>
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
                  <Badge variant="default">{porcentaje}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Menor Asistencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {estadisticas.peoresAsistencias.map(({ politico, porcentaje }, index) => (
                <div key={politico.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-red-600">#{index + 1}</span>
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
                  <Badge variant="destructive">{porcentaje}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
