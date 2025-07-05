// components/AsistenciaChart.tsx
"use client";

import { EstadisticasAsistencia } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { obtenerColorPorcentaje } from "@/lib/utils";

interface AsistenciaChartProps {
  estadisticas: EstadisticasAsistencia;
}

export function AsistenciaChart({ estadisticas }: AsistenciaChartProps) {
  const { porcentajeAsistencia, sesionesAsistidas, totalSesiones } = estadisticas;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estadísticas de Asistencia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico circular simple */}
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={obtenerColorPorcentaje(porcentajeAsistencia)}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${porcentajeAsistencia}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${obtenerColorPorcentaje(porcentajeAsistencia)}`}>
                  {porcentajeAsistencia}%
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {sesionesAsistidas}
              </div>
              <div className="text-sm text-gray-600">Asistidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {totalSesiones - sesionesAsistidas}
              </div>
              <div className="text-sm text-gray-600">Ausencias</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold">{totalSesiones}</div>
            <div className="text-sm text-gray-600">Total de sesiones</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
