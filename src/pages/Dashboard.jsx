import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccounts, getProfiles, createProfile } from '../services/api';
import { Plus, Loader2, RefreshCw, BarChart3, Users, Zap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Composer from '../components/dashboard/Composer';
import Onboarding from '../components/dashboard/Onboarding';

export default function Dashboard() {
    const location = useLocation();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiKey] = useState(localStorage.getItem('social_api_key'));
    const [token] = useState(localStorage.getItem('token'));

    // Account Selection State
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    // Profile state
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState('all');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Check if user is authenticated
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
                // Select all by default
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
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    // If no accounts connected, show ONBOARDING
    if (accounts.length === 0) {
        return <Onboarding onComplete={loadAccounts} />;
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 pb-20"
        >
            {/* Header with Premium Feel */}
            <motion.div variants={item} className="relative p-8 rounded-[2rem] bg-slate-900 border border-white/5 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                            Publishing Workspace
                        </span>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Command Center</h1>
                        <p className="text-slate-400 max-w-lg leading-relaxed">
                            Orchestrate your social strategy across all connected nodes with unified publishing and smart automation.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-bold backdrop-blur-md"
                            >
                                <Users className="w-4 h-4 text-primary" />
                                <span>{selectedProfile === 'all' ? 'All Accounts' : 'Specific Profile'}</span>
                                <RefreshCw className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>
                        <button className="p-3 bg-primary hover:bg-primaryHover text-white rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                            <Plus className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Audience"
                    value="12.4k"
                    change="+2.4%"
                    icon={Users}
                    color="text-blue-400"
                    bg="bg-blue-400/10"
                />
                <StatCard
                    title="Engagement Rate"
                    value="5.8%"
                    change="+1.2%"
                    icon={Zap}
                    color="text-emerald-400"
                    bg="bg-emerald-400/10"
                />
                <StatCard
                    title="Published Posts"
                    value="142"
                    change="+12"
                    icon={Send}
                    color="text-violet-400"
                    bg="bg-violet-400/10"
                />
                <StatCard
                    title="Scheduled"
                    value="28"
                    change="Next: 2h"
                    icon={Calendar}
                    color="text-amber-400"
                    bg="bg-amber-400/10"
                />
            </motion.div>

            {/* Creation Studio (Composer) */}
            <motion.div variants={item} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Composer
                    accounts={accounts}
                    selectedAccounts={selectedAccounts}
                    onAccountToggle={toggleAccountSelection}
                    onSuccess={loadAccounts}
                />
            </motion.div>

            {/* activity Placeholders */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900 border border-white/5 h-[400px] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-center relative z-10">
                        <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Predictive Growth Model (AI)</p>
                        <p className="text-slate-600 text-xs mt-2 italic">Synthesizing data from connected nodes...</p>
                    </div>
                </div>
                <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 h-[400px] flex flex-col relative overflow-hidden">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        Activity Pulse
                    </h3>
                    <div className="space-y-6">
                        <PulseItem label="LinkedIn Post Scheduled" time="2h ago" type="schedule" />
                        <PulseItem label="X Account Connected" time="5h ago" type="account" />
                        <PulseItem label="Weekly Report Generated" time="1d ago" type="report" />
                        <PulseItem label="New Post Published" time="2d ago" type="publish" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Sub-components for cleaner code
function StatCard({ title, value, change, icon: Icon, color, bg }) {
    return (
        <div className="p-6 rounded-[1.5rem] bg-slate-900 border border-white/5 hover:border-white/10 transition-all shadow-xl group">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">{value}</p>
                <span className={`text-[10px] font-bold ${change.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {change}
                </span>
            </div>
        </div>
    );
}

function PulseItem({ label, time, type }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
            <div>
                <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{time}</p>
            </div>
        </div>
    );
}

