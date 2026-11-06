# Softlution! — Landing Page Corporativa de Automatización Industrial

Sitio web moderno tipo **Landing Page** de alto impacto para **Softlution!** (*Automation Solutions Factory S.A. de C.V.*), empresa especializada en automatización de procesos industriales, sistemas SCADA/HMI, control de potencia e información industrial en tiempo real.

---

## 🎨 Paleta de Colores y Concepto Visual

Diseñado para transmitir **profesionalismo, alta tecnología, robustez y confianza**:

- **Fondo Deep Navy Industrial (`#060B17`, `#0C1527`):** Proyecta solidez corporativa, estabilidad y sofisticación técnica.
- **Azul Tecnológico (`#0284C7`, `#2563EB`):** Representa ingeniería de precisión, control automático e innovación.
- **Acentos Cyan / Neón (`#00F0FF`, `#06B6D4`):** Telemetría en tiempo real, conectividad industrial y estado activo.
- **Esmeralda de Confiabilidad (`#10B981`):** Indicador de procesos seguros, operación continua y rendimiento óptimo.
- **Glassmorphism & High-Tech Grid:** Microinteracciones, gradientes sutiles y efectos de iluminación que elevan la percepción de valor frente a competidores.

---

## 🗂️ Estructura de Navegación (Mismos Menús del Sitio Original)

La landing page conserva con fidelidad la estructura de navegación del sitio actual `softlution.com.mx`, modernizada con navegación fluida (*smooth scroll*) y *scroll spy*:

1. **Bienvenido:**
   - Hero de alto impacto con propuesta de valor clara.
   - Indicadores de estado de planta en tiempo real (*live telemetry*).
   - Métricas de trayectoria (+20 años, +100 proyectos, 99.8% disponibilidad operativa).
   - Certificaciones de integrador (Rockwell Automation, Schneider Electric, CSIA, AVEVA).

2. **Quienes Somos:**
   - Historia y liderazgo de Automation Solutions Factory S.A. de C.V.
   - Misión y Visión corporativa.
   - Valores empresariales (*Honestidad, Compromiso, Dedicación, Confianza, Lealtad, Profesionalismo*).
   - Metodología de éxito en 5 pasos (desde el levantamiento hasta la satisfacción garantizada).

3. **Servicios:**
   - Filtro interactivo por categorías de ingeniería.
   - *Automatización de Procesos & PLC's* (Rockwell Allen-Bradley, Siemens, variadores, CCM).
   - *Interfaces de Operación (HMI & SCADA)* (InTouch, FactoryTalk View, supervisión distribuida).
   - *Sistemas de Productividad & Datos* (Batch ISA-88, validación CIP, ruteo, extrusión).
   - *Ingeniería Eléctrica & Tableros* (Normas NOM, NEC, NEMA).
   - *Proyectos Llave en Mano (Turnkey)* (FAT, SAT, comisionamiento y capacitación).
   - *Soporte Técnico & Modernización* (Migración de PLC-5 / SLC500 a ControlLogix).

4. **Nuestros Clientes:**
   - Sectores estratégicos: Alimentos y Bebidas, Química, Cosmética, Metalmecánica.
   - Portafolio de clientes multinacionales: **FEMSA, Grupo Modelo (AB InBev), Nestlé, Diversey, L'Oréal, Pinturas Prisa**.
   - Caso de estudio destacado: Modernización del sistema de bacheo y CIP en **Diversey-México (Planta Tlalnepantla)**.

5. **Demo (Simulador de Planta en Vivo):**
   - Réplica interactiva del sistema automático de bacheo y lavado CIP de Diversey.
   - Controles de operador: Iniciar, Pausa, Reset y selector de modos.
   - Animación gráfica de niveles en reactores, recirculación cáustica y enjuague.
   - Telemetría en vivo: flujo (L/min), temperatura (°C), conductividad (mS/cm).
   - Consola de eventos y diagnósticos PLC en tiempo real.

6. **Contacto (con módulos dedicados):**
   - **Pestaña Ventas:** Cotizaciones de proyectos, levantamientos en planta y modernizaciones.
   - **Pestaña Soporte:** Mesa de ayuda para incidencias, mantenimiento y soporte a sistemas en marcha.
   - Datos oficiales de contacto:
     - 📍 H. Ayuntamiento No. 4, Col. San Juan Xocotla, Tultepec, Edo. México, C.P. 54960 (presencia en corredor industrial Tultitlán).
     - 📞 Teléfono: (55) 5378-2110.
     - ✉️ `ventas@softlution.com.mx` / `soporte@softlution.com.mx`.
   - Mapa interactivo de ubicación geográfica.
   - Validación de formularios con confirmación instantánea (*Toast Notification*).

---

## 🛠️ Arquitectura Astro & Componentes

El proyecto fue migrado exitosamente a **[Astro](https://astro.build)** manteniendo al 100% el diseño visual, estilos CSS, paleta de colores corporativa e interacciones:

- `src/layouts/Layout.astro`: Layout base con metadatos, fuentes Google Fonts ("Plus Jakarta Sans") y contenedor principal.
- `src/components/`:
  - `BackgroundGrid.astro`: Cuadrícula tecnológica animada y orbes de iluminación ambiental.
  - `TopBar.astro`: Barra superior con estatus de planta en tiempo real y datos de contacto.
  - `Header.astro`: Encabezado sticky y menú de navegación responsivo con drawer móvil.
  - `Hero.astro`: Sección principal con telemetría en vivo y certificaciones de integradores.
  - `StatsStrip.astro`: Ticker de métricas con contadores interactivos animados.
  - `About.astro`: Historia, misión, visión, 6 valores y metodología de 5 pasos.
  - `Services.astro`: Portafolio interactivo con filtrado dinámico por categorías.
  - `Clients.astro`: Sectores clave, logotipos de clientes y caso de éxito de Diversey.
  - `ScadaDemo.astro`: Simulador SCADA en vivo con tanques reactores, tuberías y terminal PLC.
  - `Contact.astro`: Formularios conmutables de Ventas y Soporte Técnico + Google Maps.
  - `Footer.astro`: Pie de página corporativo con enlaces y normativas.
- `src/styles/styles.css`: Sistema completo de tokens de diseño, glassmorphism y responsive design.
- `src/scripts/main.js`: Lógica client-side (scrollspy, contadores, simulador SCADA, filtros, toast y formularios).

---

## 🚀 Cómo Ejecutar el Proyecto con Astro

1. **Instalar dependencias (si es necesario):**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abra `http://localhost:4321` en su navegador.

3. **Construir para producción:**
   ```bash
   npm run build
   ```
   Genera el bundle estático ultra optimizado en la carpeta `dist/`.

4. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```
