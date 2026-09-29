import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Waves, CloudLightning, Mountain, Bell, BellOff, Search, Filter, Clock, MapPin, ChevronRight, CheckCircle, Tornado } from 'lucide-react';

const allAlerts = [
  {
    id: 1,
    type: 'earthquake',
    title: 'Major Earthquake Detected',
    location: 'Tokyo, Japan',
    severity: 'Critical',
    time: '2 mins ago',
    magnitude: '6.2 Richter',
    affected: '2.3M people',
    status: 'active',
    description: 'A significant earthquake has been detected with potential for aftershocks. Emergency services have been dispatched.',
  },
  {
    id: 2,
    type: 'flood',
    title: 'Flash Flood Warning',
    location: 'Mumbai, India',
    severity: 'High',
    time: '15 mins ago',
    magnitude: 'Level 3',
    affected: '850K people',
    status: 'active',
    description: 'Heavy monsoon rains have caused severe flooding in low-lying areas. Evacuation orders in effect.',
  },
  {
    id: 3,
    type: 'cyclone',
    title: 'Cyclone Maria Approaching',
    location: 'Bay of Bengal',
    severity: 'Critical',
    time: '1 hour ago',
    magnitude: 'Category 4',
    affected: '1.5M people',
    status: 'active',
    description: 'Severe Cyclone Maria is tracking toward the coast. Mandatory evacuations have been ordered.',
  },
  {
    id: 4,
    type: 'landslide',
    title: 'Landslide Warning',
    location: 'Himachal Pradesh, India',
    severity: 'High',
    time: '3 hours ago',
    magnitude: 'High Risk',
    affected: '12K people',
    status: 'active',
    description: 'Unstable terrain detected due to heavy rainfall. Potential for landslides in hilly areas.',
  },
  {
    id: 5,
    type: 'flood',
    title: 'River Overflow Alert',
    location: 'Bangkok, Thailand',
    severity: 'Moderate',
    time: '6 hours ago',
    magnitude: 'Level 2',
    affected: '340K people',
    status: 'monitoring',
    description: 'Chao Phraya River levels rising. Situation being monitored closely.',
  },
  {
    id: 6,
    type: 'earthquake',
    title: 'Aftershock Detected',
    location: 'Osaka, Japan',
    severity: 'Moderate',
    time: '8 hours ago',
    magnitude: '4.1 Richter',
    affected: '500K people',
    status: 'resolved',
    description: 'Aftershock from the Tokyo earthquake. No significant damage reported.',
  },
];

const severityColors = {
  Critical: { bg: 'bg-destructive/20', text: 'text-destructive', border: 'border-destructive/30' },
  High: { bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/30' },
  Moderate: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
  Low: { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' },
};

const typeConfig = {
  earthquake: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/20' },
  flood: { icon: Waves, color: 'text-primary', bg: 'bg-primary/20' },
  cyclone: { icon: Tornado, color: 'text-purple-500', bg: 'bg-purple-500/20' },
  landslide: { icon: Mountain, color: 'text-orange-500', bg: 'bg-orange-500/20' },
};

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);

  const filteredAlerts = allAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = !selectedSeverity || alert.severity === selectedSeverity;
    const matchesType = !selectedType || alert.type === selectedType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const activeCount = filteredAlerts.filter(a => a.status === 'active').length;
  const criticalCount = filteredAlerts.filter(a => a.severity === 'Critical').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Alert <span className="text-gradient-primary">Center</span>
              </h1>
              <p className="text-muted-foreground">Monitor and manage disaster alerts worldwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <Button variant="outline" size="sm">
                <BellOff className="h-4 w-4" />
                Mute All
              </Button>
              <Button variant="hero" size="sm">
                <Bell className="h-4 w-4" />
                Subscribe
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border border-border">
              <p className="text-muted-foreground text-sm">Total Alerts</p>
              <p className="font-display text-2xl font-bold">{filteredAlerts.length}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-destructive/30">
              <p className="text-muted-foreground text-sm">Critical</p>
              <p className="font-display text-2xl font-bold text-destructive">{criticalCount}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-accent/30">
              <p className="text-muted-foreground text-sm">Active</p>
              <p className="font-display text-2xl font-bold text-accent">{activeCount}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-success/30">
              <p className="text-muted-foreground text-sm">Resolved Today</p>
              <p className="font-display text-2xl font-bold text-success">12</p>
            </div>
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-10 bg-secondary border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedSeverity === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSeverity(null)}
                >
                  All
                </Button>
                {Object.keys(severityColors).map(severity => (
                  <Button
                    key={severity}
                    variant={selectedSeverity === severity ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
                  >
                    {severity}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {Object.entries(typeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className="gap-2"
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="capitalize">{type}s</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const config = typeConfig[alert.type as keyof typeof typeConfig];
              const Icon = config.icon;
              const severity = severityColors[alert.severity as keyof typeof severityColors];
              const isExpanded = expandedAlert === alert.id;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass rounded-xl border ${severity.border} overflow-hidden`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${config.bg}`}>
                        <Icon className={`h-6 w-6 ${config.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${severity.bg} ${severity.text} ${severity.border}`}>
                            {alert.severity}
                          </span>
                          {alert.status === 'active' && (
                            <span className="flex items-center gap-1 text-xs text-destructive">
                              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                              Active
                            </span>
                          )}
                          {alert.status === 'resolved' && (
                            <span className="flex items-center gap-1 text-xs text-success">
                              <CheckCircle className="w-3 h-3" />
                              Resolved
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.time}
                          </span>
                          <span className="font-mono">{alert.magnitude}</span>
                        </div>
                      </div>

                      <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border"
                    >
                      <div className="p-4 bg-secondary/30">
                        <p className="text-muted-foreground mb-4">{alert.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">People Affected</p>
                            <p className="font-semibold">{alert.affected}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Severity</p>
                            <p className={`font-semibold ${severity.text}`}>{alert.severity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Magnitude</p>
                            <p className="font-mono">{alert.magnitude}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="capitalize">{alert.status}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="hero" size="sm">
                            View on Map
                          </Button>
                          <Button variant="outline" size="sm">
                            Dispatch Team
                          </Button>
                          <Button variant="ghost" size="sm">
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-20">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No alerts match your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Alerts;
