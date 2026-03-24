import { useState, useEffect } from 'react';
import { 
    Zap, Send, Mail, Target, MessageSquare, Calendar, Loader2, Sparkles, 
    AlertCircle, CheckCircle2, Instagram, Facebook, Linkedin, Twitter, 
    ArrowRight, Globe, Key, Settings, MousePointer2, Plus, Info
} from 'lucide-react';
import { instantPublish, getCurrentUser } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function InstantPublish() {
    const navigate = useNavigate();
    const [view, setView] = useState('choice'); // 'choice' | 'form_raven' | 'form_upload'
    const [formData, setFormData] = useState({
        email: '',
        postTopic: '',
        targetAudience: '',
        date: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        twitter: '',
        apiKey: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                if (user && user.email) {
                    setFormData(prev => ({ ...prev, email: user.email }));
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const result = await instantPublish({
                ...formData,
                system: view === 'form_raven' ? 'social_raven' : 'upload_post'
            });
            
            if (result.status === 'success') {
                setStatus({ type: 'success', message: 'Instant publish triggered! Your AI content is being generated and handled by the automation engine.' });
                setFormData(prev => ({ ...prev, postTopic: '', date: '' }));
            } else {
                setStatus({ type: 'error', message: result.message || 'Failed to trigger instant publish.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.detail || 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    if (view === 'choice') {
        return (
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6 bg-black">
                <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
                    
                    {/* Social Raven Choice */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/dashboard')}
                        className="group relative h-96 bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/20">
                            <Zap className="w-10 h-10 text-white fill-white" />
                        </div>
                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Social Raven</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-8">
                            Use our built-in orchestration engine to distribute content across your primary connected accounts.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                            Enter Portal <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.div>

                    {/* Upload Post Choice */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setView('form_upload')}
                        className="group relative h-96 bg-white/5 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/20 transition-colors">
                            <Plus className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Upload Post</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-8">
                            Distribute via external API keys. Perfect for high-volume automation and developer nodes.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-white/50 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                            Configure Node <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-140px)] flex flex-col relative overflow-hidden bg-black text-white">
            
            {/* Header */}
            <div className="z-10 flex items-center justify-between p-8 border-b border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setView('choice')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight flex items-center gap-3 italic uppercase">
                            {view === 'form_raven' ? 'Social Raven' : 'Upload Post'} Configuration
                        </h2>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Automation Node Active</p>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-6 overflow-x-auto">
                    <PlatformBadge icon={Instagram} color="bg-pink-500/20 text-pink-500" />
                    <PlatformBadge icon={Facebook} color="bg-blue-600/20 text-blue-600" />
                    <PlatformBadge icon={Twitter} color="bg-sky-400/20 text-sky-400" />
                    <PlatformBadge icon={Linkedin} color="bg-blue-500/20 text-blue-500" />
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 overflow-y-auto p-8 z-10 custom-scrollbar">
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
                    
                    {/* Main Content Form */}
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Content Strategy
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Email for Approval</label>
                                    <input 
                                        type="email" name="email" required value={formData.email} onChange={handleChange} 
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Core Topic</label>
                                    <textarea 
                                        name="postTopic" required value={formData.postTopic} onChange={handleChange} rows="3"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                                        placeholder="What's the main hook?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Target Audience</label>
                                    <input 
                                        type="text" name="targetAudience" required value={formData.targetAudience} onChange={handleChange}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                        placeholder="Who are we reaching?"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Post Date</label>
                                        <input 
                                            type="text" name="date" required value={formData.date} onChange={handleChange}
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                            placeholder="DD-MM-YY"
                                        />
                                    </div>
                                    {view === 'form_upload' && (
                                        <div className="relative group">
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">API Key</label>
                                            <div className="relative">
                                                <input 
                                                    type="password" name="apiKey" required value={formData.apiKey} onChange={handleChange}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium pr-10"
                                                    placeholder="••••••••"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => navigate('/api-keys')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-indigo-400 transition-colors"
                                                    title="Get API Key"
                                                >
                                                    <Key className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-xl uppercase italic tracking-tighter shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Trigger Instant Publish</>}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Meta/Social Fields */}
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Platform Metadata
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PlatformInput 
                                    icon={Instagram} label="Instagram Handle" name="instagram" 
                                    value={formData.instagram} onChange={handleChange} placeholder="@username"
                                />
                                <PlatformInput 
                                    icon={Facebook} label="Facebook ID/URL" name="facebook" 
                                    value={formData.facebook} onChange={handleChange} placeholder="fb.com/page"
                                />
                                <PlatformInput 
                                    icon={Twitter} label="X (Twitter) Handle" name="twitter" 
                                    value={formData.twitter} onChange={handleChange} placeholder="@handle"
                                />
                                <PlatformInput 
                                    icon={Linkedin} label="LinkedIn Profile" name="linkedin" 
                                    value={formData.linkedin} onChange={handleChange} placeholder="li/in/user"
                                />
                            </div>
                            
                            <div className="mt-8 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex gap-3">
                                <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                                <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wide">
                                    These details help the AI personalize content for each platform's specific algorithm and audience behavior.
                                </p>
                            </div>
                        </div>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl border flex gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                            >
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                <p className="text-sm font-medium">{status.message}</p>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

function PlatformBadge({ icon: Icon, color }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color} text-[10px] font-black uppercase tracking-widest`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="opacity-80">Sync Active</span>
        </div>
    );
}

function PlatformInput({ icon: Icon, label, value, onChange, placeholder, name }) {
    return (
        <div className="group">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-indigo-400 transition-colors">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <Icon className="w-4 h-4" />
                </div>
                <input 
                    type="text" name={name} value={value} onChange={onChange}
                    className="w-full bg-black border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}
