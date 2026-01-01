import { useEffect, useState } from 'react';
import { getAccounts, getAuthUrl, disconnectAccount } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trash2, Plus, Zap, Cloud, Loader2, AtSign, Pin, MessageSquare, Music
} from 'lucide-react';

const PLATFORMS = [
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'hover:text-sky-400' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-600' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'hover:text-red-500' },
    { id: 'threads', name: 'Threads', icon: AtSign, color: 'hover:text-white' },
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
        <div className="space-y-8 animate-fade-in relative z-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Connections</h1>
                    <p className="text-gray-400">Manage your connected social platforms</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New Card */}
                <div className="glass-card p-6 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-4 min-h-[200px] hover:bg-white/5 transition-all">
                    <div className="p-4 rounded-full bg-primary/20 text-primary mb-2">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg">Connect New</h3>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {PLATFORMS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => handleConnect(p.id)}
                                className="p-2 rounded-full bg-surface border border-white/10 hover:border-primary/50 transition-all text-gray-400 hover:text-white"
                                title={p.name}
                            >
                                <p.icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Cards */}
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
                ) : (
                    accounts.map(acc => (
                        <div key={acc.accountId} className="glass-card p-6 rounded-3xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => handleDisconnect(acc.platform, acc.accountId)} className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center pt-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-surfaceHighlight to-surface border border-white/10 flex items-center justify-center shadow-lg mb-4">
                                    {PLATFORMS.find(p => p.id === acc.platform)?.icon({ className: "w-8 h-8 text-white" }) || <Zap className="w-8 h-8" />}
                                </div>
                                <h3 className="font-bold text-lg truncate w-full px-2">{acc.displayName}</h3>
                                <p className="text-sm text-gray-400 mb-4">@{acc.username}</p>

                                <div className="w-full py-2 rounded-xl bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                                    Active
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
