import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Control the visibility of the "Evolution" text
    const evolutionOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const evolutionScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.5]);

    // First Video: Chaos Tamed
    // Appears after evolution text, fades out for second video
    const video1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.45, 0.5], [0, 1, 1, 0]);
    const video1Scale = useTransform(scrollYProgress, [0.05, 0.5], [0.8, 1.1]);
    const video1Blur = useTransform(scrollYProgress, [0.05, 0.15], [20, 0]);

    // Second Video: The Social Engine
    const video2Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.9, 1], [0, 1, 1, 0]);
    const video2Scale = useTransform(scrollYProgress, [0.5, 1], [0.9, 1]);
    
    // Masking effect for the first video reveal
    const maskSize = useTransform(scrollYProgress, [0.05, 0.3], [10, 100]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0 bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* 1. INITIAL STATE: The Evolution */}
                <motion.div 
                    style={{ opacity: evolutionOpacity, scale: evolutionScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.3em] italic text-center px-4">
                        The Evolution
                    </h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        className="h-1 bg-indigo-500 mt-8" 
                    />
                </motion.div>

                {/* 2. FIRST REVEAL: Digital Chaos Tamed */}
                <motion.div 
                    style={{ 
                        opacity: video1Opacity, 
                        scale: video1Scale,
                        filter: `blur(${video1Blur}px)`,
                        clipPath: `circle(${maskSize}% at 50% 50%)`
                    }}
                    className="absolute inset-0 z-10 w-full h-full"
                >
                    <video 
                        src="/videos/Digital_Raven_Organizes_Social_Media_Chaos.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <motion.h3 
                            className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-4"
                            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
                        >
                            Chaos Tamed
                        </motion.h3>
                    </div>
                </motion.div>

                {/* 3. SECOND REVEAL: Social Media Animation */}
                <motion.div 
                    style={{ 
                        opacity: video2Opacity, 
                        scale: video2Scale
                    }}
                    className="absolute inset-0 z-20 w-full h-full"
                >
                    <video 
                        src="/videos/Social_Media_Animation_For_Website.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <motion.h3 
                            className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase"
                            style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]) }}
                        >
                            Refined Intelligence
                        </motion.h3>
                        <motion.p
                            className="text-lg md:text-2xl text-slate-300 mt-6 max-w-xl font-medium"
                            style={{ opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]) }}
                        >
                            The Social Raven engine orchestrates your growth with cinematic precision.
                        </motion.p>
                    </div>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 1]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40"
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
