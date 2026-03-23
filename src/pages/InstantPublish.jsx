import { useState, useEffect } from 'react';
import { Zap, Send, Mail, Target, MessageSquare, Calendar, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { instantPublish, getCurrentUser } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstantPublish() {
    const [formData, setFormData] = useState({
        email: '',
        postTopic: '',
        targetAudience: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

    useEffect(() => {
        // Pre-fill email if user is logged in
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                if (user && user.email) {
                    setFormData(prev => ({ ...prev, email: user.email }));
                }
            } catch (err) {
                console.error('Failed to fetch user for pre-fill:', err);
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
            const result = await instantPublish(formData);
            if (result.status === 'success') {
                setStatus({ type: 'success', message: 'Instant publish triggered! Your AI content is being generated and handled by the automation engine.' });
                // Don't reset everything, maybe keep audience/email
                setFormData(prev => ({ ...prev, postTopic: '', date: '' }));
            } else {
                setStatus({ type: 'error', message: result.message || 'Failed to trigger instant publish.' });
            }
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.detail || 'An unexpected error occurred. Please check your connection to the automation server.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[100px] dark:bg-indigo-600/5" />
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="z-10 flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                            Instant AI Publishing <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 tracking-wide uppercase">Automated</span>
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Powered by Social Media Automation Engine</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 z-10">
                <div className="max-w-2xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1">
                                    <Mail className="w-4 h-4" /> Email for Approval
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>

                            {/* Post Topic Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1">
                                    <MessageSquare className="w-4 h-4" /> Post Topic
                                </label>
                                <textarea
                                    name="postTopic"
                                    required
                                    value={formData.postTopic}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="What do you want to post about? (e.g., Benefits of AI for Real Estate Agents)"
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm resize-none"
                                />
                            </div>

                            {/* Target Audience Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1">
                                    <Target className="w-4 h-4" /> Target Audience
                                </label>
                                <input
                                    type="text"
                                    name="targetAudience"
                                    required
                                    value={formData.targetAudience}
                                    onChange={handleChange}
                                    placeholder="Who is this for? (e.g., Insurance Brokers, Tech Founders)"
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>

                            {/* Date Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 ml-1">
                                    <Calendar className="w-4 h-4" /> Preferred Posting Date
                                </label>
                                <input
                                    type="text"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="DD-MM-YY (e.g., 25-03-26)"
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>

                            {/* Success/Error Status */}
                            <AnimatePresence>
                                {status && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`flex items-start gap-3 p-4 rounded-xl border ${
                                            status.type === 'success' 
                                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                            : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'
                                        }`}
                                    >
                                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                        <p className="text-sm font-medium">{status.message}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 overflow-hidden group relative"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin text-white" />}
                                {!loading && (
                                    <>
                                        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                                        <span>Trigger Instant Publish</span>
                                        <Send className="w-4 h-4 ml-1 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                            </button>
                        </form>
                    </motion.div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                            <Zap className="w-3 h-3" /> Connects directly to Social Raven Social Automation Network
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
