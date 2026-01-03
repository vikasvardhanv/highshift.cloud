import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function FeaturePageTemplate({
    title,
    subtitle,
    heroImage,
    heroGradient = "from-blue-600 to-indigo-600",
    features = [],
    ctaTitle = "Ready to get started?",
    ctaText = "Join thousands of brands using HighShift to grow."
}) {
    return (
        <div className="bg-white dark:bg-black font-sans">
            {/* HERO */}
            <div className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
                <div className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br ${heroGradient} opacity-20 blur-[100px] pointer-events-none`}></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                        Feature Spotlight
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {subtitle}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/login" className="px-8 py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl text-lg transition-all shadow-lg flex items-center gap-2">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FEATURES GRID */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 pl-1 pt-1">
                                    {feature.icon && <feature.icon className="w-6 h-6 text-primary" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{ctaTitle}</h2>
                    <p className="text-slate-500 mb-8 max-w-xl mx-auto">{ctaText}</p>
                    <Link to="/login" className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
