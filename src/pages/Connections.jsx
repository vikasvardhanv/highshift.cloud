import { useEffect, useState } from 'react';
import { getAccounts, getAuthUrl, disconnectAccount } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trash2, Plus, Loader2, AtSign, Globe
} from 'lucide-react';

const PLATFORMS = [
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-sky-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    // { id: 'threads', name: 'Threads', icon: AtSign, color: 'text-black' },
];

export default function Connections() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const data = await getAccounts();
            setAccounts(data.accounts || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (platformId) => {
        try {
            const url = await getAuthUrl(platformId, window.location.origin + '/auth/callback');
            window.location.href = url;
        } catch (err) {
            alert('Failed to get auth URL: ' + err.message);
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Are you sure you want to disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadAccounts();
        } catch (err) {
            alert('Failed to disconnect');
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Connected Accounts</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Connect your social media profiles to enable publishing and analytics.
                </p>
            </div>

            {/* Available Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Existing Connected Accounts */}
                {accounts.map(acc => {
                    const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                    const Icon = platformCfg?.icon || Globe;

                    return (
                        <div key={acc.accountId} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between h-48">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${platformCfg?.color || 'text-slate-600'}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{acc.displayName}</h3>
                                        <p className="text-xs text-slate-500">@{acc.username}</p>
                                    </div>
                                </div>
                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                                    Connected
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{acc.platform}</span>
                                <button
                                    onClick={() => handleDisconnect(acc.platform, acc.accountId)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                    title="Disconnect"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Connect New Buttons */}
                {/* Group "Connect New" into a section if we have many, or listing them as available cards */}
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Add New Connection</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {PLATFORMS.map(p => (
                        <button
                            key={p.id}
                            onClick={() => handleConnect(p.id)}
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all rounded-xl group"
                        >
                            <div className={`w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform ${p.color}`}>
                                <p.icon className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {p.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
