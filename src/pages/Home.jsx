import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users, ArrowRight,
    Globe, CheckCircle, Clock, BarChart3, MessageSquare, Zap, Shield, Code, ChevronRight, Briefcase,
    Radio, Megaphone, Lock, Layout, Workflow, Target, Boxes, Share2, Play
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { SentimentCard, SocialPostCard, AiAssistCard, StatsCard } from '../components/FloatingWidgets';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../assets/hero-person-wide.png';

export default function Home() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="bg-slate-950 min-h-screen font-sans text-slate-100 selection:bg-indigo-500/30">

            {/* NAVBAR (Simple absolute for landing) */}
            <nav className="absolute top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">HighShift<span className="text-indigo-500">.AI</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#resources" className="hover:text-white transition-colors">Resources</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Log In</Link>
                        <Link
                            to="/login"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            New: LinkedIn & Facebook Media Uploads Live
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                        >
                            The Operating System for <br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                                Modern Social Teams
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
                        >
                            Orchestrate your entire brand presence from one command center.
                            Automate scheduling, unify conversations, and prove ROI with AI-powered precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-lg transition-all shadow-xl shadow-indigo-600/20 hover:scale-105 flex items-center gap-2"
                            >
                                Start 14-Day Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-lg transition-all border border-white/10 hover:border-white/20 flex items-center gap-2">
                                <Play className="w-5 h-5 fill-current" />
                                Watch Demo
                            </button>
                        </motion.div>
                    </div>

                    {/* Dashboard Preview */}
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale }}
                        className="relative max-w-6xl mx-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden group"
                    >
                        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <img
                            src={heroImage}
                            alt="Dashboard Preview"
                            className="w-full h-auto opacity-90 group-hover:scale-[1.01] transition-transform duration-700 hover:opacity-100"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none"></div>
                    </motion.div>
                </div>
            </div>

            {/* SOCIAL PROOF */}
            <div className="py-12 border-y border-white/5 bg-slate-900/30">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by forward-thinking teams</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos - simplified with text/icons for now */}
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><Globe className="w-6 h-6" /> Acme Corp</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><Zap className="w-6 h-6" /> BoltShift</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><Boxes className="w-6 h-6" /> CubeScale</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><Target className="w-6 h-6" /> GoalLine</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-white"><Shield className="w-6 h-6" /> SecureNet</div>
                    </div>
                </div>
            </div>

            {/* BENTO GRID FEATURES */}
            <div id="features" className="py-24 md:py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to <span className="text-indigo-400">scale social</span></h2>
                        <p className="text-lg text-slate-400">Replace your fragmented stack with one unified cohesive operating system designed for performance.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {/* Feature 1 - Large */}
                        <div className="md:col-span-2 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                                <Calendar className="w-64 h-64 text-indigo-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Calendar className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Unified Visual Scheduling</h3>
                                <p className="text-slate-400 max-w-lg mb-8">
                                    Drag, drop, and dominate. Visualize your entire content calendar across X, LinkedIn, Instagram, and Facebook in one view. Use AI to auto-fill gaps.
                                </p>
                                <div className="bg-slate-950 border border-white/10 rounded-xl p-4 max-w-md shadow-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            Scheduled for Tomorrow
                                        </div>
                                        <span className="text-xs text-slate-500">10:00 AM</span>
                                    </div>
                                    <div className="h-2 w-3/4 bg-slate-800 rounded mb-2"></div>
                                    <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition-colors group">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Ghostwriter AI</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Never stare at a blank cursor again. Generate high-converting captions, hooks, and threads tailored to your brand voice in seconds.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors group">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                <BarChart3 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Prove your worth. Track engagement, audience growth, and click-through rates with beautiful, exportable reports.
                            </p>
                        </div>

                        {/* Feature 4 - Large */}
                        <div className="md:col-span-2 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                                <MessageSquare className="w-64 h-64 text-blue-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <MessageSquare className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Unified Social Inbox</h3>
                                <p className="text-slate-400 max-w-lg mb-8">
                                    Stop tab switching. Reply to comments, DMs, and mentions from all platforms in a single, zero-inbox workflow.
                                </p>
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20">LinkedIn DMs</div>
                                    <div className="px-4 py-2 rounded-lg bg-pink-500/10 text-pink-400 text-sm font-semibold border border-pink-500/20">Instagram Commments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <HowItWorks />
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-12 md:p-24 text-center border border-white/10 shadow-2xl relative overflow-hidden">

                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto">
                            Ready to transform your social strategy?
                        </h2>
                        <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
                            Join thousands of marketers who are saving 20+ hours a week and driving 3x more engagement with HighShift.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/login"
                                className="px-10 py-5 bg-white text-indigo-900 font-bold rounded-xl text-xl hover:bg-indigo-50 transition-colors shadow-xl"
                            >
                                Start Free Trial
                            </Link>
                            <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-xl text-xl hover:bg-white/5 transition-colors">
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="py-12 border-t border-white/5 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white" fill="currentColor" />
                                </div>
                                <span className="text-xl font-bold text-white">HighShift</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6">
                                The intelligent operating system for modern social media teams.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={Globe} />
                                <SocialIcon icon={Share2} />
                                <SocialIcon icon={MessageSquare} />
                            </div>
                        </div>

                        <FooterCol title="Product" links={['Features', 'Pricing', 'API', 'Integrations', 'Changelog']} />
                        <FooterCol title="Resources" links={['Blog', 'Community', 'Help Center', 'Webinars', 'Status']} />
                        <FooterCol title="Company" links={['About', 'Careers', 'Legal', 'Privacy', 'Contact']} />
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                        <p>© 2026 HighShift Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FooterCol({ title, links }) {
    return (
        <div>
            <h4 className="font-bold text-white mb-4">{title}</h4>
            <ul className="space-y-2">
                {links.map(link => (
                    <li key={link}>
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors">{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function SocialIcon({ icon: Icon }) {
    return (
        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
            <Icon className="w-4 h-4" />
        </a>
    )
}
