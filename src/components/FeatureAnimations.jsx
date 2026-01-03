import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, Image, CheckCircle, Users, Repeat,
    Twitter, Facebook, Instagram, Linkedin, Layers,
    ArrowRight, BarChart2, TrendingUp, Zap, Sparkles
} from 'lucide-react';

// Visual Calendar: Drag-and-drop animation
export function VisualCalendarAnimation() {
    const [draggedPost, setDraggedPost] = useState(null);
    const [targetDay, setTargetDay] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setDraggedPost(prev => prev === null ? 0 : null);
            setTargetDay(prev => (prev + 1) % 5 + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const posts = [
        { day: 1, color: 'bg-blue-500' },
        { day: 3, color: 'bg-pink-500' },
        { day: 4, color: 'bg-purple-500' },
    ];

    return (
        <div className="relative w-full h-48">
            {/* Mini Calendar Grid */}
            <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
                {days.map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-500 mb-1">{day}</span>
                        <motion.div
                            className={`w-full h-20 rounded-lg border-2 border-dashed transition-all
                                ${draggedPost !== null && index === targetDay ? 'border-primary bg-primary/10' : 'border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5'}`}
                            animate={draggedPost !== null && index === targetDay ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Existing posts */}
                            {posts.filter(p => p.day === index).map((post, pIndex) => (
                                <motion.div
                                    key={pIndex}
                                    className={`w-full h-full rounded-md ${post.color} opacity-70 p-1 flex items-center justify-center`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Calendar className="w-3 h-3 text-white" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Dragging Post */}
            <AnimatePresence>
                {draggedPost !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 80, y: 50 }}
                        animate={{
                            opacity: 1,
                            scale: 0.9,
                            x: (targetDay * 50) + 20,
                            y: 80,
                            rotate: [0, -5, 5, 0]
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="absolute bg-emerald-500 rounded-lg shadow-2xl p-2 w-12 h-12 flex items-center justify-center z-20"
                    >
                        <Calendar className="w-6 h-6 text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Best Time to Post: AI analysis visualization
export function BestTimeAnimation() {
    const [analyzing, setAnalyzing] = useState(true);
    const [suggestedTime, setSuggestedTime] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnalyzing(true);
            setSuggestedTime(null);
            setTimeout(() => {
                setAnalyzing(false);
                setSuggestedTime({ hour: 10 + Math.floor(Math.random() * 4), engagement: 85 + Math.floor(Math.random() * 15) });
            }, 2000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const hours = [8, 10, 12, 14, 16, 18];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Time bars */}
            <div className="absolute inset-0 flex items-end justify-center gap-3 px-6 pb-8">
                {hours.map((hour, index) => {
                    const isOptimal = suggestedTime && hour === suggestedTime.hour;
                    const height = 30 + Math.random() * 50;

                    return (
                        <div key={hour} className="flex flex-col items-center gap-1">
                            <motion.div
                                className={`w-8 rounded-t-lg ${isOptimal ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : 'bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500'}`}
                                initial={{ height: 0 }}
                                animate={{
                                    height: `${height}px`,
                                    scale: isOptimal ? 1.15 : 1
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            />
                            <span className="text-[9px] font-bold text-slate-500">{hour}:00</span>
                        </div>
                    );
                })}
            </div>

            {/* AI Scanning Effect */}
            <AnimatePresence>
                {analyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: -120 }}
                        animate={{ opacity: [0.5, 1, 0.5], y: [-120, 60, -120] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-x-0 h-1 bg-primary/50 blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* AI Badge */}
            <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: analyzing ? 360 : 0 }}
                transition={{ duration: 2, repeat: analyzing ? Infinity : 0, ease: "linear" }}
            >
                <div className="bg-primary/20 rounded-xl p-2 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
            </motion.div>

            {/* Suggested Time Popup */}
            <AnimatePresence>
                {suggestedTime && !analyzing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-10 bg-emerald-500 text-white rounded-xl px-4 py-2 shadow-xl"
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-bold">{suggestedTime.hour}:00 • {suggestedTime.engagement}% engagement</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Multi-Platform: Network diagram
export function MultiPlatformAnimation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const platforms = [
        { icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-500/20' },
        { icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/20' },
        { icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-600/20' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % platforms.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Center content bubble */}
            <motion.div
                className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Layers className="w-10 h-10 text-white" />
            </motion.div>

            {/* Orbiting platforms */}
            {platforms.map((platform, index) => {
                const angle = (index * 90);
                const radius = 70;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const Icon = platform.icon;
                const isActive = index === activeIndex;

                return (
                    <motion.div
                        key={index}
                        className={`absolute ${platform.bg} rounded-xl p-3 shadow-lg`}
                        animate={{
                            x,
                            y,
                            scale: isActive ? 1.2 : 0.9,
                            opacity: isActive ? 1 : 0.6
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Icon className={`w-6 h-6 ${platform.color}`} />
                    </motion.div>
                );
            })}

            {/* Connection lines */}
            {platforms.map((_, index) => (
                <motion.div
                    key={`line-${index}`}
                    className="absolute w-1 h-16 bg-primary/20 origin-bottom"
                    style={{
                        rotate: `${index * 90}deg`,
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%',
                    }}
                    animate={{
                        scaleY: index === activeIndex ? [1, 1.5, 1] : 1,
                        opacity: index === activeIndex ? [0.2, 0.5, 0.2] : 0.1
                    }}
                    transition={{ duration: 1.5 }}
                />
            ))}
        </div>
    );
}

// Asset Library: File organization
export function AssetLibraryAnimation() {
    const [organizing, setOrganizing] = useState(false);
    const [files, setFiles] = useState([
        { id: 1, x: 20, y: 30, organized: false },
        { id: 2, x: 60, y: 50, organized: false },
        { id: 3, x: 100, y: 20, organized: false },
        { id: 4, x: 130, y: 60, organized: false },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrganizing(true);
            setTimeout(() => {
                setFiles(prev => prev.map(f => ({ ...f, organized: true })));
            }, 500);
            setTimeout(() => {
                setOrganizing(false);
                setFiles(prev => prev.map(f => ({ ...f, organized: false })));
            }, 3000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48">
            {/* Folder grid (organized state) */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8 opacity-20">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-lg" />
                ))}
            </div>

            {/* Floating files */}
            {files.map((file, index) => (
                <motion.div
                    key={file.id}
                    className="absolute w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center"
                    animate={{
                        x: file.organized ? (index % 2) * 80 + 50 : file.x,
                        y: file.organized ? Math.floor(index / 2) * 70 + 40 : file.y,
                        rotate: file.organized ? 0 : [0, 5, -5, 0],
                        scale: file.organized ? 0.9 : 1
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                    <Image className="w-6 h-6 text-white" />
                </motion.div>
            ))}

            {/* Organizing indicator */}
            <AnimatePresence>
                {organizing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-4 right-4 bg-primary/20 rounded-full px-3 py-1"
                    >
                        <div className="flex items-center gap-1">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Zap className="w-3 h-3 text-primary" />
                            </motion.div>
                            <span className="text-xs font-bold text-primary">Organizing</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Approval Workflow: Step progression
export function ApprovalWorkflowAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Draft', 'Review', 'Approved'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % (steps.length + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center px-4">
            <div className="flex items-center gap-4">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;

                    return (
                        <div key={step} className="flex items-center">
                            {/* Step circle */}
                            <motion.div
                                className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg
                                    ${isComplete ? 'bg-emerald-500' : isActive ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                animate={{
                                    scale: isActive ? [1, 1.15, 1] : 1,
                                    boxShadow: isActive
                                        ? ['0 4px 6px rgba(251, 191, 36, 0.3)', '0 8px 16px rgba(251, 191, 36, 0.5)', '0 4px 6px rgba(251, 191, 36, 0.3)']
                                        : '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                                transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                            >
                                {isComplete ? (
                                    <CheckCircle className="w-8 h-8 text-white" />
                                ) : (
                                    <Users className="w-8 h-8 text-white" />
                                )}
                                <span className="text-[8px] font-bold text-white mt-1">{step}</span>
                            </motion.div>

                            {/* Arrow connector */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    className={`w-12 h-1 mx-2 ${isComplete ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                    animate={{
                                        scaleX: isComplete ? [1, 1.1, 1] : 1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ArrowRight className={`w-4 h-4 -mt-2 ml-8 ${isComplete ? 'text-emerald-500' : 'text-slate-400'}`} />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Evergreen Recycling: Content loop
export function EvergreenRecyclingAnimation() {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const positions = [
        { x: 0, y: 0 },      // Top
        { x: 100, y: 60 },   // Right
        { x: 0, y: 120 },    // Bottom
        { x: -100, y: 60 },  // Left
    ];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Circular path */}
            <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-primary/30" />

            {/* Rotating content pieces */}
            {[0, 1, 2].map((index) => {
                const currentPhase = (phase + index) % 4;
                const pos = positions[currentPhase];

                return (
                    <motion.div
                        key={index}
                        className={`absolute w-12 h-12 rounded-lg shadow-lg flex items-center justify-center
                            ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-pink-500'}`}
                        animate={{
                            x: pos.x,
                            y: pos.y,
                            rotate: currentPhase * 90,
                            scale: currentPhase % 2 === 0 ? 1.1 : 0.9
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                        <Calendar className="w-6 h-6 text-white" />
                    </motion.div>
                );
            })}

            {/* Center icon */}
            <motion.div
                className="relative z-10 w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                <Repeat className="w-8 h-8 text-emerald-500" />
            </motion.div>

            {/* Performance indicator */}
            <motion.div
                className="absolute top-4 right-4 bg-green-500/20 rounded-full px-3 py-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-bold text-green-500">Top Posts</span>
                </div>
            </motion.div>
        </div>
    );
}
