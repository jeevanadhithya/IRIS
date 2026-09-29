import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, LayoutDashboard, Bell, Menu, X, Shield, Brain, BarChart3, Home, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/detections', label: 'Detections', icon: ShieldAlert },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/predictions', label: 'Predictions', icon: Brain },
  { path: '/alerts', label: 'Alerts', icon: Bell },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Globe className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/30" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-foreground">
              GEO<span className="text-primary">SENSE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        layoutId="navbar-active"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-4 border-t border-border"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
