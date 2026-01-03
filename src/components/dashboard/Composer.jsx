import { useState, useRef, useEffect } from 'react';
import {
    Send, Trash2, Check, Sparkles, X, Zap, AtSign, Pin,
    MessageSquare, Cloud, Music, Plus, Calendar, Clock,
    Loader2, AlertCircle, CheckCircle, Upload, Link2,
    FileText, Image as ImageIcon, Smile
} from 'lucide-react';
import { postContent, uploadAndPost, generateContent } from '../../services/api';

const UPLOAD_METHODS = [
    { id: 'text', label: 'Text Only', icon: FileText },
    { id: 'url', label: 'Media URL', icon: Link2 },
    { id: 'file', label: 'Upload File', icon: Upload },
];

export default function Composer({ accounts = [], selectedAccounts = [], onAccountToggle, onSuccess }) {
    const [postText, setPostText] = useState('');
    const [posting, setPosting] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('text');
    const [mediaUrls, setMediaUrls] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [postResult, setPostResult] = useState(null);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file selection
    const onFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    // AI Generation
    const handleAiGenerate = async () => {
        if (!aiPrompt) return;
        setGenerating(true);
        try {
            const result = await generateContent(aiPrompt, 'twitter', 'Professional');
            setPostText(result);
            setShowAiModal(false);
            setAiPrompt('');
        } catch (err) {
            alert('Failed to generate content: ' + err.message);
        } finally {
            setGenerating(false);
        }
    };

    const openAiModal = () => {
        setAiPrompt(postText ? `Optimize this post for better engagement:\n\n"${postText}"` : '');
        setShowAiModal(true);
    };

    // Posting Logic
    const handlePost = async () => {
        if (!postText && uploadMethod === 'text') return;
        if (selectedAccounts.length === 0) return alert('Select at least one account');

        setPosting(true);
        setPostResult(null);

        const targetAccounts = accounts.filter(a => selectedAccounts.includes(a.accountId))
            .map(a => ({ platform: a.platform, accountId: a.accountId }));

        try {
            let res;
            if (uploadMethod === 'file' && selectedFiles.length > 0) {
                res = await uploadAndPost(targetAccounts, postText, selectedFiles, []);
            } else if (uploadMethod === 'url' && mediaUrls.trim()) {
                const urls = mediaUrls.split(',').map(u => u.trim()).filter(u => u);
                res = await uploadAndPost(targetAccounts, postText, [], urls);
            } else {
                res = await postContent(targetAccounts, postText);
            }

            setPostResult({ success: true, data: res });
            setPostText('');
            setMediaUrls('');
            setSelectedFiles([]);
            if (onSuccess) onSuccess();

            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.response?.data?.message || err.message });
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Send className="w-5 h-5 text-white ml-0.5 mt-0.5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Creation Studio</h2>
                        <p className="text-xs text-gray-400">Compose and publish to multiple platforms</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {/* Schedule Logic could go here or parent */ }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-white/5"
                    >
                        <Clock className="w-4 h-4" /> Schedule
                    </button>
                    <button
                        onClick={openAiModal}
                        className="px-4 py-2 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 hover:from-violet-600/30 hover:to-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" /> AI Assist
                    </button>
                </div>
            </div>

            {/* Account Selector (Visual Only - Logic needed from parent if accounts not passed) */}
            {accounts.length > 0 && (
                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Post To:</p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {accounts.map(acc => {
                            const isSelected = selectedAccounts.includes(acc.accountId);
                            return (
                                <button
                                    key={acc.accountId}
                                    onClick={() => onAccountToggle(acc.accountId)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm whitespace-nowrap
                                ${isSelected
                                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <span className="capitalize">{acc.platform}</span>
                                    <span className="opacity-60 text-xs">@{acc.username || 'user'}</span>
                                </button>
                            );
                        })}
                        <button className="w-8 h-8 rounded-full border border-dashed border-gray-600 hover:border-gray-400 hover:text-white text-gray-500 flex items-center justify-center transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="space-y-4">
                {/* Upload Method Tabs */}
                <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-xl w-fit mb-2">
                    {UPLOAD_METHODS.map(method => (
                        <button
                            key={method.id}
                            onClick={() => setUploadMethod(method.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border
                            ${uploadMethod === method.id
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <method.icon className="w-3 h-3" />
                            {method.label}
                        </button>
                    ))}
                </div>

                {/* Text Input */}
                <div className="relative group">
                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder="What's happening today?"
                        className="w-full h-40 bg-black/20 border border-white/10 rounded-xl p-4 text-base focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-gray-600"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-600 font-mono">
                        {postText.length} chars
                    </div>
                </div>

                {/* Media Inputs */}
                {uploadMethod === 'url' && (
                    <div className="animate-fade-in">
                        <input
                            type="text"
                            value={mediaUrls}
                            onChange={(e) => setMediaUrls(e.target.value)}
                            placeholder="https://image1.jpg, https://image2.jpg"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
                        />
                    </div>
                )}

                {uploadMethod === 'file' && (
                    <div className="animate-fade-in">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 rounded-xl p-8 text-center cursor-pointer transition-all"
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            />
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-300 font-medium">Click to upload files</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {selectedFiles.length > 0
                                    ? `${selectedFiles.length} files selected`
                                    : 'JPG, PNG, MP4 up to 50MB'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Smart Queue
                    </button>

                    <button
                        onClick={handlePost}
                        disabled={posting || (selectedAccounts.length === 0)}
                        className="px-6 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all transform active:scale-95"
                    >
                        {posting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        Publish Now
                    </button>
                </div>
            </div>

            {/* Post Result Toast/Banner */}
            {postResult && (
                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up border backdrop-blur-md shadow-2xl z-20 
                    ${postResult.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    {postResult.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <p className="text-sm font-medium">{postResult.success ? 'Content published successfully!' : postResult.error}</p>
                </div>
            )}

            {/* AI Modal */}
            {showAiModal && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
                    <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-fuchsia-400" /> Ghostwriter AI
                            </h3>
                            <button onClick={() => setShowAiModal(false)} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-4 h-4" /></button>
                        </div>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g. Write a funny tweet about coffee..."
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-fuchsia-500/50 mb-4 resize-none"
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={generating || !aiPrompt}
                            className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                        >
                            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            Generate Content
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
