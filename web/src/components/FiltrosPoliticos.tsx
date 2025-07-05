// components/FiltrosPoliticos.tsx
"use client";

import { useState } from "react";
import { FiltrosPoliticos, Camara } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { obtenerNombreCamara } from "@/lib/utils";
import { Filter, X } from "lucide-react";

interface FiltrosPoliticosProps {
  filtros: FiltrosPoliticos;
  onFiltrosChange: (filtros: FiltrosPoliticos) => void;
}

export function FiltrosPoliticosComponent({ filtros, onFiltrosChange }: FiltrosPoliticosProps) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const handleCambioFiltro = (campo: keyof FiltrosPoliticos, valor: any) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor || undefined
    });
  };

  const limpiarFiltros = () => {
    onFiltrosChange({});
  };

  const tienesFiltrosActivos = Object.values(filtros).some(valor => valor !== undefined);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
          <div className="flex space-x-2">
            {tienesFiltrosActivos && (
              <Button variant="outline" size="sm" onClick={limpiarFiltros}>
                <X className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              {mostrarFiltros ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {mostrarFiltros && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Cámara</label>
              <Select
                value={filtros.camara || ''}
                onChange={(e) => handleCambioFiltro('camara', e.target.value)}
              >
                <option value="">Todas las cámaras</option>
                {Object.values(Camara).map((camara) => (
                  <option key={camara} value={camara}>
                    {obtenerNombreCamara(camara)}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Partido</label>
              <Select
                value={filtros.partido || ''}
                onChange={(e) => handleCambioFiltro('partido', e.target.value)}
              >
                <option value="">Todos los partidos</option>
                <option value="PSOE">PSOE</option>
                <option value="PP">PP</option>
                <option value="VOX">VOX</option>
                <option value="Sumar">Sumar</option>
                <option value="ERC">ERC</option>
                <option value="Junts">Junts</option>
                <option value="PNV">PNV</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <Select
                value={filtros.activo !== undefined ? (filtros.activo ? 'true' : 'false') : ''}
                onChange={(e) => handleCambioFiltro('activo', e.target.value === '' ? undefined : e.target.value === 'true')}
              >
                <option value="">Todos</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Select>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
