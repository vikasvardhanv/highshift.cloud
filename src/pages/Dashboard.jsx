import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Users,
    RefreshCw,
    Plus,
    Loader2,
    Zap,
    Send,
    Calendar,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAccounts, getProfiles } from '../services/api';
import Onboarding from '../components/dashboard/Onboarding';
import Composer from '../components/dashboard/Composer';

export default function Dashboard() {
    const location = useLocation();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiKey] = useState(localStorage.getItem('social_api_key'));
    const [token] = useState(localStorage.getItem('token'));

    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState('all');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const isAuthenticated = token || apiKey;

    useEffect(() => {
        if (isAuthenticated) {
            loadAccounts();
            loadProfiles();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const loadAccounts = async () => {
        try {
            const data = await getAccounts();
            if (data && Array.isArray(data.accounts)) {
                setAccounts(data.accounts);
                // Select all for initial load
                setSelectedAccounts(data.accounts.map(a => a.accountId));
            } else {
                setAccounts([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadProfiles = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAccountSelection = (id) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter(a => a !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 gap-4 animate-fade-in">
                <Loader2 className="animate-spin text-primary w-12 h-12" />
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Waking Neural Nodes...</p>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
    };

    if (accounts.length === 0) {
        return <Onboarding onComplete={loadAccounts} />;
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-32 relative z-10"
        >
            {/* High-Motion Header */}
            <motion.div variants={item} className="relative p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-primary/15 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -ml-40 -mb-40 group-hover:bg-blue-500/10 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="py-1.5 px-4 rounded-full bg-primary/20 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/10">
                                Command Node Alpha
                            </span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
                            Creation Studio
                        </h1>
                        <p className="text-slate-500 max-w-xl text-sm font-medium leading-relaxed">
                            Orchestrate complex narratives across the global social fabric. Unified intelligence and high-velocity broadcasting at your fingertips.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end mr-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-1">Active Uplinks</span>
                            <span className="text-2xl font-black text-white">{accounts.length} <span className="text-slate-800">/ 12</span></span>
                        </div>
                        <button
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-widest backdrop-blur-xl group/btn"
                        >
                            <Users className="w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                            <span>{selectedProfile === 'all' ? 'Universal Sync' : 'Static Profile'}</span>
                            <RefreshCw className="w-4 h-4 text-slate-600 group-hover/btn:rotate-180 transition-transform duration-700" />
                        </button>
                        <button className="w-14 h-14 bg-primary hover:bg-primaryHover text-white rounded-[1.5rem] shadow-2xl shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center border border-white/10">
                            <Plus className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Premium Widgets Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Global Reach" value="24.8k" change="+14%" icon={Users} type="primary" />
                <StatCard title="Resonance" value="9.2%" change="+2.4%" icon={Zap} type="emerald" />
                <StatCard title="Broadcasts" value="842" change="+34" icon={Send} type="blue" />
                <StatCard title="Temporal" value="12" change="Next: 1h" icon={Calendar} type="violet" />
            </motion.div>

            {/* Neural Forge (Composer) */}
            <motion.div variants={item} className="relative group/studio">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-[3rem] blur-[30px] opacity-10 group-hover/studio:opacity-25 transition duration-1000"></div>
                <Composer
                    accounts={accounts}
                    selectedAccounts={selectedAccounts}
                    onAccountToggle={toggleAccountSelection}
                    onSuccess={loadAccounts}
                />
            </motion.div>

            {/* Lower Logistics Grid */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 min-h-[450px] flex flex-col justify-center items-center relative overflow-hidden group/chart border-l border-t border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/chart:opacity-100 transition-opacity duration-1000"></div>
                    <div className="text-center relative z-10 space-y-6">
                        <div className="w-20 h-20 bg-slate-950 rounded-3xl border border-white/10 flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-10 h-10 text-slate-700" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-slate-300">Neural Forecasting</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Aggregating cross-platform resonance patterns...</p>
                        </div>
                        <div className="flex gap-2 justify-center pt-4">
                            {[1, 2, 3, 4, 3, 5, 2].map((h, i) => (
                                <div key={i} className="w-1.5 bg-primary/20 rounded-full animate-bounce" style={{ height: `${h * 4}px`, animationDelay: `${i * 100}ms` }} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 min-h-[450px] flex flex-col border-r border-b border-white/10 shadow-2xl relative overflow-hidden group/pulse">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] opacity-0 group-hover/pulse:opacity-100 transition-opacity duration-1000"></div>
                    <h3 className="text-xl font-black mb-10 flex items-center gap-4 uppercase tracking-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Pulse Monitor
                    </h3>
                    <div className="space-y-10">
                        <PulseItem label="LinkedIn Sync Complete" time="14m ago" color="bg-primary" />
                        <PulseItem label="Temporal Slot Locked" time="2h ago" color="bg-blue-500" />
                        <PulseItem label="Neural Audit Report" time="5h ago" color="bg-slate-700" />
                        <PulseItem label="Target Node Expansion" time="1d ago" color="bg-violet-500" />
                    </div>
                    <div className="mt-auto pt-10">
                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                            View Monitor Logs
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function StatCard({ title, value, change, icon: Icon, type }) {
    const colors = {
        primary: 'text-primary bg-primary/10 border-primary/20 shadow-primary/10',
        emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10',
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10',
        violet: 'text-violet-500 bg-violet-500/10 border-violet-500/20 shadow-violet-500/10'
    };

    return (
        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 shadow-2xl group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity ${colors[type].split(' ')[2]}`}></div>

            <div className={`w-14 h-14 ${colors[type].split(' ').slice(1, 3).join(' ')} border rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${colors[type].split(' ')[3]}`}>
                <Icon className={`w-7 h-7 ${colors[type].split(' ')[0]}`} />
            </div>

            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</h3>
            <div className="flex items-baseline gap-3">
                <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
                <div className={`px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold ${change.includes('+') ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {change}
                </div>
            </div>
        </div>
    );
}

function PulseItem({ label, time, color }) {
    return (
        <div className="flex items-start gap-6 group cursor-crosshair">
            <div className={`mt-1.5 w-2 h-2 rounded-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-150 transition-transform duration-500`}></div>
            <div>
                <p className="text-sm font-black text-slate-300 group-hover:text-primary transition-colors duration-300">{label}</p>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">{time}</p>
            </div>
        </div>
    );
}

