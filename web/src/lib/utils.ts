// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { Camara, TipoSesion, EstadoSesion } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilidades para fechas
export const formatearFecha = (fecha: Date | string): string => {
  const fechaObj = typeof fecha === 'string' ? parseISO(fecha) : fecha;
  if (!isValid(fechaObj)) return 'Fecha inválida';
  
  return format(fechaObj, "dd 'de' MMMM 'de' yyyy", { locale: es });
};

export const formatearFechaCorta = (fecha: Date | string): string => {
  const fechaObj = typeof fecha === 'string' ? parseISO(fecha) : fecha;
  if (!isValid(fechaObj)) return 'Fecha inválida';
  
  return format(fechaObj, "dd/MM/yyyy", { locale: es });
};

export const formatearHora = (hora: string): string => {
  try {
    const [horas, minutos] = hora.split(':');
    return `${horas}:${minutos}`;
  } catch {
    return hora;
  }
};

// Utilidades para cámaras
export const obtenerNombreCamara = (camara: Camara): string => {
  const nombres = {
    [Camara.CONGRESO_DIPUTADOS]: 'Congreso de los Diputados',
    [Camara.SENADO]: 'Senado',
    [Camara.PARLAMENTO_EUROPEO]: 'Parlamento Europeo',
    [Camara.PARLAMENTO_CATALAN]: 'Parlamento de Cataluña',
    [Camara.PARLAMENTO_VASCO]: 'Parlamento Vasco',
    [Camara.ASAMBLEA_MADRID]: 'Asamblea de Madrid'
  };
  return nombres[camara] || camara;
};

export const obtenerColorCamara = (camara: Camara): string => {
  const colores = {
    [Camara.CONGRESO_DIPUTADOS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [Camara.SENADO]: 'bg-red-100 text-red-800 border-red-200',
    [Camara.PARLAMENTO_EUROPEO]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [Camara.PARLAMENTO_CATALAN]: 'bg-purple-100 text-purple-800 border-purple-200',
    [Camara.PARLAMENTO_VASCO]: 'bg-green-100 text-green-800 border-green-200',
    [Camara.ASAMBLEA_MADRID]: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };
  return colores[camara] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Utilidades para tipos de sesión
export const obtenerNombreTipoSesion = (tipo: TipoSesion): string => {
  const nombres = {
    [TipoSesion.PLENARIA]: 'Sesión Plenaria',
    [TipoSesion.COMISION]: 'Comisión',
    [TipoSesion.EXTRAORDINARIA]: 'Sesión Extraordinaria',
    [TipoSesion.URGENTE]: 'Sesión Urgente'
  };
  return nombres[tipo] || tipo;
};

export const obtenerColorTipoSesion = (tipo: TipoSesion): string => {
  const colores = {
    [TipoSesion.PLENARIA]: 'bg-blue-100 text-blue-800',
    [TipoSesion.COMISION]: 'bg-green-100 text-green-800',
    [TipoSesion.EXTRAORDINARIA]: 'bg-orange-100 text-orange-800',
    [TipoSesion.URGENTE]: 'bg-red-100 text-red-800'
  };
  return colores[tipo] || 'bg-gray-100 text-gray-800';
};

// Utilidades para estado de sesión
export const obtenerNombreEstadoSesion = (estado: EstadoSesion): string => {
  const nombres = {
    [EstadoSesion.PROGRAMADA]: 'Programada',
    [EstadoSesion.EN_CURSO]: 'En Curso',
    [EstadoSesion.FINALIZADA]: 'Finalizada',
    [EstadoSesion.CANCELADA]: 'Cancelada'
  };
  return nombres[estado] || estado;
};

export const obtenerColorEstadoSesion = (estado: EstadoSesion): string => {
  const colores = {
    [EstadoSesion.PROGRAMADA]: 'bg-blue-100 text-blue-800',
    [EstadoSesion.EN_CURSO]: 'bg-green-100 text-green-800',
    [EstadoSesion.FINALIZADA]: 'bg-gray-100 text-gray-800',
    [EstadoSesion.CANCELADA]: 'bg-red-100 text-red-800'
  };
  return colores[estado] || 'bg-gray-100 text-gray-800';
};

// Utilidades para porcentajes
export const obtenerColorPorcentaje = (porcentaje: number): string => {
  if (porcentaje >= 90) return 'text-green-600';
  if (porcentaje >= 75) return 'text-yellow-600';
  if (porcentaje >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const obtenerColorBadgePorcentaje = (porcentaje: number): string => {
  if (porcentaje >= 90) return 'bg-green-100 text-green-800';
  if (porcentaje >= 75) return 'bg-yellow-100 text-yellow-800';
  if (porcentaje >= 60) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

// Utilidades para validación
export const esEmailValido = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const esTelefonoValido = (telefono: string): boolean => {
  const regex = /^[+]?[\d\s-()]{9,}$/;
  return regex.test(telefono);
};

// Utilidades para búsqueda
export const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const coincideBusqueda = (texto: string, busqueda: string): boolean => {
  return normalizarTexto(texto).includes(normalizarTexto(busqueda));
};

// Utilidades para ordenación
export const ordenarPorFecha = <T extends { fecha: Date }>(items: T[], desc = true): T[] => {
  return [...items].sort((a, b) => {
    const resultado = a.fecha.getTime() - b.fecha.getTime();
    return desc ? -resultado : resultado;
  });
};

export const ordenarPorNombre = <T extends { nombre: string; apellidos?: string }>(
  items: T[], 
  desc = false
): T[] => {
  return [...items].sort((a, b) => {
    const nombreA = a.apellidos ? `${a.apellidos}, ${a.nombre}` : a.nombre;
    const nombreB = b.apellidos ? `${b.apellidos}, ${b.nombre}` : b.nombre;
    const resultado = nombreA.localeCompare(nombreB, 'es');
    return desc ? -resultado : resultado;
  });
};