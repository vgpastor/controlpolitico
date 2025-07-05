// app/sesiones/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Sesion, FiltrosSesiones } from '@/types';
import { ServiceFactory } from '@/services';
import { SesionCard } from '@/components/SesionCard';
import { FiltrosSesionesComponent } from '@/components/FiltrosSesiones';

export default function SesionesPage() {
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [filtros, setFiltros] = useState<FiltrosSesiones>({});
  const [cargando, setCargando] = useState(true);

  const sesionService = ServiceFactory.getSesionService();

  useEffect(() => {
    const cargarSesiones = async () => {
      setCargando(true);
      try {
        const sesionesData = await sesionService.obtenerTodas(filtros);
        setSesiones(sesionesData);
      } catch (error) {
        console.error('Error al cargar sesiones:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarSesiones();
  }, [filtros]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sesiones
        </h1>
        <p className="text-gray-600">
          Explora las sesiones y debates de las diferentes cámaras
        </p>
      </div>

      {/* Filtros */}
      <FiltrosSesionesComponent 
        filtros={filtros} 
        onFiltrosChange={setFiltros} 
      />

      {/* Resultados */}
      {cargando ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando sesiones...</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-4">
            {sesiones.length} sesiones encontradas
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sesiones.map((sesion) => (
              <SesionCardWithStats key={sesion.id} sesion={sesion} />
            ))}
          </div>
        </>
      )}

      {!cargando && sesiones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron sesiones con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para cargar estadísticas
function SesionCardWithStats({ sesion }: { sesion: Sesion }) {
  return <SesionCard sesion={sesion} />;
}
