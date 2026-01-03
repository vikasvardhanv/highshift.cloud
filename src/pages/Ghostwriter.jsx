import { useState } from 'react';
import { Send, Sparkles, Bot, User, Copy, ThumbsUp, RefreshCw, Loader2 } from 'lucide-react';
import { generateContent } from '../services/api';

export default function Ghostwriter() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "I'm your AI Ghostwriter. Paste a topic, a URL, or an existing post, and I'll forge it into high-impact social content." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [tone, setTone] = useState('Professional');

    const tones = ['Professional', 'Witty', 'Aggressive', 'Empathetic', 'Minimalist'];

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            // Using the real API
            const result = await generateContent(userMessage, 'all', tone);
            setMessages(prev => [...prev, { role: 'assistant', content: result }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Failed to forge content. The aether is currently unstable." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col glass-card rounded-[2rem] overflow-hidden border-white/5 shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shadow-lg border border-primary/20">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold tracking-tight">Ghostwriter Engine</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Neural Content Synthesis Active</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {tones.map(t => (
                        <button
                            key={t}
                            onClick={() => setTone(t)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all border
                            ${tone === t
                                    ? 'bg-primary/20 border-primary/40 text-primary'
                                    : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg border
                            ${msg.role === 'assistant' ? 'bg-slate-900 border-white/10 text-primary' : 'bg-primary border-primary/20 text-white'}`}>
                            {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>
                        <div className={`max-w-[75%] p-6 rounded-[2rem] whitespace-pre-wrap text-[15px] leading-relaxed relative group
                            ${msg.role === 'assistant'
                                ? 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none shadow-xl'
                                : 'bg-primary/10 border border-primary/30 text-white rounded-tr-none shadow-primary/5'}`}>
                            {msg.content}

                            {msg.role === 'assistant' && !loading && (
                                <div className="flex gap-3 mt-6 pt-5 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => navigator.clipboard.writeText(msg.content)} className="flex items-center gap-2 text-[10px] font-bold uppercase px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                        <Copy className="w-3.5 h-3.5" /> Copy Snippet
                                    </button>
                                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                        <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-5 animate-pulse">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] rounded-tl-none w-32 h-12"></div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-white/5 bg-black/20">
                <div className="relative group/input max-w-4xl mx-auto">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                        type="text"
                        placeholder="Describe your vision or paste a link..."
                        className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] px-8 py-5 pr-32 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-lg placeholder:text-slate-700 disabled:opacity-50"
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-2">
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-extrabold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            FORGE
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>Markdown Support</span>
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <span>Cross-Platform Ready</span>
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <span>AI Optimized</span>
                </div>
            </div>
        </div>
    );
}
