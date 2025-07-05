import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, Users, ArrowRight, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { Sesion } from '@/types';
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

interface SesionCardProps {
  sesion: Sesion;
}

export function SesionCard({ sesion }: SesionCardProps) {
  const getStatusIcon = () => {
    switch (sesion.estado) {
      case 'programada':
        return <Clock className="w-4 h-4" />;
      case 'en_curso':
        return <Play className="w-4 h-4" />;
      case 'finalizada':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelada':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Card className="glass-effect border-white/30 card-hover group overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {sesion.titulo}
          </CardTitle>
          <div className="flex items-center space-x-1 shrink-0">
            {getStatusIcon()}
            <Badge
              className={`${obtenerColorEstadoSesion(sesion.estado)} text-xs`}
              variant="outline"
            >
              {obtenerNombreEstadoSesion(sesion.estado)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="p-1.5 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-700 font-medium">{formatearFecha(sesion.fecha)}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="p-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-600">
              {formatearHora(sesion.horaInicio)} - {formatearHora(sesion.horaFin)}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="p-1.5 bg-gradient-to-r from-cyan-100 to-green-100 rounded-lg">
              <MapPin className="w-4 h-4 text-cyan-600" />
            </div>
            <span className="text-gray-600 line-clamp-1">{sesion.ubicacion}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="p-1.5 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600">{obtenerNombreCamara(sesion.camara)}</span>
          </div>
        </div>
        
        {sesion.descripcion && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {sesion.descripcion}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`${obtenerColorCamara(sesion.camara)} text-xs`}
              variant="outline"
            >
              {obtenerNombreCamara(sesion.camara)}
            </Badge>
            <Badge
              className={`${obtenerColorTipoSesion(sesion.tipo)} text-xs`}
              variant="outline"
            >
              {obtenerNombreTipoSesion(sesion.tipo)}
            </Badge>
          </div>
          
          <Link href={`/sesiones/${sesion.id}`}>
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
