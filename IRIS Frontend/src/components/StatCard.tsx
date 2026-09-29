import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'primary' | 'accent' | 'destructive' | 'success';
}

const colorClasses = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  accent: 'text-accent bg-accent/10 border-accent/20',
  destructive: 'text-destructive bg-destructive/10 border-destructive/20',
  success: 'text-success bg-success/10 border-success/20',
};

const iconBgClasses = {
  primary: 'bg-primary/20',
  accent: 'bg-accent/20',
  destructive: 'bg-destructive/20',
  success: 'bg-success/20',
};

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`glass rounded-xl p-6 border ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-display font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${
              changeType === 'positive' ? 'text-success' : 
              changeType === 'negative' ? 'text-destructive' : 
              'text-muted-foreground'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className={`h-6 w-6 ${colorClasses[color].split(' ')[0]}`} />
        </div>
      </div>
    </motion.div>
  );
}
