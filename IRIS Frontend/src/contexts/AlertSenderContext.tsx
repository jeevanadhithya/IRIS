import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

interface AlertSenderContextType {
    isAlertActive: boolean;
    confidenceScore: number;
    triggerAlert: (score: number) => void;
    resetAlert: () => void;
}

const AlertSenderContext = createContext<AlertSenderContextType | undefined>(undefined);

export const useAlertSender = () => {
    const context = useContext(AlertSenderContext);
    if (!context) throw new Error('useAlertSender must be used within an AlertSenderProvider');
    return context;
};

interface AlertSenderProviderProps { children: ReactNode; }

export const AlertSenderProvider: React.FC<AlertSenderProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isAlertActive, setIsAlertActive] = useState(true);
    const [confidenceScore, setConfidenceScore] = useState(0);
    const [audio] = useState(() => {
        // Create audio element but don't load immediately to prevent autoplay issues
        const audioEl = new Audio();
        // Check if the audio file exists before setting the source
        // For now, skip setting the source to prevent errors
        audioEl.loop = false; // Don't loop since we're not using the audio
        return audioEl;
    }); // lazy init

    useEffect(() => {
        if (isAlertActive) {
            // Try to play audio, but don't log errors for autoplay restrictions
            // Modern browsers require user interaction before audio playback
            // Only try to play if the audio source is loaded
            if (audio.src) {
                audio.play().catch(e => {
                    // Only log if it's not an autoplay restriction error
                    if (e.name !== 'NotAllowedError') {
                        console.warn('Audio play failed:', e);
                    }
                });
            }
        } else {
            audio.pause();
            audio.currentTime = 0;
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [isAlertActive, audio]);

    const triggerAlert = (score: number) => {
        setConfidenceScore(score);
        setIsAlertActive(true);
    };

    // Stop audio immediately and hide the alert when user clicks close
    const resetAlert = () => {
        if (audio.src) {
            audio.pause();
            audio.currentTime = 0;
        }
        setIsAlertActive(false);
    };

    return (
        <AlertSenderContext.Provider value={{ isAlertActive, confidenceScore, triggerAlert, resetAlert }}>
            {children}
            {isAlertActive && (
                <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center bg-red-600/20 backdrop-blur-sm animate-pulse">
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
                    <div className="relative z-10 text-center space-y-4 p-12 rounded-3xl bg-black/60 border-2 border-red-500 shadow-[0_0_100px_rgba(239,68,68,0.5)] backdrop-blur-md pointer-events-auto">
                        <button
                            onClick={resetAlert}
                            aria-label="Close alert"
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <h1 className="text-6xl md:text-8xl font-black text-red-500 tracking-normal animate-bounce">
                            DISASTER DETECTED
                        </h1>
                        <div className="text-2xl md:text-4xl font-mono text-red-400 font-bold">
                            CONFIDENCE SCORE: {confidenceScore}%
                        </div>
                        <div className="text-red-300 font-mono animate-pulse">Please evacuate immediately.</div>
                        <button
                            onClick={() => {
                                navigate('/detections');
                                resetAlert();
                            }}
                            className="mt-6 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors flex items-center gap-2 mx-auto"
                        >
                            View Detections
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(220,38,38,0.5)] pointer-events-none"></div>
                </div>
            )}
        </AlertSenderContext.Provider>
    );
};
