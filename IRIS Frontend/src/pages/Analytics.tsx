import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Waves, Mountain, CloudLightning, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import IndiaMap from '@/components/IndiaMap';

const monthlyData = [
  { month: 'Jan', flood: 12, landslide: 5, cyclone: 2, earthquake: 0 },
  { month: 'Feb', flood: 8, landslide: 3, cyclone: 1, earthquake: 1 },
  { month: 'Mar', flood: 15, landslide: 7, cyclone: 3, earthquake: 0 },
  { month: 'Apr', flood: 22, landslide: 12, cyclone: 5, earthquake: 0 },
  { month: 'May', flood: 28, landslide: 15, cyclone: 8, earthquake: 1 },
  { month: 'Jun', flood: 35, landslide: 18, cyclone: 12, earthquake: 0 },
  { month: 'Jul', flood: 42, landslide: 22, cyclone: 15, earthquake: 0 },
  { month: 'Aug', flood: 38, landslide: 20, cyclone: 18, earthquake: 1 },
  { month: 'Sep', flood: 32, landslide: 16, cyclone: 14, earthquake: 0 },
  { month: 'Oct', flood: 25, landslide: 10, cyclone: 10, earthquake: 1 },
  { month: 'Nov', flood: 18, landslide: 6, cyclone: 5, earthquake: 0 },
  { month: 'Dec', flood: 10, landslide: 4, cyclone: 2, earthquake: 0 },
];

const predictionAccuracy = [
  { month: 'Jan', accuracy: 78 },
  { month: 'Feb', accuracy: 82 },
  { month: 'Mar', accuracy: 85 },
  { month: 'Apr', accuracy: 79 },
  { month: 'May', accuracy: 88 },
  { month: 'Jun', accuracy: 91 },
  { month: 'Jul', accuracy: 89 },
  { month: 'Aug', accuracy: 92 },
  { month: 'Sep', accuracy: 87 },
  { month: 'Oct', accuracy: 90 },
  { month: 'Nov', accuracy: 88 },
  { month: 'Dec', accuracy: 85 },
];

const disasterDistribution = [
  { name: 'Floods', value: 285, color: '#06b6d4' },
  { name: 'Landslides', value: 138, color: '#d97706' },
  { name: 'Cyclones', value: 95, color: '#a855f7' },
  { name: 'Earthquakes', value: 4, color: '#3b82f6' },
];

const regionData = [
  { region: 'Asia Pacific', incidents: 245, predictions: 228 },
  { region: 'South Asia', incidents: 189, predictions: 175 },
  { region: 'Americas', incidents: 124, predictions: 118 },
  { region: 'Europe', incidents: 56, predictions: 52 },
  { region: 'Africa', incidents: 78, predictions: 71 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Prediction <span className="text-gradient-primary">Analytics</span>
            </h1>
            <p className="text-muted-foreground">Historical data analysis and prediction performance metrics</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>India Map</CardTitle>
              </CardHeader>
              <CardContent>
                <IndiaMap />
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Waves className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Predictions</p>
                      <p className="text-2xl font-bold">522</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                      <p className="text-2xl font-bold">86.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Early Warnings</p>
                      <p className="text-2xl font-bold">448</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Lead Time</p>
                      <p className="text-2xl font-bold">48h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts */}
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="trends">Disaster Trends</TabsTrigger>
              <TabsTrigger value="accuracy">Prediction Accuracy</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="regions">By Region</TabsTrigger>
            </TabsList>

            <TabsContent value="trends">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Disaster Trends (2025)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="flood" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="Floods" />
                          <Area type="monotone" dataKey="landslide" stackId="1" stroke="#d97706" fill="#d97706" fillOpacity={0.6} name="Landslides" />
                          <Area type="monotone" dataKey="cyclone" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} name="Cyclones" />
                          <Area type="monotone" dataKey="earthquake" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Earthquakes" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="accuracy">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Prediction Accuracy Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={predictionAccuracy}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                            formatter={(value) => [`${value}%`, 'Accuracy']}
                          />
                          <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="distribution">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Disaster Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={disasterDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            innerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {disasterDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="regions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Incidents vs Predictions by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                          <YAxis type="category" dataKey="region" stroke="hsl(var(--muted-foreground))" width={100} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="incidents" fill="#ef4444" name="Actual Incidents" radius={[0, 4, 4, 0]} />
                          <Bar dataKey="predictions" fill="#10b981" name="Correct Predictions" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
