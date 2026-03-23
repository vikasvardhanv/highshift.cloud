import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Control the scaling and unmasking as the user scrolls
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.3], [10, 0]);
    
    // Create a circular expansion effect
    const maskScale = useTransform(scrollYProgress, [0, 0.7], [20, 100]);

    return (
        <div ref={containerRef} className="h-[250vh] relative z-0">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                {/* Visual Formation logic */}
                <motion.div 
                    style={{ 
                        scale, 
                        opacity, 
                        filter: `blur(${blur}px)`,
                        clipPath: `circle(${maskScale}% at 50% 50%)`
                    }}
                    className="w-full h-full relative"
                >
                    <video 
                        src="/videos/Digital_Chaos_Tamed_by_Raven.mp4" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Content that appears when video is formed */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
                                Chaos Tamed by Raven
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                                Experience the future of Social Intelligence. 
                                <br />
                                Where manual work ends, Social Raven begins.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* Static Heading before/during transition */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-slate-500 uppercase tracking-widest mb-4">The Evolution</h2>
                        <div className="w-12 h-0.5 bg-indigo-500 mx-auto" />
                    </motion.div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
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
    );
}
