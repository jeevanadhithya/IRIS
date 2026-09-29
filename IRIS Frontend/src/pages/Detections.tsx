import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Waves, AlertTriangle, Mountain, ShieldAlert, Tornado } from 'lucide-react';

const Detections = () => {
    const [activeTab, setActiveTab] = useState("all");

    const disasterTypes = [
        { id: "all", label: "All Detections", icon: ShieldAlert },
        { id: "cyclone", label: "Cyclones", icon: Tornado },
        { id: "flood", label: "Flood", icon: Waves },
        { id: "landslide", label: "Landslide", icon: Mountain },
        { id: "earthquake", label: "Earthquake", icon: AlertTriangle },
    ];

    // Placeholder data
    const detections = [
        { id: 1, type: "cyclone", location: "Coastal Region, Sector 4", confidence: 98, time: "10:42 AM", status: "Critical" },
        { id: 2, type: "flood", location: "Riverside District", confidence: 85, time: "09:15 AM", status: "Warning" },
        { id: 3, type: "landslide", location: "Hillside Road", confidence: 92, time: "Yesterday", status: "Resolved" },
        { id: 4, type: "cyclone", location: "Bay Area", confidence: 76, time: "Yesterday", status: "Investigating" },
        { id: 5, type: "earthquake", location: "Region A", confidence: 65, time: "2 days ago", status: "Monitor" },
    ];

    const filteredDetections = activeTab === "all"
        ? detections
        : detections.filter(d => d.type === activeTab);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20 pb-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                            Disaster <span className="text-gradient-primary">Detections</span>
                        </h1>
                        <p className="text-muted-foreground">Real-time identification and classification of potential threats</p>
                    </motion.div>

                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto h-auto p-1">
                            {disasterTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <TabsTrigger
                                        key={type.id}
                                        value={type.id}
                                        className="flex flex-col md:flex-row items-center gap-2 py-3 md:py-2"
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{type.label}</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {filteredDetections.length > 0 ? (
                                    filteredDetections.map((detection) => (
                                        <Card key={detection.id} className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10">
                                            <CardHeader className="bg-muted/50 pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`p-2 rounded-full bg-background border ${detection.type === 'fire' ? 'text-orange-500 border-orange-500/20' :
                                                            detection.type === 'flood' ? 'text-blue-500 border-blue-500/20' :
                                                                detection.type === 'landslide' ? 'text-amber-700 border-amber-700/20' :
                                                                    'text-red-500 border-red-500/20'
                                                            }`}>
                                                            {detection.type === 'cyclone' && <Tornado className="h-4 w-4" />}
                                                            {detection.type === 'flood' && <Waves className="h-4 w-4" />}
                                                            {detection.type === 'landslide' && <Mountain className="h-4 w-4" />}
                                                            {detection.type === 'earthquake' && <AlertTriangle className="h-4 w-4" />}
                                                        </span>
                                                        <span className="font-semibold capitalize">{detection.type}</span>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded-full border ${detection.status === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                        detection.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                            'bg-green-500/10 text-green-500 border-green-500/20'
                                                        }`}>
                                                        {detection.status}
                                                    </span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Location:</span>
                                                        <span className="font-medium">{detection.location}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Confidence:</span>
                                                        <span className={`font-bold ${detection.confidence > 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                                                            {detection.confidence}%
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Time:</span>
                                                        <span>{detection.time}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t flex justify-end">
                                                    <button className="text-sm text-primary hover:underline">View Details</button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">
                                        No detections found for this category.
                                    </div>
                                )}
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default Detections;
