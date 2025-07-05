import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, MapPin, Calendar, ArrowRight, CheckCircle, XCircle, Euro, Building } from 'lucide-react';
import { Politico } from '@/types';
import { obtenerNombreCamara, obtenerColorCamara, formatearFechaCorta } from '@/lib/utils';

interface PoliticoCardProps {
  politico: Politico;
}

export function PoliticoCard({ politico }: PoliticoCardProps) {
  // Obtener la posición actual (activa)
  const posicionActual = politico.carreraPolitica.find(cp => cp.activo);
  
  // Obtener todas las cámaras donde ha estado
  const camarasUnicas = [...new Set(politico.carreraPolitica.map(cp => cp.camara))];
  
  // Obtener todos los partidos donde ha estado
  const partidosUnicos = [...new Set(politico.carreraPolitica.map(cp => cp.partido))];

  return (
    <Card className="glass-effect border-white/30 card-hover group overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                {politico.avatar ? (
                  <img
                    src={politico.avatar}
                    alt={`${politico.nombre} ${politico.apellidos}`}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-gray-500" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
                {politico.nombre} {politico.apellidos}
              </CardTitle>
              {posicionActual && (
                <p className="text-sm text-gray-600 line-clamp-1 mt-1">{posicionActual.cargo}</p>
              )}
            </div>
          </div>
          {posicionActual && (
            <Badge
              className={`${obtenerColorCamara(posicionActual.camara)} shrink-0 ml-2`}
              variant="outline"
            >
              {obtenerNombreCamara(posicionActual.camara)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Partido actual */}
          {posicionActual && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="p-1.5 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">{posicionActual.partido}</span>
            </div>
          )}
          
          {/* Salario actual */}
          {posicionActual && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="p-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <Euro className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-600">
                {posicionActual.salario.toLocaleString('es-ES')}€/año
              </span>
            </div>
          )}
          
          {/* Fecha de inicio en la posición actual */}
          {posicionActual && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="p-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-600">Desde {formatearFechaCorta(posicionActual.fechaInicio)}</span>
            </div>
          )}

          {/* Historial de cámaras */}
          {camarasUnicas.length > 1 && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="p-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                <Building className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-gray-600">
                {camarasUnicas.length} cámaras
              </span>
            </div>
          )}

          {/* Historial de partidos */}
          {partidosUnicos.length > 1 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {partidosUnicos.map((partido) => (
                  <Badge 
                    key={partido} 
                    variant="secondary" 
                    className="text-xs bg-gray-100 text-gray-600"
                  >
                    {partido}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {politico.activo ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Activo</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Inactivo</span>
              </>
            )}
          </div>
          
          <Link href={`/politicos/${politico.id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-effect border-white/30 hover:bg-white/50 group/btn"
            >
              Ver detalles
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
