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
    Activity,
    MoreHorizontal
} from 'lucide-react';
import { getAccounts, getProfiles, getDashboardAnalytics } from '../services/api'; // Added getDashboardAnalytics
import Onboarding from '../components/dashboard/Onboarding';
import Composer from '../components/dashboard/Composer';

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token] = useState(localStorage.getItem('token'));
    // State for real analytics data
    const [dashboardData, setDashboardData] = useState({
        stats: [
            { title: 'Total Reach', value: '0', change: '0%', isPositive: true, icon: Users },
            { title: 'Engagement', value: '0%', change: '0%', isPositive: true, icon: Activity },
            { title: 'Scheduled', value: '0', change: 'Next: --', isPositive: true, icon: Calendar },
            { title: 'Published', value: '0', change: '+0', isPositive: true, icon: Send },
        ],
        recent_activity: []
    });

    useEffect(() => {
        if (token) {
            loadData();
        } else {
            setLoading(false);
        }
    }, [token]);

    const loadData = async () => {
        try {
            // Parallel fetch for speed
            const [accountsData, analyticsData] = await Promise.all([
                getAccounts(),
                getDashboardAnalytics()
            ]);

            setAccounts(accountsData?.accounts || []);

            if (analyticsData) {
                // Map icon strings back to components if needed, or rely on consistent naming
                // The backend returns "Users", "Activity" etc strings for icons. 
                // We need to map them to the actual imported Logic components.
                const iconMap = { 'Users': Users, 'Activity': Activity, 'Calendar': Calendar, 'CheckCircle': Send, 'Send': Send, 'Zap': Zap };

                const statsWithIcons = (analyticsData.stats || []).map(s => ({
                    ...s,
                    icon: iconMap[s.icon] || Users
                }));

                setDashboardData({
                    stats: statsWithIcons.length ? statsWithIcons : dashboardData.stats,
                    recent_activity: analyticsData.recent_activity || []
                });
            }

        } catch (err) {
            console.error("Failed to load dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 h-96">
                <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
            </div>
        );
    }

    if (accounts.length === 0) {
        return <Onboarding onComplete={loadData} />;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your social performance.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={loadData} className="btn-secondary flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Post
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardData.stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="p-2 bg-indigo-50 dark:bg-slate-800 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <stat.icon className="w-5 h-5" />
                            </span>
                            {stat.change && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-red-50 text-red-600'}`}>
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Composer & posts) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Compose */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Quick Compose</h3>
                        </div>
                        <Composer
                            accounts={accounts}
                            selectedAccounts={accounts.map(a => a.accountId)} // Default select all for convenience
                            onAccountToggle={() => { }}
                            onSuccess={loadAccounts}
                        />
                    </div>

                    {/* Performance Chart Placeholder */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-3">
                            <BarChart3 className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Overview</h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-sm">Connect more data sources to unlock advanced analytics and engagement forecasting.</p>
                    </div>
                </div>

                {/* Right Column (Activity/Sidebar) */}
                <div className="space-y-8">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-6">
                            {dashboardData.recent_activity.length > 0 ? (
                                dashboardData.recent_activity.map(activity => (
                                    <ActivityItem
                                        key={activity.id}
                                        title={activity.title}
                                        desc={activity.description}
                                    />
                                ))
                            ) : (
                                <p className="text-sm text-slate-500">No recent activity.</p>
                            )}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            View All History
                        </button>
                    </div>

                    {/* Connected Accounts Summary */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connected Accounts</h3>
                        <div className="space-y-3">
                            {accounts.slice(0, 3).map(acc => (
                                <div key={acc.accountId} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-400 uppercase">
                                        {acc.platform[0]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{acc.displayName}</p>
                                        <p className="text-xs text-slate-500 truncate">@{acc.username}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                </div>
                            ))}
                            {accounts.length > 3 && (
                                <p className="text-xs text-slate-500 text-center pt-2">+{accounts.length - 3} more connected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ title, desc }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500"></div>
            <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
        </div>
    );
}

