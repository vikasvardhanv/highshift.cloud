import { useEffect, useState } from 'react';
import { getAccounts, getAuthUrl, disconnectAccount, getProfiles } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube, Music,
    Trash2, Plus, Loader2, Globe, CheckCircle2, AlertCircle, ArrowRight, X
} from 'lucide-react';

const PLATFORMS = [
    {
        id: 'twitter',
        name: 'Twitter / X',
        icon: Twitter,
        color: 'text-sky-500',
        bg: 'bg-sky-50 dark:bg-sky-900/20',
        border: 'hover:border-sky-200 dark:hover:border-sky-800',
        desc: 'Publish tweets, threads, and analyze engagement.'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: Facebook,
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'hover:border-blue-200 dark:hover:border-blue-800',
        desc: 'Manage pages, publish posts, and track metrics.'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: Instagram,
        color: 'text-pink-600',
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        border: 'hover:border-pink-200 dark:hover:border-pink-800',
        desc: 'Post photos, reels, and stories to your feed.'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: Linkedin,
        color: 'text-blue-700',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'hover:border-blue-200 dark:hover:border-blue-800',
        desc: 'Share professional updates to personal & company pages.'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: Youtube,
        color: 'text-red-600',
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'hover:border-red-200 dark:hover:border-red-800',
        desc: 'Upload videos and manage your channel.'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: Music,
        color: 'text-slate-900 dark:text-white',
        bg: 'bg-slate-100 dark:bg-slate-800',
        border: 'hover:border-slate-300 dark:hover:border-slate-600',
        desc: 'Share short-form videos to reach a global audience.'
    },
];

const COMING_SOON = [
    { name: 'Pinterest', icon: Globe },
    { name: 'Threads', icon: Globe },
];

export default function Connections() {
    const [accounts, setAccounts] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectingPlatform, setConnectingPlatform] = useState(null); // Platform ID when modal open

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [accData, profData] = await Promise.all([
                getAccounts(),
                getProfiles()
            ]);
            setAccounts(accData.accounts || []);
            setProfiles(profData || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnectClick = (platformId) => {
        // Smart Connect: If only 1 profile, use it automatically.
        if (profiles.length === 1) {
            startAuth(platformId, profiles[0].id);
        } else if (profiles.length === 0) {
            // Should prompt to create profile, but for now alert
            alert("Please create a profile in 'User Management' first.");
            window.location.href = '/profiles';
        } else {
            // Open Modal
            setConnectingPlatform(platformId);
        }
    };

    const startAuth = async (platformId, profileId) => {
        try {
            const url = await getAuthUrl(platformId, window.location.origin + '/auth/callback', profileId);
            window.location.href = url;
        } catch (err) {
            alert('Failed to get auth URL: ' + err.message);
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Are you sure you want to disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadData();
        } catch (err) {
            alert('Failed to disconnect');
        }
    }

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Integrations</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                    Connect your social channels to unlock publishing, analytics, and listening.
                </p>
            </div>

            {/* Available Platforms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PLATFORMS.map(p => (
                    <div key={p.id} className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${p.border}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-14 h-14 rounded-xl ${p.bg} flex items-center justify-center ${p.color}`}>
                                <p.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            {/* Connection Status Badge */}
                            {accounts.some(a => a.platform === p.id) && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold ring-1 ring-emerald-100">
                                    <CheckCircle2 className="w-3 h-3" /> Connected
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{p.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 min-h-[40px]">
                            {p.desc}
                        </p>

                        <button
                            onClick={() => handleConnectClick(p.id)}
                            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {accounts.some(a => a.platform === p.id) ? 'Connect Another' : 'Connect'} <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ))}

                {/* Coming Soon Area */}
                <div className="xl:col-span-1 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Coming Soon</h3>
                    <div className="space-y-3">
                        {COMING_SOON.map(c => (
                            <div key={c.name} className="flex items-center gap-3 text-slate-500 dark:text-slate-400 opacity-75">
                                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <c.icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Connections List */}
            {accounts.length > 0 && (
                <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Active Connections</h2>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 uppercase text-xs font-bold text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Platform</th>
                                        <th className="px-6 py-4">Account Name</th>
                                        <th className="px-6 py-4">Profile</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {accounts.map(acc => {
                                        const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                                        const Icon = platformCfg?.icon || Globe;
                                        const profileName = profiles.find(p => p.id === acc.profileId)?.name || 'Default';

                                        return (
                                            <tr key={acc.accountId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${platformCfg?.bg || 'bg-slate-100'} ${platformCfg?.color}`}>
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">{acc.platform}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                                                    @{acc.username}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-bold dark:bg-indigo-900/30 dark:text-indigo-300">
                                                        {profileName}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDisconnect(acc.platform, acc.accountId)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        title="Disconnect"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Selection Modal */}
            {connectingPlatform && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select User Profile</h3>
                            <button onClick={() => setConnectingPlatform(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-500">
                                Which user profile should this <strong>{connectingPlatform}</strong> account belong to?
                            </p>

                            <div className="grid gap-2 max-h-[240px] overflow-y-auto pr-1">
                                {profiles.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => startAuth(connectingPlatform, p.id)}
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left"
                                    >
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{p.name}</span>
                                        <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                            {p.accounts?.length || 0} accounts
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <a href="/profiles" className="flex items-center justify-center gap-2 text-sm text-indigo-600 font-bold hover:underline py-2">
                                    <Plus className="w-4 h-4" /> Create New Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
