// data/mockData.ts
import { Politico, CarreraPolitica, Sesion, Asistencia, Camara, TipoSesion, EstadoSesion } from '@/types';

export const mockCarreraPolitica: CarreraPolitica[] = [
  // Pedro Sánchez - Carrera política
  {
    id: 'cp1',
    politicoId: '1',
    partido: 'PSOE',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Diputado',
    salario: 42000,
    fechaInicio: new Date('2009-04-01'),
    fechaFin: new Date('2018-05-31'),
    activo: false
  },
  {
    id: 'cp2',
    politicoId: '1',
    partido: 'PSOE',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Presidente del Gobierno',
    salario: 84960,
    fechaInicio: new Date('2018-06-01'),
    activo: true
  },
  
  // Alberto Núñez Feijóo - Carrera política
  {
    id: 'cp3',
    politicoId: '2',
    partido: 'PP',
    camara: Camara.PARLAMENTO_CATALAN,
    cargo: 'Diputado Autonómico',
    salario: 38000,
    fechaInicio: new Date('2009-06-01'),
    fechaFin: new Date('2022-03-31'),
    activo: false
  },
  {
    id: 'cp4',
    politicoId: '2',
    partido: 'PP',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Líder de la Oposición',
    salario: 42000,
    fechaInicio: new Date('2022-04-01'),
    activo: true
  },
  
  // Yolanda Díaz - Carrera política (cambio de partido)
  {
    id: 'cp5',
    politicoId: '3',
    partido: 'IU',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Diputada',
    salario: 42000,
    fechaInicio: new Date('2016-06-01'),
    fechaFin: new Date('2021-12-31'),
    activo: false
  },
  {
    id: 'cp6',
    politicoId: '3',
    partido: 'Sumar',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Vicepresidenta Segunda',
    salario: 78000,
    fechaInicio: new Date('2022-01-01'),
    activo: true
  },
  
  // Santiago Abascal - Carrera política
  {
    id: 'cp7',
    politicoId: '4',
    partido: 'PP',
    camara: Camara.PARLAMENTO_VASCO,
    cargo: 'Diputado Autonómico',
    salario: 35000,
    fechaInicio: new Date('2011-05-01'),
    fechaFin: new Date('2019-04-30'),
    activo: false
  },
  {
    id: 'cp8',
    politicoId: '4',
    partido: 'VOX',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Presidente del Grupo Parlamentario',
    salario: 42000,
    fechaInicio: new Date('2019-05-01'),
    activo: true
  },
  
  // Dolors Montserrat - Carrera política (múltiples cámaras)
  {
    id: 'cp9',
    politicoId: '5',
    partido: 'PP',
    camara: Camara.CONGRESO_DIPUTADOS,
    cargo: 'Diputada',
    salario: 42000,
    fechaInicio: new Date('2011-11-01'),
    fechaFin: new Date('2019-06-30'),
    activo: false
  },
  {
    id: 'cp10',
    politicoId: '5',
    partido: 'PP',
    camara: Camara.PARLAMENTO_EUROPEO,
    cargo: 'Eurodiputada',
    salario: 96000,
    fechaInicio: new Date('2019-07-01'),
    activo: true
  },
  
  // Ejemplo adicional - Político con carrera en múltiples cámaras y partidos
  {
    id: 'cp11',
    politicoId: '6',
    partido: 'PSOE',
    camara: Camara.ASAMBLEA_MADRID,
    cargo: 'Diputado Autonómico',
    salario: 40000,
    fechaInicio: new Date('2015-05-01'),
    fechaFin: new Date('2019-04-30'),
    activo: false
  },
  {
    id: 'cp12',
    politicoId: '6',
    partido: 'PSOE',
    camara: Camara.SENADO,
    cargo: 'Senador',
    salario: 42000,
    fechaInicio: new Date('2019-05-01'),
    fechaFin: new Date('2023-04-30'),
    activo: false
  },
  {
    id: 'cp13',
    politicoId: '6',
    partido: 'PSOE',
    camara: Camara.PARLAMENTO_EUROPEO,
    cargo: 'Eurodiputado',
    salario: 96000,
    fechaInicio: new Date('2023-05-01'),
    activo: true
  }
];

export const mockPoliticos: Politico[] = [
  {
    id: '1',
    nombre: 'Pedro',
    apellidos: 'Sánchez Pérez-Castejón',
    fechaNacimiento: new Date('1972-02-29'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '1'),
    activo: true
  },
  {
    id: '2',
    nombre: 'Alberto',
    apellidos: 'Núñez Feijóo',
    fechaNacimiento: new Date('1961-09-10'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '2'),
    activo: true
  },
  {
    id: '3',
    nombre: 'Yolanda',
    apellidos: 'Díaz Pérez',
    fechaNacimiento: new Date('1971-05-05'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '3'),
    activo: true
  },
  {
    id: '4',
    nombre: 'Santiago',
    apellidos: 'Abascal Conde',
    fechaNacimiento: new Date('1976-04-14'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '4'),
    activo: true
  },
  {
    id: '5',
    nombre: 'Dolors',
    apellidos: 'Montserrat Montserrat',
    fechaNacimiento: new Date('1973-07-31'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '5'),
    activo: true
  },
  {
    id: '6',
    nombre: 'María',
    apellidos: 'González López',
    fechaNacimiento: new Date('1980-03-15'),
    carreraPolitica: mockCarreraPolitica.filter(cp => cp.politicoId === '6'),
    activo: true
  }
];

export const mockSesiones: Sesion[] = [
  {
    id: '1',
    titulo: 'Sesión Plenaria - Debate sobre Presupuestos Generales',
    fecha: new Date('2025-06-25'),
    horaInicio: '09:00',
    horaFin: '18:00',
    camara: Camara.CONGRESO_DIPUTADOS,
    tipo: TipoSesion.PLENARIA,
    descripcion: 'Debate y votación de los Presupuestos Generales del Estado',
    ubicacion: 'Hemiciclo del Congreso',
    estado: EstadoSesion.PROGRAMADA
  },
  {
    id: '2',
    titulo: 'Comisión de Hacienda',
    fecha: new Date('2025-06-22'),
    horaInicio: '10:00',
    horaFin: '13:00',
    camara: Camara.CONGRESO_DIPUTADOS,
    tipo: TipoSesion.COMISION,
    descripcion: 'Análisis de las cuentas públicas',
    ubicacion: 'Sala de Comisiones',
    estado: EstadoSesion.FINALIZADA
  },
  {
    id: '3',
    titulo: 'Sesión Extraordinaria - Inmigración',
    fecha: new Date('2025-06-20'),
    horaInicio: '16:00',
    horaFin: '20:00',
    camara: Camara.CONGRESO_DIPUTADOS,
    tipo: TipoSesion.EXTRAORDINARIA,
    descripcion: 'Debate sobre políticas de inmigración',
    ubicacion: 'Hemiciclo del Congreso',
    estado: EstadoSesion.EN_CURSO
  },
  {
    id: '4',
    titulo: 'Pleno del Parlamento Europeo',
    fecha: new Date('2025-06-18'),
    horaInicio: '09:00',
    horaFin: '17:00',
    camara: Camara.PARLAMENTO_EUROPEO,
    tipo: TipoSesion.PLENARIA,
    descripcion: 'Sesión plenaria del PE',
    ubicacion: 'Estrasburgo',
    estado: EstadoSesion.FINALIZADA
  },
  {
    id: '5',
    titulo: 'Control al Gobierno',
    fecha: new Date('2025-06-15'),
    horaInicio: '09:00',
    horaFin: '14:00',
    camara: Camara.CONGRESO_DIPUTADOS,
    tipo: TipoSesion.PLENARIA,
    descripcion: 'Sesión de control al Gobierno',
    ubicacion: 'Hemiciclo del Congreso',
    estado: EstadoSesion.FINALIZADA
  }
];

export const mockAsistencias: Asistencia[] = [
  // Pedro Sánchez
  { id: '1', politicoId: '1', sesionId: '1', asistio: true },
  { id: '2', politicoId: '1', sesionId: '2', asistio: false, justificacion: 'Agenda oficial' },
  { id: '3', politicoId: '1', sesionId: '3', asistio: true },
  { id: '4', politicoId: '1', sesionId: '5', asistio: true },
  
  // Alberto Núñez Feijóo
  { id: '5', politicoId: '2', sesionId: '1', asistio: true },
  { id: '6', politicoId: '2', sesionId: '2', asistio: true },
  { id: '7', politicoId: '2', sesionId: '3', asistio: true },
  { id: '8', politicoId: '2', sesionId: '5', asistio: true },
  
  // Yolanda Díaz
  { id: '9', politicoId: '3', sesionId: '1', asistio: true },
  { id: '10', politicoId: '3', sesionId: '2', asistio: true },
  { id: '11', politicoId: '3', sesionId: '3', asistio: false, justificacion: 'Viaje oficial' },
  { id: '12', politicoId: '3', sesionId: '5', asistio: true },
  
  // Santiago Abascal
  { id: '13', politicoId: '4', sesionId: '1', asistio: true },
  { id: '14', politicoId: '4', sesionId: '2', asistio: false },
  { id: '15', politicoId: '4', sesionId: '3', asistio: true },
  { id: '16', politicoId: '4', sesionId: '5', asistio: true },
  
  // Dolors Montserrat
  { id: '17', politicoId: '5', sesionId: '4', asistio: true }
];

export const camarasInfo = {
  [Camara.CONGRESO_DIPUTADOS]: {
    nombre: 'Congreso de los Diputados',
    descripcion: 'Cámara Baja del Parlamento Español',
    color: 'bg-blue-500'
  },
  [Camara.SENADO]: {
    nombre: 'Senado',
    descripcion: 'Cámara Alta del Parlamento Español',
    color: 'bg-red-500'
  },
  [Camara.PARLAMENTO_EUROPEO]: {
    nombre: 'Parlamento Europeo',
    descripcion: 'Institución Legislativa de la UE',
    color: 'bg-yellow-500'
  },
  [Camara.PARLAMENTO_CATALAN]: {
    nombre: 'Parlamento de Cataluña',
    descripcion: 'Parlamento Autonómico Catalán',
    color: 'bg-purple-500'
  },
  [Camara.PARLAMENTO_VASCO]: {
    nombre: 'Parlamento Vasco',
    descripcion: 'Parlamento Autonómico Vasco',
    color: 'bg-green-500'
  },
  [Camara.ASAMBLEA_MADRID]: {
    nombre: 'Asamblea de Madrid',
    descripcion: 'Parlamento Autonómico de Madrid',
    color: 'bg-indigo-500'
  }
};
