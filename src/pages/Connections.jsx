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
        <div className="space-y-10 animate-fade-in relative z-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Connected Nodes</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        Manage your neural bridges across the social spectrum. Each node expands your reach in Solo Mode.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-2xl">
                    <Zap className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Solo Broadcast Ready</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Add New Card - Refined */}
                <div className="group relative overflow-hidden glass-card rounded-[2.5rem] border-dashed border-white/10 hover:border-primary/50 transition-all duration-500 p-10 flex flex-col items-center justify-center gap-8 min-h-[320px] bg-white/[0.02] hover:bg-white/[0.05]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

                    <div className="relative">
                        <div className="w-20 h-20 rounded-[2rem] bg-primary/20 text-primary flex items-center justify-center shadow-2xl border border-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                            <Plus className="w-10 h-10" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="font-extrabold text-xl mb-2">Forge New Link</h3>
                        <p className="text-xs text-slate-500 font-medium">Select a platform to authorize access</p>
                    </div>

                    <div className="flex gap-3 flex-wrap justify-center relative z-10">
                        {PLATFORMS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => handleConnect(p.id)}
                                className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 hover:border-primary/50 transition-all flex items-center justify-center group/btn hover:-translate-y-1"
                                title={p.name}
                            >
                                <p.icon className="w-5 h-5 text-slate-500 group-hover/btn:text-white transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Cards */}
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary w-12 h-12" />
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Scanning Network...</p>
                    </div>
                ) : (
                    accounts.map(acc => {
                        const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                        const Icon = platformCfg?.icon || Zap;

                        return (
                            <div key={acc.accountId} className="group relative glass-card p-8 rounded-[2.5rem] bg-white/[0.02] border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-2xl">
                                {/* Trash Icon - Refined */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                                    <button
                                        onClick={() => handleDisconnect(acc.platform, acc.accountId)}
                                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-red-500/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-white/10 flex items-center justify-center shadow-inner relative z-10 group-hover:scale-105 transition-transform duration-500">
                                            <Icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-extrabold text-xl truncate w-full px-4 mb-1">{acc.displayName}</h3>
                                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                            @{acc.username || acc.platform}
                                        </p>
                                    </div>

                                    <div className="w-full relative py-3 rounded-2xl bg-emerald-500/5 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-500/10 shadow-inner group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            Secure Connection Active
                                        </span>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                            {acc.platform}
                                        </div>
                                        <div className="px-3 py-1 bg-primary/10 rounded-full text-[9px] font-bold text-primary uppercase tracking-widest">
                                            Solo Capable
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
