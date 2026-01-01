import { useNavigate } from 'react-router-dom';
import { Check, X, Zap, Shield, Globe } from 'lucide-react';

const TIERS = [
    {
        name: 'Free Forever',
        price: '$0',
        period: '/month',
        description: 'Perfect for individuals just starting out',
        features: [
            '3 Social Accounts',
            '10 AI-Optimized Posts/mo',
            'Basic Analytics (24h)',
            '1 User Seat',
        ],
        notIncluded: [
            'Smart Scheduling',
            'Team Collaboration',
            'Priority Support'
        ],
        cta: 'Get Started Free',
        highlight: false
    },
    {
        name: 'Starter',
        price: '$10',
        period: '/month',
        description: 'For creators and solopreneurs',
        features: [
            '10 Social Accounts',
            '300 AI-Optimized Posts/mo',
            'Smart Scheduling',
            '30 Days Analytics',
            'Priority Support'
        ],
        notIncluded: [
            'Team Collaboration',
            'White Label Reports'
        ],
        cta: 'Start Free Trial',
        highlight: true,
        tag: 'Most Popular'
    },
    {
        name: 'Pro Agency',
        price: '$29',
        period: '/month',
        description: 'Power for teams and agencies',
        features: [
            '50 Social Accounts',
            'Unlimited AI Ghostwriter',
            '5 Team Seats',
            '1 Year Analytics',
            'Priority API Access',
            'White Label Reports'
        ],
        notIncluded: [],
        cta: 'Contact Sales', // or Get Started
        highlight: false
    }
];

export default function Pricing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen py-20 px-4 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Choose the plan that fits your growth. No hidden fees. Cancel anytime.
                    </p>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

                    {TIERS.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-5px] flex flex-col
                            ${tier.highlight
                                    ? 'bg-white/10 border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                                    : 'bg-black/40 border-white/10 hover:bg-white/5'}`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg uppercase tracking-wider">
                                    {tier.tag}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-gray-400 text-sm">{tier.period}</span>
                                </div>
                                <p className="text-sm text-gray-400">{tier.description}</p>
                            </div>

                            <button
                                onClick={() => navigate('/login')}
                                className={`w-full py-4 rounded-xl font-bold mb-8 transition-all flex items-center justify-center gap-2
                                ${tier.highlight
                                        ? 'bg-primary hover:bg-primaryHover text-white shadow-lg'
                                        : 'bg-white/10 hover:bg-white/20 text-white'}`}
                            >
                                {tier.cta} <Zap className="w-4 h-4" />
                            </button>

                            <div className="space-y-4 flex-1">
                                {tier.features.map((feat, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm">
                                        <div className={`p-1 rounded-full shrink-0 ${tier.highlight ? 'bg-primary/20' : 'bg-white/10'}`}>
                                            <Check className={`w-3 h-3 ${tier.highlight ? 'text-primary' : 'text-gray-400'}`} />
                                        </div>
                                        <span className="text-gray-300">{feat}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feat, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm opacity-50">
                                        <div className="p-1 rounded-full bg-white/5 shrink-0">
                                            <X className="w-3 h-3 text-gray-500" />
                                        </div>
                                        <span className="text-gray-500 line-through">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust/Social Proof */}
                <div className="mt-24 text-center border-t border-white/5 pt-16">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">Trusted by next-gen creators</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos */}
                        <div className="flex items-center gap-2 text-xl font-bold"><Globe className="w-6 h-6" /> GlobalScale</div>
                        <div className="flex items-center gap-2 text-xl font-bold"><Shield className="w-6 h-6" /> SecureTech</div>
                        <div className="flex items-center gap-2 text-xl font-bold"><Zap className="w-6 h-6" /> FastGrowth</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
