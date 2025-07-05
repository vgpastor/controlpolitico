# Control de Asistencia Política

Una aplicación Next.js para monitorear y visualizar la asistencia de políticos a sesiones gubernamentales en España y Europa.

## 🚀 Características

- **Seguimiento de asistencia**: Monitoreo de la asistencia de políticos a sesiones oficiales
- **Gestión de sesiones**: Visualización de sesiones con filtros por cámara, fecha y tipo
- **Perfiles detallados**: Información completa de cada político con estadísticas de asistencia
- **Estadísticas avanzadas**: Análisis y métricas de asistencia por cámara y político
- **Arquitectura SOLID**: Código mantenible y escalable
- **Responsive Design**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Fechas**: date-fns

## 📦 Instalación

\`\`\`bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd politicos-asistencia

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
\`\`\`

## 🏗️ Estructura del Proyecto

\`\`\`
├── app/                    # Páginas y layouts (App Router)
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes base de UI
│   └── ...                # Componentes de negocio
├── data/                  # Datos mock
├── lib/                   # Utilidades y helpers
├── services/              # Servicios de datos (patrón Repository)
├── types/                 # Definiciones de TypeScript
└── ...
\`\`\`

## 🎯 Funcionalidades Principales

### 1. Dashboard Principal
- Resumen de estadísticas generales
- Sesiones recientes
- Políticos destacados

### 2. Gestión de Políticos
- Lista completa con filtros
- Perfiles individuales
- Estadísticas de asistencia

### 3. Gestión de Sesiones
- Calendario de sesiones
- Detalles y asistentes
- Filtros avanzados

### 4. Estadísticas
- Métricas por cámara
- Rankings de asistencia
- Análisis comparativo

## 🔧 Próximas Mejoras

- Integración con backend real
- Sistema de autenticación
- API REST
- Exportación de datos
- Notificaciones
- Dashboard en tiempo real

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.