// app/politicos/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Politico, FiltrosPoliticos } from '@/types';
import { ServiceFactory } from '@/services';
import { PoliticoCard } from '@/components/PoliticoCard';
import { FiltrosPoliticosComponent } from '@/components/FiltrosPoliticos';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export default function PoliticosPage() {
  const [politicos, setPoliticos] = useState<Politico[]>([]);
  const [filtros, setFiltros] = useState<FiltrosPoliticos>({});
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const politicoService = ServiceFactory.getPoliticoService();

  useEffect(() => {
    const cargarPoliticos = async () => {
      setCargando(true);
      try {
        const filtrosConBusqueda = { ...filtros, busqueda };
        const politicosData = await politicoService.obtenerTodos(filtrosConBusqueda);
        setPoliticos(politicosData);
      } catch (error) {
        console.error('Error al cargar políticos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPoliticos();
  }, [filtros, busqueda]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Políticos
        </h1>
        <p className="text-gray-600">
          Explora los perfiles y estadísticas de asistencia de los políticos
        </p>
      </div>

      {/* Búsqueda */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar político..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      <FiltrosPoliticosComponent 
        filtros={filtros} 
        onFiltrosChange={setFiltros} 
      />

      {/* Resultados */}
      {cargando ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando políticos...</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-4">
            {politicos.length} políticos encontrados
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {politicos.map((politico) => (
              <PoliticoCard key={politico.id} politico={politico} />
            ))}
          </div>
        </>
      )}

      {!cargando && politicos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron políticos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}
