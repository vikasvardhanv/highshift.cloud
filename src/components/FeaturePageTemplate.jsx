import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturePageTemplate({
    title,
    subtitle,
    heroImage,
    heroGradient = "from-blue-600 to-indigo-600",
    features = [],
    ctaTitle = "Ready to get started?",
    ctaText = "Join thousands of brands using HighShift to grow.",
    targetRoute = "/dashboard" // Default route after login
}) {
    // Stagger container for grid
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // Item animation
    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    const loginUrl = `/login?redirect=${encodeURIComponent(targetRoute)}`;

    return (
        <div className="bg-white dark:bg-black font-sans">
            {/* HERO */}
            <div className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
                <div className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br ${heroGradient} opacity-20 blur-[100px] pointer-events-none`}></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                            Feature Spotlight
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {subtitle}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to={loginUrl} className="px-8 py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2 transform hover:-translate-y-1">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* FEATURES GRID */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                className="group p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-xl hover:bg-white dark:hover:bg-white/10"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon && <feature.icon className="w-7 h-7 text-primary" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{ctaTitle}</h2>
                        <p className="text-slate-500 mb-8 max-w-xl mx-auto">{ctaText}</p>
                        <Link to={loginUrl} className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Get Started Now
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
