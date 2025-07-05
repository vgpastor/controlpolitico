// components/FiltrosSesiones.tsx
"use client";

import { useState } from "react";
import { FiltrosSesiones, Camara, TipoSesion, EstadoSesion } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { obtenerNombreCamara, obtenerNombreTipoSesion, obtenerNombreEstadoSesion } from "@/lib/utils";
import { Filter, X } from "lucide-react";

interface FiltrosSesionesProps {
  filtros: FiltrosSesiones;
  onFiltrosChange: (filtros: FiltrosSesiones) => void;
}

export function FiltrosSesionesComponent({ filtros, onFiltrosChange }: FiltrosSesionesProps) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const handleCambioFiltro = (campo: keyof FiltrosSesiones, valor: string | Date | null | undefined) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <label className="text-sm font-medium mb-2 block">Tipo</label>
              <Select
                value={filtros.tipo || ''}
                onChange={(e) => handleCambioFiltro('tipo', e.target.value)}
              >
                <option value="">Todos los tipos</option>
                {Object.values(TipoSesion).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {obtenerNombreTipoSesion(tipo)}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <Select
                value={filtros.estado || ''}
                onChange={(e) => handleCambioFiltro('estado', e.target.value)}
              >
                <option value="">Todos los estados</option>
                {Object.values(EstadoSesion).map((estado) => (
                  <option key={estado} value={estado}>
                    {obtenerNombreEstadoSesion(estado)}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fecha inicio</label>
              <Input
                type="date"
                value={filtros.fechaInicio ? filtros.fechaInicio.toISOString().split('T')[0] : ''}
                onChange={(e) => handleCambioFiltro('fechaInicio', e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
