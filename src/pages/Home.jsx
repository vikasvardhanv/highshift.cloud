import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users, ArrowRight,
    Globe, CheckCircle, Clock, BarChart3, MessageSquare, Zap, Shield, Code, ChevronRight, Briefcase,
    Radio, Megaphone, Lock, Layout, Workflow
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { SentimentCard, SocialPostCard, AiAssistCard, StatsCard } from '../components/FloatingWidgets';
import heroImage from '../assets/hero-person.png';

export default function Home() {
    return (
        <div className="bg-white dark:bg-black font-sans">

            {/* HERO SECTION */}
            <div className="relative bg-slate-950 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left z-10">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                                Powerful tools for <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                                    social media
                                </span> management.
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                HighShift Cloud unifies your social workflow. Schedule, analyze, and engage across all platforms from a single, intuitive dashboard.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link to="/login" className="px-8 py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-lg transition-all border border-white/10">
                                    Schedule a Demo
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-bold">No credit card required • 30-day free trial</p>
                        </div>

                        {/* Hero Image & Widgets */}
                        <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-[4/3] group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 mix-blend-overlay z-10"></div>
                                <img
                                    src={heroImage}
                                    alt="Social Media Manager working"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* Floating Widgets Overlay */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="relative w-full h-full">
                                        <SentimentCard />
                                        <SocialPostCard />
                                        <AiAssistCard />
                                        <StatsCard />
                                    </div>
                                </div>
                            </div>

                            {/* Glow effects */}
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* USE CASES SECTION (Image 1 Style) */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2 border-b-2 border-slate-100 dark:border-white/10 pb-4 inline-block">By use case</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                        <UserCaseItem
                            title="Manage social media"
                            desc="Bolster your marketing efforts with intuitive, assistive tools."
                        />
                        <UserCaseItem
                            title="Drive more sales"
                            desc="Sell more efficiently with product and customer information in one place."
                        />
                        <UserCaseItem
                            title="Gather deeper insights"
                            desc="Leverage AI to distill listening and performance data into strategic insights."
                        />
                        <UserCaseItem
                            title="Amplify brand awareness"
                            desc="Maximize the impact and reach of your social efforts to drive better business results."
                        />
                        <UserCaseItem
                            title="Streamline workflows"
                            desc="Reduce complexity by managing multiple processes in a single tool."
                        />
                        <UserCaseItem
                            title="Personalize customer care"
                            desc="Create positive brand experiences with quick, tailored responses."
                        />
                    </div>
                </div>
            </div>

            {/* PLATFORM OVERVIEW (Image 2 Style) */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-4 gap-12">

                        {/* Column 1: Core Features */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Core features</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={MessageSquare}
                                    title="Engagement"
                                    desc="Streamline and scale your customer care and community management."
                                />
                                <FeatureItem
                                    icon={Calendar}
                                    title="Publishing"
                                    desc="Effortlessly plan, create, manage and deliver social content and campaigns."
                                />
                                <FeatureItem
                                    icon={BarChart3}
                                    title="Analytics"
                                    desc="Drive strategic decision making across your entire business."
                                />
                            </div>
                        </div>

                        {/* Column 2: Premium Solutions */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Premium solutions</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={TrendingUp}
                                    title="Premium Analytics"
                                    desc="Prove your social media ROI with customized data and reports."
                                />
                                <FeatureItem
                                    icon={Radio}
                                    title="Listening"
                                    desc="Uncover trends and actionable insights from social conversations."
                                />
                                <FeatureItem
                                    icon={Users}
                                    title="Influencer Marketing"
                                    desc="Build and manage partnerships with influencers and content creators."
                                />
                                <FeatureItem
                                    icon={Megaphone}
                                    title="Employee Advocacy"
                                    desc="Amplify your social reach by empowering employees to become brand advocates."
                                />
                            </div>
                        </div>

                        {/* Column 3: Platform Links (Sidebar) */}
                        <div className="lg:col-span-1 lg:col-start-4 bg-slate-100 dark:bg-white/5 p-8 rounded-2xl h-fit">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-6">Platform</h3>
                            <div className="space-y-6">
                                <PlatformLink title="Product tour" />
                                <PlatformLink title="AI and automation" />
                                <PlatformLink title="Integrations" />
                                <PlatformLink title="Data and security" />
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                                <Link to="/login" className="block w-full py-3 bg-primary hover:bg-primaryHover text-white text-center font-bold rounded-xl transition-colors">
                                    Request Demo
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* HOW IT WORKS (Animated) */}
            <HowItWorks />

            {/* RESOURCES & API */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Resources & Developers</h2>
                        <p className="text-slate-500">Tools to help you build and learn.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* API Card */}
                        <div className="group bg-slate-950 rounded-3xl p-8 relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Code className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">HighShift API</h3>
                                <p className="text-slate-400 mb-6 text-sm">
                                    Build custom integrations and automate your workflow with our robust API.
                                </p>
                                <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-green-400 mb-6 border border-white/10">
                                    GET /api/v1/posts
                                </div>
                                <Link to="/docs" className="inline-flex items-center gap-2 text-sm font-bold hover:text-green-400 transition-colors">
                                    Read Documentation <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Community & Blog</h3>
                            <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm">
                                Learn social media strategies from industry experts and our community.
                            </p>
                            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                Explore Articles <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Help Center</h3>
                            <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm">
                                Guides, tutorials, and support to get the most out of HighShift.
                            </p>
                            <Link to="/help" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                Visit Help Center <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Bottom */}
            <div className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to start your free trial?</h2>
                    <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-bold text-xl rounded-2xl hover:bg-slate-50 transition-colors shadow-2xl">
                        Get Started Now
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helpers
function UserCaseItem({ title, desc }) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-light">{desc}</p>
        </div>
    )
}

function FeatureItem({ icon: Icon, title, desc }) {
    return (
        <div className="group">
            <div className="flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6 text-slate-900 dark:text-white" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function PlatformLink({ title }) {
    return (
        <a href="#" className="flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-white/10 p-2 -mx-2 rounded-lg transition-colors">
            <span className="text-lg font-bold text-slate-900 dark:text-white">{title}</span>
            <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
        </a>
    )
}
