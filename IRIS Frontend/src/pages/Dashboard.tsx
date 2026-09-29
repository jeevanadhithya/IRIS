import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { StatCard } from '@/components/StatCard';
import { SensorChart, GyroscopeChart } from '@/components/Charts';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Users, Activity, MapPin, Shield, Radio, Thermometer, Droplets, Waves, Compass, Mic, Wifi, Hand, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAlertSender } from '@/contexts/AlertSenderContext';

const Dashboard = () => {
  const { toast } = useToast();
  const { triggerAlert, resetAlert } = useAlertSender();
  const [temperature] = useState("24°C");
  const [soilMoisture] = useState("45%");
  const [vibrations] = useState("Normal");
  const [waterLevel] = useState("1.2m");

  const [gyroData] = useState<any[]>([
    { time: '10:00:00', x: 0.1, y: 0.2, z: 0.1 },
    { time: '10:00:01', x: 0.15, y: 0.22, z: 0.08 },
    { time: '10:00:02', x: 0.2, y: 0.18, z: 0.12 },
    { time: '10:00:03', x: 0.18, y: 0.25, z: 0.15 },
    { time: '10:00:04', x: 0.22, y: 0.28, z: 0.18 },
    { time: '10:00:05', x: 0.19, y: 0.3, z: 0.2 },
    { time: '10:00:06', x: 0.25, y: 0.26, z: 0.22 },
    { time: '10:00:07', x: 0.28, y: 0.24, z: 0.19 },
    { time: '10:00:08', x: 0.3, y: 0.28, z: 0.15 },
    { time: '10:00:09', x: 0.32, y: 0.32, z: 0.12 },
    { time: '10:00:10', x: 0.29, y: 0.35, z: 0.1 },
    { time: '10:00:11', x: 0.26, y: 0.38, z: 0.08 },
    { time: '10:00:12', x: 0.24, y: 0.4, z: 0.15 },
    { time: '10:00:13', x: 0.22, y: 0.42, z: 0.2 },
    { time: '10:00:14', x: 0.25, y: 0.45, z: 0.25 },
    { time: '10:00:15', x: 0.28, y: 0.48, z: 0.3 },
    { time: '10:00:16', x: 0.32, y: 0.5, z: 0.35 },
    { time: '10:00:17', x: 0.35, y: 0.48, z: 0.4 },
    { time: '10:00:18', x: 0.38, y: 0.45, z: 0.38 },
    { time: '10:00:19', x: 0.4, y: 0.42, z: 0.35 },
  ]);

  const [vibrationData] = useState<any[]>([
    { time: '10:00:00', value: 20 },
    { time: '10:00:01', value: 25 },
    { time: '10:00:02', value: 30 },
    { time: '10:00:03', value: 22 },
    { time: '10:00:04', value: 28 },
    { time: '10:00:05', value: 35 },
    { time: '10:00:06', value: 40 },
    { time: '10:00:07', value: 32 },
    { time: '10:00:08', value: 25 },
    { time: '10:00:09', value: 18 },
    { time: '10:00:10', value: 15 },
    { time: '10:00:11', value: 20 },
    { time: '10:00:12', value: 28 },
    { time: '10:00:13', value: 35 },
    { time: '10:00:14', value: 42 },
    { time: '10:00:15', value: 48 },
    { time: '10:00:16', value: 38 },
    { time: '10:00:17', value: 30 },
    { time: '10:00:18', value: 25 },
    { time: '10:00:19', value: 20 },
  ]);

  const [micData] = useState<any[]>([
    { time: '10:00:00', value: 45 },
    { time: '10:00:01', value: 48 },
    { time: '10:00:02', value: 50 },
    { time: '10:00:03', value: 55 },
    { time: '10:00:04', value: 52 },
    { time: '10:00:05', value: 48 },
    { time: '10:00:06', value: 45 },
    { time: '10:00:07', value: 50 },
    { time: '10:00:08', value: 58 },
    { time: '10:00:09', value: 65 },
    { time: '10:00:10', value: 60 },
    { time: '10:00:11', value: 55 },
    { time: '10:00:12', value: 50 },
    { time: '10:00:13', value: 48 },
    { time: '10:00:14', value: 52 },
    { time: '10:00:15', value: 55 },
    { time: '10:00:16', value: 50 },
    { time: '10:00:17', value: 45 },
    { time: '10:00:18', value: 42 },
    { time: '10:00:19', value: 40 },
  ]);

  const handleIssueAlert = async () => {
    if (isAutoMode) {
      toast({
        title: "Action Blocked",
        description: "System is in Automatic Mode. Switch to Manual Mode to trigger alerts manually.",
        variant: "destructive",
      });
      return;
    }
    try {
      triggerAlert(98);
      const response = await fetch("http://localhost:3009/calluser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
      });
      const data = await response.json();
      if (data.success) {
        console.log("Call initiated:", data.sid);
        toast({
          title: "Alert Triggered",
          description: "Action executed successfully.",
          variant: "default",
          onOpenChange: (open) => {
            console.log("Toast Open State Changed:", open);
            if (!open) {
              console.log("Calling resetAlert()");
              resetAlert();
            }
          },
        });
      } else {
        console.error("Failed to initiate call:", data.error);
        toast({
          title: "Failed to Issue Alert",
          description: data.error || "Unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error calling backend:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the backend server.",
        variant: "destructive",
      });
    }
  };

  const handleEvacuate = () => {
    if (isAutoMode) {
      toast({
        title: "Action Blocked",
        description: "System is in Automatic Mode. Switch to Manual Mode to trigger alerts manually.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Evacuation Alert Issued",
      description: "Emergency evacuation protocols have been initiated.",
      variant: "destructive",
      onOpenChange: (open) => !open && resetAlert(),
    });
  };

  const handleAllClear = () => {
    if (isAutoMode) {
      toast({
        title: "Action Blocked",
        description: "System is in Automatic Mode. Switch to Manual Mode to trigger alerts manually.",
        variant: "destructive",
      });
      return;
    }
    resetAlert();
    toast({
      title: "Cleared Successfully",
      description: "All clear status has been updated.",
      variant: "default",
    });
  };

  const handleBroadcast = () => {
    if (isAutoMode) {
      toast({
        title: "Action Blocked",
        description: "System is in Automatic Mode. Switch to Manual Mode to trigger alerts manually.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Error",
      description: "Broadcast system is currently unavailable.",
      variant: "destructive",
    });
  };

  const [location] = useState("San Francisco, CA, USA");
  const [isAutoMode, setIsAutoMode] = useState(true);

  const handleModeChange = (auto: boolean) => {
    setIsAutoMode(auto);
    toast({
      title: `${auto ? "Automatic" : "Manual"} Mode Activated`,
      description: `System switched to ${auto ? "automatic" : "manual"} operation.`,
      variant: "default",
    });
  };

  // ... existing code ...

  return (
    <div className="min-h-screen bg-background" >
      <Navbar />

      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Command <span className="text-gradient-primary">Center</span>
              </h1>
              <p className="text-muted-foreground">Real-time disaster monitoring and response coordination</p>
            </motion.div>

            {/* Center Toggle - REMOVED */}


            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-end gap-2 mt-4 md:mt-0"
            >
              <div className="flex items-center gap-3 px-4 py-3 glass rounded-lg border border-primary/20 bg-primary/5 shadow-lg shadow-primary/5">
                <div className="p-2 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary mb-0.5 uppercase tracking-wider">Current Location</p>
                  <p className="text-lg font-bold text-foreground leading-none">{location}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">37.7749° N, 122.4194° W</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mt-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>

                <span className="text-md  font-medium text-green-500">1 Node Connected</span>
                <Wifi className="h-3 w-3 text-green-500" />

              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Temperature"
              value={temperature}
              icon={Thermometer}
              color="destructive"
            />
            <StatCard
              title="Soil Moisture Levels"
              value={soilMoisture}
              icon={Droplets}
              color="accent"
            />
            <StatCard
              title="Vibrations"
              value={vibrations}
              icon={Activity}
              color="primary"
            />
            <StatCard
              title="Water Level"
              value={waterLevel}
              icon={Waves}
              color="success"
            />
          </div>

          {/* Sensor Data Section */}
          <div className="w-full space-y-6">
            {/* Gyroscope Data */}
            {/* Gyroscope Graph */}
            <GyroscopeChart data={gyroData} />

            {/* Live Sensor Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SensorChart
                title="Vibration Analysis"
                data={vibrationData}
                dataKey="value"
                color="#0ea5e9"
              />
              <SensorChart
                title="Seismic Audio Sensor"
                data={micData}
                dataKey="value"
                color="#f59e0b"
              />
            </div>
          </div>

        </div>

        {/* Mode Toggle & Quick Actions */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 p-1 glass rounded-full border border-primary/20 bg-background/50 backdrop-blur-md"
          >
            <button
              onClick={() => handleModeChange(false)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 ${!isAutoMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Hand className="h-5 w-5" />
              <span className="font-medium">Manual</span>
            </button>
            <button
              onClick={() => handleModeChange(true)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 ${isAutoMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Zap className="h-5 w-5" />
              <span className="font-medium">Automatic</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <div className="glass rounded-xl p-6 border border-border">
              <h3 className="font-display font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="secondary" className="h-auto py-10 flex-col gap-4" onClick={handleIssueAlert}>
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                  <span className="text-lg font-medium">Issue Alert</span>
                </Button>
                <Button variant="secondary" className="h-auto py-10 flex-col gap-4" onClick={handleEvacuate}>
                  <Users className="h-10 w-10 text-primary" />
                  <span className="text-lg font-medium">Evacuate</span>
                </Button>
                <Button variant="secondary" className="h-auto py-10 flex-col gap-4" onClick={handleBroadcast}>
                  <Radio className="h-10 w-10 text-orange-500" />
                  <span className="text-lg font-medium">Broadcast</span>
                </Button>
                <Button variant="secondary" className="h-auto py-10 flex-col gap-4" onClick={handleAllClear}>
                  <Shield className="h-10 w-10 text-green-500" />
                  <span className="text-lg font-medium">All Clear</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>

  );
};

export default Dashboard;