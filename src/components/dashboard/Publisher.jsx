import { useState, useRef, useEffect } from 'react';
import {
    Image as ImageIcon, Video, Calendar, MapPin, Smile, MoreHorizontal,
    X, ChevronDown, Check, Globe, Clock, Send, Loader2, AlertCircle, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAccounts, uploadMedia, postContent, schedulePost, getProfiles } from '../../services/api';

export default function Publisher() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [accounts, setAccounts] = useState([]); // Filtered by profile
    const [allAccounts, setAllAccounts] = useState([]); // All accounts store
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [previewMode, setPreviewMode] = useState('mobile');

    // Notifications
    const [toast, setToast] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        loadData();
    }, []);

    // Filter accounts when profile changes
    useEffect(() => {
        if (!selectedProfileId) {
            setAccounts([]);
            return;
        }
        const filtered = allAccounts.filter(acc => acc.profileId === selectedProfileId);
        setAccounts(filtered);
        // Auto-select all accounts for this profile
        if (filtered.length > 0) {
            setSelectedAccounts(filtered.map(a => a.accountId));
        } else {
            setSelectedAccounts([]);
        }
    }, [selectedProfileId, allAccounts]);

    const loadData = async () => {
        try {
            const [profilesData, accountsData] = await Promise.all([
                getProfiles(),
                getAccounts()
            ]);

            setProfiles(profilesData || []);
            setAllAccounts(accountsData.accounts || []);

            // Auto-select first profile
            if (profilesData && profilesData.length > 0) {
                setSelectedProfileId(profilesData[0].id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAccount = (id) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter(a => a !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Upload immediately to get URL
        // In a real app we might show progress bars here
        for (const file of files) {
            const tempId = Math.random().toString(36).substr(2, 9);
            const isVideo = file.type.startsWith('video/');
            const previewUrl = URL.createObjectURL(file);

            // Add optimistic preview
            setMediaFiles(prev => [...prev, {
                id: tempId,
                file,
                url: previewUrl,
                type: isVideo ? 'video' : 'image',
                uploading: true
            }]);

            try {
                // Upload to backend
                const formData = new FormData();
                formData.append('file', file);
                const res = await uploadMedia(formData); // Expects { url, ... }

                // Update with real URL
                setMediaFiles(prev => prev.map(item =>
                    item.id === tempId ? { ...item, url: res.url, uploading: false } : item
                ));
            } catch (err) {
                console.error('Upload failed', err);
                // Remove failed upload
                setMediaFiles(prev => prev.filter(item => item.id !== tempId));
                setToast({ type: 'error', message: 'Failed to upload media.' });
            }
        }
    };

    const removeMedia = (id) => {
        setMediaFiles(mediaFiles.filter(m => m.id !== id));
    };

    const handleSubmit = async (isDraft = false) => {
        if (!content && mediaFiles.length === 0) {
            setToast({ type: 'error', message: 'Please add some content to post.' });
            return;
        }
        if (selectedAccounts.length === 0) {
            setToast({ type: 'error', message: 'Please select at least one account.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const mediaUrls = mediaFiles.map(m => m.url);

            // Construct payload matching backend PostAccount model { platform, accountId }
            const accountsPayload = selectedAccounts.map(accId => {
                const acc = accounts.find(a => a.accountId === accId);
                return acc ? { platform: acc.platform, accountId: acc.accountId } : null;
            }).filter(Boolean);

            // Basic logic: If date/time set, schedule it. Otherwise post now.
            if (scheduleDate && scheduleTime) {
                const isoDateTime = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
                // schedulePost(accounts, content, scheduledFor, media)
                await schedulePost(accountsPayload, content, isoDateTime, mediaUrls);
                setToast({ type: 'success', message: 'Post scheduled successfully!' });
            } else {
                // postContent(accounts, content, media)
                await postContent(accountsPayload, content, mediaUrls);
                setToast({ type: 'success', message: 'Posted successfully!' });
            }

            // Reset form
            setContent('');
            setMediaFiles([]);
            setScheduleDate('');
            setScheduleTime('');
            setShowSchedule(false);

        } catch (err) {
            console.error(err);
            setToast({ type: 'error', message: err.response?.data?.detail || 'Failed to post.' });
        } finally {
            setIsSubmitting(false);
            // Auto hide toast
            setTimeout(() => setToast(null), 3000);
        }
    };

    // --- RENDER ---
    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">

            {/* --- LEFT COLUMN: COMPOSER --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
                {/* 1. Account Selector */}
                {/* 1. Account Setup */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex flex-col gap-4">
                        {/* Profile Selector */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Post As (Profile)</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    className="w-full pl-10 pr-10 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-slate-700 dark:text-slate-200"
                                    value={selectedProfileId || ''}
                                    onChange={(e) => setSelectedProfileId(e.target.value)}
                                >
                                    {profiles.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                    {profiles.length === 0 && <option value="">No profiles found</option>}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Accounts List (Horizontal Scroll) */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Select Accounts</label>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {accounts.map(acc => {
                                    const isSelected = selectedAccounts.includes(acc.accountId);
                                    return (
                                        <button
                                            key={acc.accountId}
                                            onClick={() => toggleAccount(acc.accountId)}
                                            className={`
                                                flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap
                                                ${isSelected
                                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700/50 dark:text-indigo-300'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'}
                                            `}
                                        >
                                            <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                                                <img src={acc.rawProfile?.data?.profile_image_url || `https://ui-avatars.com/api/?name=${acc.username}`} className="w-full h-full object-cover" />
                                            </div>
                                            {acc.username}
                                            {isSelected && <Check className="w-3 h-3 ml-1" />}
                                        </button>
                                    )
                                })}
                                {accounts.length === 0 && (
                                    <span className="text-sm text-slate-400 italic px-2">No accounts in this profile.</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Editor Area */}
                <div className="flex-1 flex flex-col relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your post..."
                        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none text-slate-800 dark:text-slate-200 text-lg placeholder:text-slate-400"
                    />

                    {/* Media Preview Grid */}
                    {mediaFiles.length > 0 && (
                        <div className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {mediaFiles.map(media => (
                                <div key={media.id} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-700">
                                    {media.uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        </div>
                                    )}
                                    {media.type === 'video' ? (
                                        <video src={media.url} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={media.url} className="w-full h-full object-cover" />
                                    )}
                                    <button
                                        onClick={() => removeMedia(media.id)}
                                        className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            <ToolbarBtn icon={ImageIcon} label="Photo" onClick={() => fileInputRef.current?.click()} />
                            <ToolbarBtn icon={Video} label="Video" onClick={() => fileInputRef.current?.click()} />
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
                            <ToolbarBtn icon={Smile} label="Emoji" />
                            <ToolbarBtn icon={MapPin} label="Location" />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{content.length} / 2200</span>
                    </div>
                </div>

                {/* 3. Footer Options */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-4 mb-4">
                        <button
                            onClick={() => setShowSchedule(!showSchedule)}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 w-full justify-between"
                        >
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-500" /> Scheduling Options</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showSchedule ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showSchedule && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                value={scheduleDate}
                                                onChange={(e) => setScheduleDate(e.target.value)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-slate-500 mb-1 block">Time</label>
                                            <input
                                                type="time"
                                                value={scheduleTime}
                                                onChange={(e) => setScheduleTime(e.target.value)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    {scheduleDate && scheduleTime && (
                                        <div className="flex items-center gap-2 mt-3 text-xs text-indigo-500 font-medium bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-lg">
                                            <Clock className="w-3 h-3" />
                                            Will be posted on {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString()}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSubmit()}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {scheduleDate && scheduleTime ? 'Schedule' : 'Publish Now'}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: PREVIEW --- */}
            <div className="w-[400px] xl:w-[480px] bg-slate-100 dark:bg-black p-6 border-l border-slate-200 dark:border-slate-800 hidden lg:flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">Network Preview</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${previewMode === 'mobile' ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300'}`}
                        >
                            Mobile
                        </button>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${previewMode === 'desktop' ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300'}`}
                        >
                            Desktop
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    {/* Mock Phone/Desktop Preview */}
                    <div className={`transition-all duration-300 flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden
                        ${previewMode === 'mobile'
                            ? 'w-[320px] rounded-[2rem] border-[6px] border-slate-200 dark:border-slate-800'
                            : 'w-full max-w-[440px] rounded-lg border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex-1">
                                <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1.5"></div>
                                <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-800 rounded"></div>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-slate-300" />
                        </div>

                        {/* Content */}
                        <div className="p-0">
                            {mediaFiles.length > 0 ? (
                                <div className="aspect-square bg-slate-100 dark:bg-slate-950 relative">
                                    {mediaFiles[0].type === 'video' ? (
                                        <video src={mediaFiles[0].url} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={mediaFiles[0].url} className="w-full h-full object-cover" />
                                    )}
                                    {mediaFiles.length > 1 && (
                                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                                            + {mediaFiles.length - 1} more
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300">
                                    <ImageIcon className="w-12 h-12" />
                                </div>
                            )}
                        </div>

                        {/* Caption */}
                        <div className="p-4">
                            <div className="flex gap-3 mb-3">
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">username</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {content || <span className="text-slate-300 italic">Your caption here...</span>}
                            </p>
                            <div className="mt-3 text-[10px] text-slate-400 uppercase">2 hours ago</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        Preview approximates how your content will display. Social networks may update their UI at any time.
                    </p>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 z-50
                            ${toast.type === 'error' ? 'bg-red-50 dark:bg-red-900/90 border-red-200 text-red-700 dark:text-red-100' : 'bg-emerald-50 dark:bg-emerald-900/90 border-emerald-200 text-emerald-700 dark:text-emerald-100'}`}
                    >
                        {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                        <span className="font-bold">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ToolbarBtn({ icon: Icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex items-center justify-center"
            title={label}
        >
            <Icon className="w-5 h-5" />
        </button>
    )
}
