import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users, ArrowRight,
    Globe, CheckCircle, Clock, BarChart3, MessageSquare, Zap, Shield, Code, ChevronRight, Briefcase,
    Radio, Megaphone, Lock, Layout, Workflow, Target, Boxes, Share2
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { SentimentCard, SocialPostCard, AiAssistCard, StatsCard } from '../components/FloatingWidgets';
import VideoHero from '../components/VideoHero';
import heroImage from '../assets/hero-person-wide.png';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
    return (
        <div className="bg-white dark:bg-black font-sans">

            {/* THE EVOLUTION SEQUENCE (Taste-Skill) */}
            <VideoHero />

            {/* STRATEGIC VALUE SECTION */}
            <div className="py-24 bg-white dark:bg-black relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2 border-b-2 border-slate-100 dark:border-white/10 pb-4 inline-block">Strategic Value</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                        <UserCaseItem
                            title="Orchestrate Multi-Channel Campaigns"
                            desc="Launch synchronized campaigns across LinkedIn, X, Instagram, and more without the chaos. One calendar, total control."
                        />
                        <UserCaseItem
                            title="Convert Followers into Revenue"
                            desc="Stop guessing. Track the direct impact of social posts on your bottom line with advanced conversion attribution."
                        />
                        <UserCaseItem
                            title="Predictive Performance Analytics"
                            desc="Go beyond vanity metrics. Our AI analyzes historical data to tell you exactly what to post and when for maximum reach."
                        />
                        <UserCaseItem
                            title="Scale Brand Authority"
                            desc="Sustain a 24/7 presence with evergreen content recycling and smart-queue technology that keeps your feed active."
                        />
                        <UserCaseItem
                            title="Unify Team Workflows"
                            desc="Eliminate bottlenecks. specialized roles, approval chains, and audit logs keep your team compliant and efficient."
                        />
                        <UserCaseItem
                            title="Delight Customers Instantly"
                            desc="Never miss a query. Consolidate every DM and comment into a single priority inbox with AI-suggested replies."
                        />
                    </div>
                </div>
            </div>

            {/* PLATFORM CAPABILITIES (Formerly Platform Overview) */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-4 gap-12">

                        {/* Column 1: Core Automation */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Core Automation</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={MessageSquare}
                                    title="Unified Inbox"
                                    desc="Zero-inbox methodology for all your social channels."
                                />
                                <FeatureItem
                                    icon={Calendar}
                                    title="Visual Scheduler"
                                    desc="Drag-and-drop planning with 'Best Time to Post' AI."
                                />
                                <FeatureItem
                                    icon={BarChart3}
                                    title="Executive Reporting"
                                    desc="Automated, white-labeled PDF reports delivered to stakeholders."
                                />
                            </div>
                        </div>

                        {/* Column 2: Growth Intelligence */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Growth Intelligence</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={TrendingUp}
                                    title="ROI Attribution"
                                    desc="Connect social engagement directly to CRM and web conversions."
                                />
                                <FeatureItem
                                    icon={Radio}
                                    title="Competitor Listening"
                                    desc="Monitor share of voice and sentiment against your market rivals."
                                />
                                <FeatureItem
                                    icon={Users}
                                    title="Creator Management"
                                    desc="Discover, vet, and manage influencer partnerships in one CRM."
                                />
                                <FeatureItem
                                    icon={Share2}
                                    title="Employee Amplification"
                                    desc="Turn your workforce into a distribution engine with curated sharing."
                                />
                            </div>
                        </div>

                        {/* Column 3: Ecosystem (Sidebar) */}
                        <div className="lg:col-span-1 lg:col-start-4 bg-slate-100 dark:bg-white/5 p-8 rounded-2xl h-fit">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-6">Ecosystem</h3>
                            <div className="space-y-6">
                                <PlatformLink title="Take the Product Tour" />
                                <PlatformLink title="AI Ghostwriter" />
                                <PlatformLink title="CRM Integrations" />
                                <PlatformLink title="Enterprise Security" />
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                                <Link to="/login" className="block w-full py-3 bg-primary hover:bg-primaryHover text-white text-center font-bold rounded-xl transition-colors shadow-lg">
                                    Request Custom Demo
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Bottom */}
            <div className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to modernize your social stack?</h2>
                    <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-bold text-xl rounded-2xl hover:bg-slate-50 transition-colors shadow-2xl">
                        Start 30-Day Free Trial
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
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-light text-base">{desc}</p>
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
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">{desc}</p>
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
