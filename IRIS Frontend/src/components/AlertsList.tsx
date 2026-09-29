import { motion } from 'framer-motion';
import { AlertTriangle, Waves, CloudLightning, Flame, Clock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'earthquake',
    location: 'Tokyo, Japan',
    severity: 'Critical',
    time: '2 mins ago',
    magnitude: '6.2',
    icon: AlertTriangle,
    color: 'destructive',
  },
  {
    id: 2,
    type: 'flood',
    location: 'Mumbai, India',
    severity: 'High',
    time: '15 mins ago',
    magnitude: 'Level 3',
    icon: Waves,
    color: 'primary',
  },
  {
    id: 3,
    type: 'hurricane',
    location: 'Miami, USA',
    severity: 'Moderate',
    time: '1 hour ago',
    magnitude: 'Category 2',
    icon: CloudLightning,
    color: 'accent',
  },
  {
    id: 4,
    type: 'wildfire',
    location: 'Sydney, Australia',
    severity: 'High',
    time: '3 hours ago',
    magnitude: '2500 acres',
    icon: Flame,
    color: 'warning',
  },
];

const severityColors = {
  Critical: 'bg-destructive/20 text-destructive border-destructive/30',
  High: 'bg-accent/20 text-accent border-accent/30',
  Moderate: 'bg-primary/20 text-primary border-primary/30',
  Low: 'bg-success/20 text-success border-success/30',
};

export function AlertsList() {
  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const Icon = alert.icon;
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-4 border border-border hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                alert.color === 'destructive' ? 'bg-destructive/20' :
                alert.color === 'primary' ? 'bg-primary/20' :
                alert.color === 'accent' ? 'bg-accent/20' :
                'bg-warning/20'
              }`}>
                <Icon className={`h-5 w-5 ${
                  alert.color === 'destructive' ? 'text-destructive' :
                  alert.color === 'primary' ? 'text-primary' :
                  alert.color === 'accent' ? 'text-accent' :
                  'text-warning'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold capitalize">{alert.type}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[alert.severity as keyof typeof severityColors]}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{alert.location}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="font-mono">{alert.magnitude}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
