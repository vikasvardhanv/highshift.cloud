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
    BarChart3,
    ArrowUpRight,
    Activity
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
            <div className="flex flex-col items-center justify-center p-24 gap-4 animate-in fade-in duration-500">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
                <p className="text-sm font-medium text-slate-500">Loading Dashboard...</p>
            </div>
        );
    }

    if (accounts.length === 0) {
        return <Onboarding onComplete={loadAccounts} />;
    }

    return (
        <div className="space-y-8 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Manage your social presence and content performance.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Connected</span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{accounts.length} <span className="text-slate-400 text-sm font-normal">/ 12</span></span>
                    </div>

                    <button
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm"
                    >
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>{selectedProfile === 'all' ? 'All Profiles' : 'Custom Profile'}</span>
                        <RefreshCw className="w-3 h-3 text-slate-400" />
                    </button>

                    <button className="h-10 w-10 bg-primary hover:bg-primary-hover text-white rounded-lg shadow-md transition-all flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Reach" value="24.8k" change="+14%" icon={Users} />
                <StatCard title="Engagement Rate" value="9.2%" change="+2.4%" icon={Activity} />
                <StatCard title="Posts Published" value="842" change="+34" icon={Send} />
                <StatCard title="Scheduled" value="12" change="Next: 1h" icon={Calendar} />
            </div>

            {/* Composer Section */}
            <div className="glass-card p-1">
                <Composer
                    accounts={accounts}
                    selectedAccounts={selectedAccounts}
                    onAccountToggle={toggleAccountSelection}
                    onSuccess={loadAccounts}
                />
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart Placeholder */}
                <div className="lg:col-span-2 glass-card p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <BarChart3 className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Analytics</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-sm">
                        Connect more accounts to unlock detailed cross-platform analytics and forecasting.
                    </p>
                    <button className="mt-6 px-4 py-2 text-sm font-medium text-primary hover:text-primary-hover hover:underline">
                        View Full Report
                    </button>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Recent Activity
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <ActivityItem label="LinkedIn Post Published" time="14m ago" />
                        <ActivityItem label="Twitter Thread Scheduled" time="2h ago" />
                        <ActivityItem label="Weekly Report Generated" time="5h ago" />
                        <ActivityItem label="New Instagram Connection" time="1d ago" />
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            View Activity Log
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon }) {
    const isPositive = change.includes('+');
    return (
        <div className="glass-card p-6 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                </div>
                <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                    {change}
                </span>
                {isPositive && <span className="text-[10px] text-slate-400">vs last period</span>}
            </div>
        </div>
    );
}

function ActivityItem({ label, time }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{time}</p>
            </div>
        </div>
    );
}

