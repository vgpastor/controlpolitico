// services/index.ts
import { 
  Politico, 
  Sesion, 
  Asistencia, 
  EstadisticasAsistencia, 
  FiltrosSesiones, 
  FiltrosPoliticos,
  Camara 
} from '@/types';
import { 
  mockPoliticos, 
  mockSesiones, 
  mockAsistencias
} from '@/data/mockData';

// Interfaces para los servicios (SOLID - Interface Segregation)
export interface IPoliticoService {
  obtenerTodos(filtros?: FiltrosPoliticos): Promise<Politico[]>;
  obtenerPorId(id: string): Promise<Politico | null>;
  obtenerPorCamara(camara: Camara): Promise<Politico[]>;
}

export interface ISesionService {
  obtenerTodas(filtros?: FiltrosSesiones): Promise<Sesion[]>;
  obtenerPorId(id: string): Promise<Sesion | null>;
  obtenerPorCamara(camara: Camara): Promise<Sesion[]>;
  obtenerPorFechas(fechaInicio: Date, fechaFin: Date): Promise<Sesion[]>;
}

export interface IAsistenciaService {
  obtenerPorPolitico(politicoId: string): Promise<Asistencia[]>;
  obtenerPorSesion(sesionId: string): Promise<Asistencia[]>;
  obtenerEstadisticas(politicoId: string): Promise<EstadisticasAsistencia>;
  calcularPorcentajeAsistencia(politicoId: string): Promise<number>;
}

// Implementaciones concretas (SOLID - Dependency Inversion)
export class PoliticoService implements IPoliticoService {
  async obtenerTodos(filtros?: FiltrosPoliticos): Promise<Politico[]> {
    let politicos = [...mockPoliticos];

    if (filtros) {
      if (filtros.camara) {
        politicos = politicos.filter(p => 
          p.carreraPolitica.some(cp => cp.camara === filtros.camara && cp.activo)
        );
      }
      if (filtros.partido) {
        politicos = politicos.filter(p => 
          p.carreraPolitica.some(cp => 
            cp.partido.toLowerCase().includes(filtros.partido!.toLowerCase()) && cp.activo
          )
        );
      }
      if (filtros.activo !== undefined) {
        politicos = politicos.filter(p => p.activo === filtros.activo);
      }
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        politicos = politicos.filter(p => 
          p.nombre.toLowerCase().includes(busqueda) ||
          p.apellidos.toLowerCase().includes(busqueda) ||
          p.carreraPolitica.some(cp => 
            cp.partido.toLowerCase().includes(busqueda) ||
            cp.cargo.toLowerCase().includes(busqueda)
          )
        );
      }
    }

    return politicos;
  }

  async obtenerPorId(id: string): Promise<Politico | null> {
    return mockPoliticos.find(p => p.id === id) || null;
  }

  async obtenerPorCamara(camara: Camara): Promise<Politico[]> {
    return mockPoliticos.filter(p => 
      p.carreraPolitica.some(cp => cp.camara === camara && cp.activo)
    );
  }
}

export class SesionService implements ISesionService {
  async obtenerTodas(filtros?: FiltrosSesiones): Promise<Sesion[]> {
    let sesiones = [...mockSesiones];

    if (filtros) {
      if (filtros.camara) {
        sesiones = sesiones.filter(s => s.camara === filtros.camara);
      }
      if (filtros.tipo) {
        sesiones = sesiones.filter(s => s.tipo === filtros.tipo);
      }
      if (filtros.estado) {
        sesiones = sesiones.filter(s => s.estado === filtros.estado);
      }
      if (filtros.fechaInicio) {
        sesiones = sesiones.filter(s => s.fecha >= filtros.fechaInicio!);
      }
      if (filtros.fechaFin) {
        sesiones = sesiones.filter(s => s.fecha <= filtros.fechaFin!);
      }
    }

    return sesiones.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  async obtenerPorId(id: string): Promise<Sesion | null> {
    return mockSesiones.find(s => s.id === id) || null;
  }

  async obtenerPorCamara(camara: Camara): Promise<Sesion[]> {
    return mockSesiones.filter(s => s.camara === camara);
  }

  async obtenerPorFechas(fechaInicio: Date, fechaFin: Date): Promise<Sesion[]> {
    return mockSesiones.filter(s => 
      s.fecha >= fechaInicio && s.fecha <= fechaFin
    );
  }
}

export class AsistenciaService implements IAsistenciaService {
  async obtenerPorPolitico(politicoId: string): Promise<Asistencia[]> {
    return mockAsistencias.filter(a => a.politicoId === politicoId);
  }

  async obtenerPorSesion(sesionId: string): Promise<Asistencia[]> {
    return mockAsistencias.filter(a => a.sesionId === sesionId);
  }

  async obtenerEstadisticas(politicoId: string): Promise<EstadisticasAsistencia> {
    const asistencias = await this.obtenerPorPolitico(politicoId);
    const totalSesiones = asistencias.length;
    const sesionesAsistidas = asistencias.filter(a => a.asistio).length;
    const porcentajeAsistencia = totalSesiones > 0 
      ? Math.round((sesionesAsistidas / totalSesiones) * 100) 
      : 0;

    return {
      politicoId,
      totalSesiones,
      sesionesAsistidas,
      porcentajeAsistencia,
      ultimasAsistencias: asistencias.slice(-5)
    };
  }

  async calcularPorcentajeAsistencia(politicoId: string): Promise<number> {
    const estadisticas = await this.obtenerEstadisticas(politicoId);
    return estadisticas.porcentajeAsistencia;
  }
}

// Factory Pattern para crear instancias de servicios
export class ServiceFactory {
  private static politicoService: IPoliticoService;
  private static sesionService: ISesionService;
  private static asistenciaService: IAsistenciaService;

  static getPoliticoService(): IPoliticoService {
    if (!this.politicoService) {
      this.politicoService = new PoliticoService();
    }
    return this.politicoService;
  }

  static getSesionService(): ISesionService {
    if (!this.sesionService) {
      this.sesionService = new SesionService();
    }
    return this.sesionService;
  }

  static getAsistenciaService(): IAsistenciaService {
    if (!this.asistenciaService) {
      this.asistenciaService = new AsistenciaService();
    }
    return this.asistenciaService;
  }
}
