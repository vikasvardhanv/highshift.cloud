import { useState, useEffect } from 'react';
import { 
    Zap, Sparkles, Send, Loader2, Info, ChevronRight, Globe, 
    Instagram, Facebook, Twitter, Linkedin, Cloud, Key, Settings, User, Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerInstantPublish } from '../services/api';

export default function InstantPublish() {
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [apiKey, setApiKey] = useState(localStorage.getItem('social_api_key') || '');
    
    const [userEmail, setUserEmail] = useState('');
    const [handles, setHandles] = useState({
        instagram: '',
        facebook: '',
        linkedin: '',
        twitter: ''
    });
    
    useEffect(() => {
        const fetchUser = async () => {
             const user = JSON.parse(localStorage.getItem('user_data') || '{}');
             if (user.email) setUserEmail(user.email);
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await triggerInstantPublish({
                email: userEmail || 'user@example.com',
                postTopic: topic,
                targetAudience: audience,
                date: date,
                system: apiKey ? 'upload_post' : 'social_raven',
                apiKey: apiKey,
                ...handles
            });
            setStatus({ type: 'success', message: 'Orchestration triggered successfully!' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to trigger automation.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Instant Publish</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Autonomous Content Distribution Engine</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl space-y-12">
                    
                    {/* Main Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Core Topic</label>
                                <textarea
                                    required
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="What's the story today?"
                                    className="w-full h-40 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-xl font-black italic uppercase italic tracking-tighter focus:outline-none focus:border-indigo-500 transition-all resize-none text-slate-800"
                                />
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Target Audience</label>
                                    <input
                                        type="text"
                                        required
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        placeholder="e.g. Tech Founders"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 font-black italic uppercase italic tracking-tighter focus:outline-none focus:border-indigo-500 transition-all text-slate-800"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Publish Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 font-black italic uppercase italic tracking-tighter focus:outline-none focus:border-indigo-500 transition-all text-slate-800"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Platform Handles - Minimal Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                            {['instagram', 'facebook', 'linkedin', 'twitter'].map((p) => (
                                <div key={p} className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                                            {p === 'instagram' && <Instagram className="w-3 h-3 text-pink-500" />}
                                            {p === 'facebook' && <Facebook className="w-3 h-3 text-blue-500" />}
                                            {p === 'linkedin' && <Linkedin className="w-3 h-3 text-blue-400" />}
                                            {p === 'twitter' && <Twitter className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{p}</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={handles[p]}
                                        onChange={(e) => setHandles({...handles, [p]: e.target.value})}
                                        placeholder="@handle"
                                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Choice Bar & API Key */}
                        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center gap-8">
                            
                            {/* System Choice Icons */}
                            <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        if (confirm("Go to Connections/Instances management?")) {
                                            window.location.href = '/connections';
                                        }
                                    }}
                                    className="p-4 rounded-xl hover:bg-indigo-600/10 transition-all group relative"
                                    title="Social Raven (Redirect to Connections)"
                                >
                                    <img src="/images/image.png" alt="R" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white">Social Raven</div>
                                </button>
                                <div className="w-px h-8 bg-slate-200" />
                                <button 
                                    type="button"
                                    className="p-4 rounded-xl transition-all group relative bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    title="Upload Post System"
                                >
                                    <Cloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white">Upload Post</div>
                                </button>
                            </div>

                            {/* API Key Input */}
                            <div className="flex-1 w-full relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Key className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => {
                                        setApiKey(e.target.value);
                                        localStorage.setItem('social_api_key', e.target.value);
                                    }}
                                    placeholder="Enter System API Key for Upload Post"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-6 font-bold italic text-sm tracking-widest focus:outline-none focus:border-indigo-500 transition-all text-slate-800"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
                                    <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-300'}`} />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-24 bg-indigo-600 text-white rounded-3xl flex items-center justify-center gap-4 hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-2xl shadow-indigo-600/20 group overflow-hidden relative"
                        >
                            {loading ? (
                                <Loader2 className="w-10 h-10 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-3xl font-black italic uppercase italic tracking-tighter">Initiate Orchestration</span>
                                    <Send className="w-8 h-8 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Status Feedback */}
                    <AnimatePresence>
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className={`p-6 rounded-2xl flex items-center gap-4 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}
                            >
                                <Info className="w-6 h-6" />
                                <span className="font-black italic uppercase italic tracking-tighter">{status.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
}
