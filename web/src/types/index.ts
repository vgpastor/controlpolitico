// types/index.ts
export interface CarreraPolitica {
  id: string;
  politicoId: string;
  partido: string;
  camara: Camara;
  cargo: string;
  salario: number; // Salario anual en euros
  fechaInicio: Date;
  fechaFin?: Date; // Si es undefined, significa que está activo en esta posición
  activo: boolean;
}

export interface Politico {
  id: string;
  nombre: string;
  apellidos: string;
  avatar?: string;
  fechaNacimiento?: Date;
  carreraPolitica: CarreraPolitica[]; // Historial de cámaras y partidos
  activo: boolean; // Si está activo en alguna posición
}

export interface Sesion {
  id: string;
  titulo: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  camara: Camara;
  tipo: TipoSesion;
  descripcion?: string;
  ubicacion: string;
  estado: EstadoSesion;
}

export interface Asistencia {
  id: string;
  politicoId: string;
  sesionId: string;
  asistio: boolean;
  justificacion?: string;
  horaLlegada?: string;
  horaSalida?: string;
}

export interface EstadisticasAsistencia {
  politicoId: string;
  totalSesiones: number;
  sesionesAsistidas: number;
  porcentajeAsistencia: number;
  ultimasAsistencias: Asistencia[];
}

export enum Camara {
  CONGRESO_DIPUTADOS = 'congreso_diputados',
  SENADO = 'senado',
  PARLAMENTO_EUROPEO = 'parlamento_europeo',
  PARLAMENTO_CATALAN = 'parlamento_catalan',
  PARLAMENTO_VASCO = 'parlamento_vasco',
  ASAMBLEA_MADRID = 'asamblea_madrid'
}

export enum TipoSesion {
  PLENARIA = 'plenaria',
  COMISION = 'comision',
  EXTRAORDINARIA = 'extraordinaria',
  URGENTE = 'urgente'
}

export enum EstadoSesion {
  PROGRAMADA = 'programada',
  EN_CURSO = 'en_curso',
  FINALIZADA = 'finalizada',
  CANCELADA = 'cancelada'
}

export interface FiltrosSesiones {
  camara?: Camara;
  fechaInicio?: Date;
  fechaFin?: Date;
  tipo?: TipoSesion;
  estado?: EstadoSesion;
}

export interface FiltrosPoliticos {
  camara?: Camara;
  partido?: string;
  activo?: boolean;
  busqueda?: string;
}
