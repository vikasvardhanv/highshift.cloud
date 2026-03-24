import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoHero() {
    const containerRef = useRef(null);
    const videoRef1 = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1-second loop for the first animation snippet
    useEffect(() => {
        if (videoRef1.current) {
            const handleTimeUpdate = () => {
                if (videoRef1.current.currentTime >= 1.2) {
                    videoRef1.current.currentTime = 0;
                }
            };
            videoRef1.current.addEventListener('timeupdate', handleTimeUpdate);
            return () => videoRef1.current?.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, []);

    // 1. INTRO: Logo + "The Evolution Is Here"
    const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const introScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.85]);

    // 2. VIDEO 1: The 1-second snippet
    const video1Opacity = useTransform(scrollYProgress, [0.08, 0.12, 0.28, 0.32], [0, 1, 1, 0]);

    // 3. TEXT: THE SOCIAL ROBOT
    const robotTextOpacity = useTransform(scrollYProgress, [0.32, 0.36, 0.52, 0.56], [0, 1, 1, 0]);
    const lineX = useTransform(scrollYProgress, [0.32, 0.52], [-100, 0]);

    // 4. VIDEO 2: SILENT ENGINE
    const video2Opacity = useTransform(scrollYProgress, [0.56, 0.6, 0.76, 0.8], [0, 1, 1, 0]);

    // 5. VIDEO 3: CHAOS TAMED (Resolution)
    const video3Opacity = useTransform(scrollYProgress, [0.8, 0.85, 0.98, 1], [0, 1, 1, 0]);
    const video3Scale = useTransform(scrollYProgress, [0.8, 1], [1.1, 1]);

    return (
        <div ref={containerRef} className="h-[700vh] relative z-0 bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                
                {/* 1. INTRO */}
                <motion.div 
                    style={{ opacity: introOpacity, scale: introScale }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-32 h-32 md:w-56 md:h-56 mb-12"
                    >
                        <img src="/images/image.png" alt="Social Raven Logo" className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" />
                    </motion.div>
                    <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                        The Evolution<br/>Is Here
                    </h1>
                    <p className="text-indigo-400 font-bold tracking-[0.5em] uppercase text-sm md:text-xl">
                        Social Raven
                    </p>
                </motion.div>

                {/* 2. VIDEO: 1-SECOND LOOP */}
                <motion.div 
                    style={{ opacity: video1Opacity }}
                    className="absolute inset-0 z-10 w-full h-full"
                >
                    <video 
                        ref={videoRef1}
                        src="/videos/Social_Media_Animation_For_Website.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover grayscale opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                {/* 3. SOCIAL ROBOT TEXT */}
                <motion.div 
                    style={{ opacity: robotTextOpacity }}
                    className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4"
                >
                    <motion.div style={{ x: lineX }} className="max-w-4xl space-y-6">
                        <h2 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter italic leading-none">
                            The Social<br/>Robot
                        </h2>
                        <p className="text-xl md:text-4xl text-slate-400 font-light italic opacity-80">
                            Orchestrating digital dominance while you sleep.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 4. VIDEO: SILENT ENGINE */}
                <motion.div 
                    style={{ opacity: video2Opacity }}
                    className="absolute inset-0 z-20 w-full h-full"
                >
                    <video 
                        src="/videos/Social_Raven_Silent_Engine.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* 5. VIDEO: CHAOS TAMED (FINAL) */}
                <motion.div 
                    style={{ opacity: video3Opacity, scale: video3Scale }}
                    className="absolute inset-0 z-30 w-full h-full"
                >
                    <video 
                        src="/videos/Digital_Raven_Organizes_Social_Media_Chaos.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                         <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">Chaos<br/>Tamed</h2>
                         <div className="w-16 h-1.5 bg-indigo-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Final Fade out transition */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0.98, 1], [0, 1]) }}
                    className="absolute inset-0 bg-black z-[55] pointer-events-none" 
                />

                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.98, 1], [1, 0, 0, 0]) }}
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
