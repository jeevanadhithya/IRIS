import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

export function GyroscopeChart({ data }: { data: any[] }) {
  return (
    <div className="glass rounded-xl p-6 border border-border h-full">
      <h3 className="font-display font-semibold text-lg mb-4">Gyroscope Motion (X, Y, Z)</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" vertical={false} />
            <XAxis dataKey="time" stroke="hsl(215 20% 65%)" fontSize={12} tick={false} />
            <YAxis stroke="hsl(215 20% 65%)" fontSize={12} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222 47% 8%)',
                border: '1px solid hsl(217 33% 17%)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(215 20% 65%)' }}
            />
            <Legend />
            <Line type="monotone" dataKey="x" stroke="#ef4444" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="y" stroke="#10b981" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="z" stroke="#0ea5e9" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const responseTime = [
  { name: 'Earthquakes', time: 4.2 },
  { name: 'Floods', time: 6.8 },
  { name: 'Hurricanes', time: 8.5 },
  { name: 'Wildfires', time: 5.3 },
];

const resourceAllocation = [
  { name: 'Emergency Response', value: 35 },
  { name: 'Medical Aid', value: 25 },
  { name: 'Shelter', value: 20 },
  { name: 'Food & Water', value: 20 },
];

const COLORS = ['#0ea5e9', '#f59e0b', '#ef4444', '#10b981'];

interface SensorChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color: string;
  yDomain?: [number, number];
}

export function SensorChart({ title, data, dataKey, color, yDomain }: SensorChartProps) {
  return (
    <div className="glass rounded-xl p-6 border border-border h-full">
      <h3 className="font-display font-semibold text-lg mb-4">{title}</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" vertical={false} />
            <XAxis dataKey="time" stroke="hsl(215 20% 65%)" fontSize={12} tick={false} />
            <YAxis stroke="hsl(215 20% 65%)" fontSize={12} domain={yDomain} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222 47% 8%)',
                border: '1px solid hsl(217 33% 17%)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(215 20% 65%)' }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ResponseTimeChart() {
  return (
    <div className="glass rounded-xl p-6 border border-border">
      <h3 className="font-display font-semibold text-lg mb-4">Avg Response Time (hours)</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={responseTime} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
            <XAxis type="number" stroke="hsl(215 20% 65%)" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222 47% 8%)',
                border: '1px solid hsl(217 33% 17%)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="time" fill="hsl(199 89% 48%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ResourceAllocationChart() {
  return (
    <div className="glass rounded-xl p-6 border border-border">
      <h3 className="font-display font-semibold text-lg mb-4">Resource Allocation</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resourceAllocation}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {resourceAllocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222 47% 8%)',
                border: '1px solid hsl(217 33% 17%)',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {resourceAllocation.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
