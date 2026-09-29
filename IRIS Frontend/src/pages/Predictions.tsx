import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Waves, Mountain, CloudLightning, AlertTriangle, TrendingUp, TrendingDown, Minus, MapPin, Clock, ThermometerSun } from 'lucide-react';

const predictions = [
  {
    type: 'Flood',
    icon: Waves,
    color: 'bg-cyan-500',
    textColor: 'text-cyan-500',
    borderColor: 'border-cyan-500/30',
    probability: 72,
    trend: 'up',
    regions: [
      { name: 'Mumbai, India', probability: 85, timeframe: '24-48 hours', risk: 'High' },
      { name: 'Bangkok, Thailand', probability: 68, timeframe: '48-72 hours', risk: 'Medium' },
      { name: 'Jakarta, Indonesia', probability: 55, timeframe: '72-96 hours', risk: 'Medium' },
    ],
    factors: ['Heavy monsoon rainfall predicted', 'River levels rising', 'Saturated soil conditions'],
  },
  {
    type: 'Landslide',
    icon: Mountain,
    color: 'bg-amber-600',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-600/30',
    probability: 45,
    trend: 'stable',
    regions: [
      { name: 'Himachal Pradesh, India', probability: 62, timeframe: '24-48 hours', risk: 'High' },
      { name: 'Nepal Highlands', probability: 48, timeframe: '48-72 hours', risk: 'Medium' },
      { name: 'Peru Andes', probability: 35, timeframe: '72-96 hours', risk: 'Low' },
    ],
    factors: ['Steep terrain instability', 'Recent seismic activity', 'Deforestation effects'],
  },
  {
    type: 'Cyclone',
    icon: CloudLightning,
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    probability: 58,
    trend: 'up',
    regions: [
      { name: 'Bay of Bengal', probability: 78, timeframe: '48-72 hours', risk: 'High' },
      { name: 'Caribbean Sea', probability: 52, timeframe: '72-96 hours', risk: 'Medium' },
      { name: 'Western Pacific', probability: 44, timeframe: '96-120 hours', risk: 'Medium' },
    ],
    factors: ['Warm sea surface temperatures', 'Low wind shear conditions', 'Tropical disturbance forming'],
  },
  {
    type: 'Earthquake',
    icon: AlertTriangle,
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-600/30',
    probability: 15,
    trend: 'down',
    regions: [
      { name: 'Pacific Ring of Fire', probability: 22, timeframe: 'Monitoring', risk: 'Low' },
      { name: 'Indonesian Fault Line', probability: 18, timeframe: 'Monitoring', risk: 'Low' },
      { name: 'Himalayan Belt', probability: 12, timeframe: 'Monitoring', risk: 'Low' },
    ],
    factors: ['Minor seismic activity detected', 'Geological surveys stable', 'No significant fault movement'],
  },
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'High':
      return <Badge variant="destructive">{risk}</Badge>;
    case 'Medium':
      return <Badge variant="secondary" className="bg-orange-500/20 text-orange-500 border-orange-500/30">{risk}</Badge>;
    case 'Low':
      return <Badge variant="outline" className="text-green-500 border-green-500/30">{risk}</Badge>;
    default:
      return <Badge variant="outline">{risk}</Badge>;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-destructive" />;
    case 'down':
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const Predictions = () => {
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
              Disaster <span className="text-gradient-primary">Predictions</span>
            </h1>
            <p className="text-muted-foreground">AI-powered disaster probability forecasts based on real-time data analysis</p>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {predictions.map((prediction, index) => {
              const Icon = prediction.icon;
              return (
                <motion.div
                  key={prediction.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border ${prediction.borderColor} hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg ${prediction.color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(prediction.trend)}
                          <span className="text-xs text-muted-foreground capitalize">{prediction.trend}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{prediction.type}</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.probability} className="flex-1" />
                        <span className={`font-bold ${prediction.textColor}`}>{prediction.probability}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Predictions */}
          <div className="grid lg:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => {
              const Icon = prediction.icon;
              return (
                <motion.div
                  key={prediction.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`border ${prediction.borderColor}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${prediction.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        {prediction.type} Prediction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Regions at Risk */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Regions at Risk
                        </h4>
                        <div className="space-y-3">
                          {prediction.regions.map((region) => (
                            <div key={region.name} className="bg-secondary/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{region.name}</span>
                                {getRiskBadge(region.risk)}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>{region.probability}% probability</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{region.timeframe}</span>
                                </div>
                              </div>
                              <Progress value={region.probability} className="mt-2 h-1" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contributing Factors */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <ThermometerSun className="h-4 w-4" />
                          Contributing Factors
                        </h4>
                        <ul className="space-y-1">
                          {prediction.factors.map((factor, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${prediction.color}`} />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Predictions;