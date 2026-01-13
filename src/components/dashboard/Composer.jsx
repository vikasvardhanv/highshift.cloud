import { useState, useRef, useEffect } from 'react';
import {
    Send, Sparkles, X, Zap, Link2,
    FileText, Upload, CheckCircle, AlertCircle, Loader2, Plus, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { postContent, uploadAndPost, generateContent } from '../../services/api';

const UPLOAD_METHODS = [
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'url', label: 'Link', icon: Link2 },
    { id: 'file', label: 'Media', icon: ImageIcon },
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
    const [soloMode, setSoloMode] = useState(false);
    const fileInputRef = useRef(null);

    // Sync solo mode with account selection
    useEffect(() => {
        if (soloMode) {
            // Logic to handle visual state for solo mode
        }
    }, [soloMode, accounts]);

    const handleSoloToggle = () => {
        setSoloMode(!soloMode);
        if (!soloMode) {
            accounts.forEach(acc => {
                if (!selectedAccounts.includes(acc.accountId)) {
                    onAccountToggle(acc.accountId);
                }
            });
        }
    };

    const onFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

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
                // Ensure file upload works as requested
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
            setSoloMode(false);
            if (onSuccess) onSuccess();

            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.response?.data?.message || err.message });
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className={`relative rounded-xl border transition-all duration-300 shadow-sm
            ${soloMode
                ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-900/10 dark:border-indigo-800'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>

            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${soloMode ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        <Send className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {soloMode ? 'Broadcast Mode' : 'New Post'}
                        </h2>
                        <p className="text-xs text-slate-500">
                            {soloMode ? 'Publishing to all channels' : 'Create and schedule content'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSoloToggle}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5
                        ${soloMode
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                    >
                        <Zap className="w-3.5 h-3.5" />
                        {soloMode ? 'Broadcast On' : 'Broadcast Off'}
                    </button>

                    <button
                        onClick={openAiModal}
                        className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                        title="AI Assistant"
                    >
                        <Sparkles className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Account Selector */}
            {accounts.length > 0 && (
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        {accounts.map(acc => {
                            const isSelected = selectedAccounts.includes(acc.accountId);
                            return (
                                <button
                                    key={acc.accountId}
                                    onClick={() => !soloMode && onAccountToggle(acc.accountId)}
                                    disabled={soloMode}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-all whitespace-nowrap
                                    ${isSelected
                                            ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 shadow-sm'
                                            : 'text-slate-500 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'}
                                    ${soloMode ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    <span className="capitalize">{acc.platform}</span>
                                    {isSelected && <CheckCircle className="w-3 h-3" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="p-4 space-y-4">
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full h-32 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none text-base"
                />

                {/* Media Handling */}
                <div className="space-y-3">
                    {uploadMethod === 'url' && (
                        <input
                            type="text"
                            value={mediaUrls}
                            onChange={(e) => setMediaUrls(e.target.value)}
                            placeholder="Paste image URL..."
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none"
                        />
                    )}

                    {uploadMethod === 'file' && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center hover:border-indigo-400 cursor-pointer transition-colors"
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            />
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-500 font-medium">Click to upload images or video</p>
                            {selectedFiles.length > 0 && (
                                <div className="mt-2 flex flex-wrap justify-center gap-2">
                                    {selectedFiles.map((f, i) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-md">
                                            {f.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1">
                        {UPLOAD_METHODS.map(method => (
                            <button
                                key={method.id}
                                onClick={() => setUploadMethod(method.id)}
                                className={`p-2 rounded-lg transition-colors
                                ${uploadMethod === method.id
                                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                                        : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                title={method.label}
                            >
                                <method.icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 hidden sm:inline">{postText.length} chars</span>
                        <button
                            onClick={handlePost}
                            disabled={posting || selectedAccounts.length === 0}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {soloMode ? 'Broadcast' : 'Post'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Result Notification */}
            <AnimatePresence>
                {postResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute bottom-full left-0 right-0 mb-4 mx-4 p-3 rounded-lg shadow-lg border flex items-center gap-2 text-sm font-medium z-10
                        ${postResult.success
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-300'
                                : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300'}`}
                    >
                        {postResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {postResult.success ? 'Posted successfully!' : postResult.error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Modal */}
            {showAiModal && (
                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-xl">
                    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xl">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" /> AI Assistant
                            </h3>
                            <button onClick={() => setShowAiModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
                        </div>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="What should I write about?"
                            className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm mb-3 focus:outline-none resize-none"
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={generating || !aiPrompt}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                        >
                            {generating ? 'Generating...' : 'Generate Text'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
