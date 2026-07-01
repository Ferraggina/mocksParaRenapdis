# CLAUDE.md — Mock interactivo RENAPDIS (Etapa 1)

## 0. Qué es esto y qué NO es

Estás construyendo un **prototipo interactivo de front-end** para RENAPDIS (Registro Nacional de Plataformas Digitales de Salud), un sistema del Ministerio de Salud de Argentina que reemplaza una operatoria basada en Excel.

**Esto ES:**

- Una SPA en React (Vite) con datos **mockeados**.
- Interactiva de verdad: navegación, filtros, búsqueda, paginación, pestañas y badges funcionan.
- Con la identidad visual de **Poncho** (librería de estilos del Estado argentino).

**Esto NO es:**

- No hay backend. No se consume ningún servicio real de GDE/EE/GEDO.
- No hay autenticación real (sin login, sin JWT). Como mucho, un header decorativo con un nombre de usuario fijo.
- No hay persistencia obligatoria. Todo vive en memoria. (localStorage opcional, solo si simplifica.)
- **No se crea, edita ni elimina nada.** Etapa 1 = SOLO LECTURA. No generes botones de "Nuevo", "Editar" o "Eliminar" trámites.

El objetivo es **mostrar y validar las pantallas** con un cliente del Estado, no producción.

---

## 1. Contexto de dominio (leer una vez, importa)

Empresas con plataformas de recetas médicas electrónicas tramitan su habilitación ante el Ministerio vía un **expediente GDE**. Hoy un operador sigue ese expediente a mano copiando datos a un Excel. RENAPDIS centraliza eso: consulta los expedientes, trae los datos y los muestra consolidados con un tablero de seguimiento.

En la app real, los datos vienen de servicios de GDE (EE = Expediente Electrónico, GEDO = Gestor Documental). **En este mock NO los llamamos**, pero la capa de datos los simula (ver sección 5) para que después sea fácil enchufar las APIs reales.

---

## 2. Stack

- **Vite + React** (JavaScript, no TypeScript salvo que se pida).
- **React Router** para navegación entre pantallas.
- **Poncho** para la identidad visual (ver sección 4).
- Estado local con hooks (`useState`, `useContext` si hace falta compartir). Nada de Redux para un mock.
- Sin librerías de UI pesadas (Material, Ant, etc.). Poncho + componentes propios.
- Para el gráfico del tablero: algo liviano (ej. `recharts`) o un SVG simple. No te compliques.

---

## 3. Estructura de carpetas

```
src/
├── main.jsx
├── App.jsx                  # rutas
├── routes/
│   ├── Tablero.jsx          # pantalla 1
│   └── DetalleExpediente.jsx# pantalla 2 (con tabs)
├── components/
│   ├── layout/              # Header, Breadcrumb, Layout
│   ├── tablero/             # KpiCard, GraficoEstados, FiltrosBar, TablaExpedientes
│   ├── detalle/             # TabsDetalle, TabAgenda, TabRecetario, TabHistorial
│   └── ui/                  # EstadoBadge, CampoLectura, Timeline, etc. (reutilizables)
├── services/
│   └── expedientes.service.js  # capa mock que simula GDE (ver sección 5)
├── mocks/
│   └── expedientes.mock.js     # datos semilla
├── domain/
│   ├── estados.js           # enum/const de estados + colores
│   └── tipos.js             # constantes del dominio
└── styles/
    └── ...                  # overrides sobre Poncho si hacen falta
```

Respetá **DRY / KISS / SOLID**. Componentes chicos, una responsabilidad cada uno. Un `EstadoBadge` que se use en las 3 pantallas, no tres badges distintos.

---

## 4. Identidad visual (Poncho)

Poncho es la librería oficial del Estado argentino, basada en **Bootstrap 3**. **Caveat importante:** Poncho trae componentes con jQuery (Bootstrap 3). **No uses los widgets jQuery de Poncho.** Usá:

- El **CSS de Poncho** (`poncho.min.css`) para tipografía, paleta y clases utilitarias / de grilla.
- **Componentes React propios** para toda la interactividad (tabs, filtros, tabla, etc.). No metas jQuery en el árbol de React.

Si mezclar el CSS de Bootstrap 3 trae conflictos molestos, está OK replicar la identidad con CSS propio usando estos tokens oficiales:

**Tokens visuales:**

- Tipografía: **Encode Sans** (fallback sans-serif geométrica).
- Azul institucional (header / marca): `#242C4F`
- Acento celeste argentino (botones primarios, links, activo): `#37BBED`
- Fondo general: `#F5F6F8` · Paneles/tarjetas: blanco con borde sutil y sombra suave
- Texto principal: `#2D2D2D` · Texto secundario: gris medio
- Estética sobria, institucional, **accesible** (alto contraste, WCAG, foco visible).

**Layout base:** header superior azul marino con espacio para logo ("Ministerio de Salud — RENAPDIS") y usuario operador a la derecha; debajo barra blanca con breadcrumb; contenido en grilla tipo Bootstrap con buen aire.

**Badges de estado** (un único componente `EstadoBadge`, color por estado — definí esto en `domain/estados.js`):

| Estado          | Color               |
| --------------- | ------------------- |
| Ingresado       | gris                |
| En análisis     | azul                |
| A subsanar      | ámbar/amarillo      |
| Reingresado     | celeste             |
| Aprobado        | verde               |
| Rechazado       | rojo                |
| Publicado       | teal / verde oscuro |
| Guarda temporal | gris oscuro         |

---

## 5. Capa de datos mockeada (clave para que sea swappable)

Toda la data pasa por `services/expedientes.service.js`. La UI **nunca** importa los mocks directo: siempre va por el service. Así, el día de mañana, se reemplaza la implementación del service por llamadas reales a GDE y la UI no se toca.

El service expone funciones **asíncronas** que devuelven Promises (simulá latencia con un `setTimeout` de ~300–600ms y un loading state en la UI):

```js
listarExpedientes(filtros); // -> [{ resumen para la tabla }]
obtenerExpediente(id); // -> { expediente completo }
obtenerMetricas(); // -> { totales por estado para los KPI }
```

Generá **15–25 expedientes semilla** variados (distintos estados, provincias, tipos Recetario/Repositorio, fechas) para que el tablero se vea poblado y los filtros se puedan demostrar. Datos realistas en español (CUITs con formato válido aunque ficticios, nombres de software plausibles, expedientes formato `EX-2026-XXXXXXXX-APN-MS`).

---

## 6. Modelo de datos (campos reales del relevamiento — usalos tal cual)

### Expediente / Agenda (datos institucionales de la entidad)

`responsable`, `nombreEntidad`, `cuitEntidad`, `expediente`, `estado`, `provincia`, `departamento`, `telefono`, `email`, `cuitCuilContacto`, `contacto`, `funcionEnEntidad`, `observacionFuncionOtra`, `naturalezaEntidad` (pública/privada/obra social), `referenteEsSolicitante` (bool), `referenteTecnico`.

### Recetario / Repositorio

**Administrativos:** `tipo` ("Recetario" | "Repositorio"), `responsableTramite`, `fechaIngreso`, `ultimaModificacion`, `expediente`.
**Plataforma:** `nombreSoftware`, `versionProduccion`, `modalidadPrescripcion` ("Genérico" | "Comercial" | "Ambos"), `consumeREFEPS` (bool), `urlSitio`, `estandarInteroperabilidad` ("ADESFA" | "HL7 FHIR" | "JSON no FHIR" | "Otros").
**Declaraciones juradas (a–h):** array de `{ clave, texto, valor: bool }`. Textos:

- a) Base de datos inscripta en Datos Personales
- b) Protección de datos personales
- c) Derechos del paciente
- d) Ley de recetas electrónicas o digitales
- e) La plataforma permite acceso de farmacias al repositorio
- f) Ley 25649 (libertad de prescripción y dispensa)
- g) Art. 4 Anexo Dec 98/23
- h) Compromiso de actualización de información
  **Evidencia documental:** `imagenReceta` (solo Recetario), `imagenPantallaPrescripcion` (solo Recetario), `acreditaPersoneria` (bool), `certificadoInscripcionBD` (bool), `inscripcionBD` (bool). Representar como tarjetas de documento con botón "Ver PDF" (link mock / placeholder).
  **Seguimiento:** `observaciones` (texto libre).

### Estados del trámite (parametrizar en `domain/estados.js`)

`Ingresado`, `En análisis`, `A subsanar`, `Reingresado`, `Aprobado`, `Rechazado`, `Publicado`, `Guarda temporal`.

### Historial / Movimientos (tabla de eventos del expediente)

Cada evento: `fecha`, `tipoMovimiento` ("Ingreso" | "Subsanación" | "Envío de correo" | "Habilitación de subsanación" | "Reingreso" | "Número de resolución" | "Guarda temporal"), `usuarioOrigen`, `sectorOrigen`, `usuarioDestino`, `sectorDestino`, `motivoPase`, `estadoEnEseMomento`, `numeroResolucion` (opcional).

---

## 7. Pantallas

### Pantalla 1 — Tablero (`/`)

- Fila de **KPI cards**: Total, Ingresados, En análisis, A subsanar, Aprobados, Publicados, Rechazados.
- **Gráfico** chico de distribución por estado (donut o barras).
- **Barra de filtros**: buscador por N° expediente o CUIT, select de Estado, select de Provincia, select de Responsable, botón "Limpiar filtros". Los filtros **funcionan** (filtran la tabla en vivo).
- **Tabla**: Expediente · Entidad · CUIT · Tipo · Estado (badge) · Provincia · Responsable · Última modificación · Acción ("Ver detalle"). Filas alternadas. **Paginación funcional** abajo.
- "Ver detalle" navega a la pantalla 2.

### Pantalla 2 — Detalle del expediente (`/expediente/:id`)

**Una sola pantalla con pestañas.** Encabezado fijo: N° de expediente grande + `EstadoBadge` + nombre de la entidad como subtítulo + breadcrumb ("Tablero / Expediente X").

Tabs (funcionales, cambian contenido sin recargar):

- **Agenda** — campos institucionales en modo solo lectura, agrupados en tarjetas (Entidad / Contacto / Gestión interna). Usá un componente `CampoLectura` (label arriba, valor abajo, sin inputs).
- **Recetarios / Repositorios** — datos de plataforma + checklist de declaraciones juradas (tilde verde / cruz roja) + grilla de evidencia documental (tarjetas con "Ver PDF"). Ocultá `imagenReceta` e `imagenPantallaPrescripcion` si el tipo es "Repositorio".
- **Historial** — `Timeline` vertical de movimientos, del más reciente al más antiguo, con ícono por nodo, pares origen→destino, motivo y badge de estado.

> Nota sutil en las tabs de datos: "Datos recuperados de GDE (solo lectura)".

---

## 8. Comportamiento interactivo esperado (la parte "viva")

- Navegar Tablero → Detalle → volver, con React Router.
- Filtros y búsqueda del tablero filtran en tiempo real sobre la data mock.
- Paginación real (no decorativa).
- Cambio de pestañas sin recargar.
- Estados de **loading** (skeleton o spinner) mientras el service "tarda", y estado **vacío** ("No se encontraron expedientes") cuando un filtro no da resultados.
- Badges renderizados por estado desde `domain/estados.js`.

---

## 9. Convenciones

- Nombres de dominio **en español** (es lenguaje del negocio): `Expediente`, `obtenerExpediente`, `estado`. Nombres de React/genéricos pueden ir en inglés (`onClick`, `useState`).
- Componentes pequeños y reutilizables. Si copiás y pegás un bloque, hacelo componente.
- Nada de lógica de negocio en los componentes de presentación: derivaciones y filtros, en el service o en helpers.
- Accesibilidad mínima: `alt`, labels, foco visible, contraste. Es un sitio del Estado.

---

## 10. Cómo trabajar conmigo

- Soy desarrollador (React/.NET), no necesito que me expliques sintaxis básica, pero **sí quiero entender el porqué de las decisiones de arquitectura** antes de que escribas código. Si hay una bifurcación (ej. cómo modelar las tabs, cómo estructurar el service), planteámela y la decido yo.
- Andá **módulo por módulo**, no tires todo el proyecto de una. Empezá por el scaffold + dominio + service + datos mock, mostrámelo, y seguimos.
- Si algo del requisito está ambiguo o falta info (ej. el mapeo de etiquetas de GEDO 4.5), marcámelo en vez de inventar y seguir.

---

## 11. Setup

```bash
npm create vite@latest renapdis-mock -- --template react
cd renapdis-mock
npm install react-router-dom recharts
# Poncho: vía CDN en index.html o npm i ar-poncho (ver caveat jQuery en sección 4)
npm run dev
```
