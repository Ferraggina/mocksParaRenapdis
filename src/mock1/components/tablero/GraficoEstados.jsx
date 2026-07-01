import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ESTADO_CONFIG } from '@shared/domain/estados.js';

const ESTADOS_GRAFICO = ['Aprobado', 'En análisis', 'A subsanar', 'Rechazado', 'Publicado', 'Ingresado'];

export default function GraficoEstados({ metricas }) {
  if (!metricas) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, color: '#D1D5DB', fontSize: 13 }}>
      Cargando...
    </div>
  );

  const data = ESTADOS_GRAFICO
    .filter((e) => (metricas[e] ?? 0) > 0)
    .map((estado) => ({
      name: ESTADO_CONFIG[estado]?.label?.replace('En ', 'Análisis').replace('A subsanar', 'Subsanar') ?? estado,
      value: metricas[estado] ?? 0,
      color: ESTADO_CONFIG[estado]?.color ?? '#ccc',
      bg: ESTADO_CONFIG[estado]?.border ?? '#eee',
    }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, alignSelf: 'flex-start' }}>
        Distribución por estado
      </div>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={1}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.bg} stroke={entry.color} strokeWidth={1.5} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} (${Math.round(value / total * 100)}%)`, '']}
              contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid #E5E7EB', padding: '4px 10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#242C4F' }}>100%</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginTop: 10, justifyContent: 'center' }}>
        {data.map((d) => (
          <span key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6B7280' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block', flexShrink: 0 }} />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}
