import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function VideoHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Typography and Timing Config
    // Phase 0-0.1: Initial Black & Evolution
    const evoOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 1, 0]);
    const evoScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1.2]);

    // Phase 1 (0.1 - 0.4): Social Raven Silent Engine (First Video)
    const video1Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.35, 0.4], [0, 1, 1, 0]);
    const video1Scale = useTransform(scrollYProgress, [0.1, 0.4], [1.1, 1]);

    // Phase 2 (0.4 - 0.6): Social Robot Text "Spreading Out"
    const robotTextOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
    
    // Phase 3 (0.6 - 0.8): Social Media Animation (Second Video)
    const video2Opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
    
    // Phase 4 (0.8 - 1.0): Digital Chaos Tamed (Third Video)
    const video3Opacity = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1], [0, 1, 1, 0]);

    // "Spreading Out" animation for the text lines
    const line1X = useTransform(scrollYProgress, [0.4, 0.55], [-100, 0]);
    const line2X = useTransform(scrollYProgress, [0.4, 0.55], [100, 0]);
    const line3Scale = useTransform(scrollYProgress, [0.4, 0.55], [0.5, 1]);

    return (
        <div ref={containerRef} className="h-[600vh] relative z-0 bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                
                {/* 1. INITIAL: THE EVOLUTION */}
                <motion.div 
                    style={{ opacity: evoOpacity, scale: evoScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-[0.4em] italic mb-4">
                        The Evolution
                    </h2>
                    <div className="w-24 h-1 bg-indigo-500 rounded-full" />
                </motion.div>

                {/* 2. VIDEO 1: THE SILENT ENGINE */}
                <motion.div 
                    style={{ opacity: video1Opacity, scale: video1Scale }}
                    className="absolute inset-0 z-10 w-full h-full"
                >
                    <video 
                        src="/videos/Social_Raven_Silent_Engine.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" /> {/* Slight dark overlay */}
                    
                    {/* Floating Branding */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0, 1]) }}
                        >
                            <h3 className="text-xl md:text-3xl font-bold text-slate-400 uppercase tracking-widest mb-4">The Silent Engine</h3>
                            <h2 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase">Social Raven</h2>
                        </motion.div>
                    </div>
                </motion.div>

                {/* 3. TEXT: THE SOCIAL ROBOT (Spreading Out) */}
                <motion.div 
                    style={{ opacity: robotTextOpacity }}
                    className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4"
                >
                    <div className="max-w-4xl space-y-12">
                        <motion.h4 
                            style={{ x: line1X }}
                            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
                        >
                            MEET THE SOCIAL ROBOT
                        </motion.h4>
                        <motion.div 
                            style={{ scale: line3Scale }}
                            className="text-lg md:text-3xl text-indigo-400 font-medium"
                        >
                            Autonomous • Intelligent • Precise
                        </motion.div>
                        <motion.p 
                            style={{ x: line2X }}
                            className="text-xl md:text-3xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
                        >
                            Scaling your social presence across every channel with zero manual overhead. One brain, infinite scale.
                        </motion.p>
                    </div>
                </motion.div>

                {/* 4. VIDEO 2: REFINED INTELLIGENCE */}
                <motion.div 
                    style={{ opacity: video2Opacity }}
                    className="absolute inset-0 z-20 w-full h-full"
                >
                    <video 
                        src="/videos/Social_Media_Animation_For_Website.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase">Refined Intelligence</h2>
                    </div>
                </motion.div>

                {/* 5. VIDEO 3: DIGITAL CHAOS TAMED */}
                <motion.div 
                    style={{ opacity: video3Opacity }}
                    className="absolute inset-0 z-30 w-full h-full"
                >
                    <video 
                        src="/videos/Digital_Chaos_Tamed_by_Raven.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase">Chaos Tamed</h2>
                        <div className="mt-8 flex gap-4">
                            <div className="w-12 h-0.5 bg-white/20" />
                            <div className="w-12 h-0.5 bg-indigo-500" />
                            <div className="w-12 h-0.5 bg-white/20" />
                        </div>
                    </div>
                </motion.div>

                {/* Final Overlay to transition to the rest of the page */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]) }}
                    className="absolute inset-0 bg-black z-[60] pointer-events-none" 
                />

                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[70] pointer-events-none"
                >
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                        <motion.div 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-indigo-500 rounded-full" 
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
