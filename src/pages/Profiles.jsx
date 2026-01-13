import { useEffect, useState } from 'react';
import { getProfiles, createProfile, deleteProfile, getAuthUrl, disconnectAccount } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trash2, Plus, Loader2, User, Globe, Share2, AlertCircle
} from 'lucide-react';

const PLATFORMS = [
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-sky-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
];

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProfileName, setNewProfileName] = useState('');
    const [creating, setCreating] = useState(false);
    const [addingToProfileId, setAddingToProfileId] = useState(null); // Which profile is currently adding account

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;
        setCreating(true);
        try {
            await createProfile(newProfileName);
            setNewProfileName('');
            await loadData();
        } catch (err) {
            alert('Failed to create profile: ' + (err.response?.data?.detail || err.message));
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteProfile = async (id) => {
        if (!confirm('Are you sure? This will disconnect all accounts in this profile.')) return;
        try {
            await deleteProfile(id);
            await loadData();
        } catch (err) {
            alert('Failed to delete profile');
        }
    };

    const handleConnect = async (profileId, platformId) => {
        try {
            // Pass profileId to getAuthUrl
            const url = await getAuthUrl(platformId, window.location.origin + '/auth/callback', profileId);
            window.location.href = url;
        } catch (err) {
            alert('Failed to get auth URL: ' + err.message);
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadData();
        } catch (err) {
            alert('Failed to disconnect');
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
                    Create profiles to manage your social media accounts. The profile name you choose will be used as the `user` parameter in the API.
                    Each profile can be linked to multiple social media accounts, allowing you to manage different sets of accounts separately.
                </p>

                <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p className="text-sm text-indigo-900 dark:text-indigo-200">
                        Want to let your own users connect their social media accounts? Check out the <span className="underline cursor-pointer font-semibold">profile API integration guide</span>.
                    </p>
                </div>
            </div>

            {/* Add Profile */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Add New Profile</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={newProfileName}
                            onChange={(e) => setNewProfileName(e.target.value)}
                            placeholder="e.g. business_account, personal"
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleCreateProfile}
                        disabled={creating || !newProfileName.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
                    >
                        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Add Profile
                    </button>
                </div>
                <p className="text-xs text-slate-400">Allowed characters: letters, numbers, underscores, hyphens.</p>
            </div>

            {/* Profiles List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        Registered Users
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            {profiles.length} Profiles
                        </span>
                    </h2>
                    <div className="flex gap-2">
                        <button className="text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg">
                            Filter Platforms (All)
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-3">Profile</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-6">Social Accounts</div>
                        <div className="col-span-2 text-right">Whitelabel</div>
                    </div>

                    {/* Rows */}
                    {profiles.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-slate-500 mb-4">No profiles created yet.</p>
                            <p className="text-sm text-slate-400">Create a profile above to start connecting social media accounts.</p>
                        </div>
                    )}

                    {profiles.map(profile => (
                        <div key={profile.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            {/* Profile Name */}
                            <div className="col-span-3 flex items-center gap-3">
                                <span className="font-bold text-slate-900 dark:text-white">{profile.name}</span>
                                <button
                                    onClick={() => handleDeleteProfile(profile.id)}
                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Status */}
                            <div className="col-span-1">
                                <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-red-100 ring-1 ring-red-50"></div>
                            </div>

                            {/* Social Accounts */}
                            <div className="col-span-6">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {profile?.accounts?.map(acc => {
                                        const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                                        const Icon = platformCfg?.icon || Globe;
                                        return (
                                            <div key={acc.accountId} className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm" title={acc.username}>
                                                <Icon className={`w-3.5 h-3.5 ${platformCfg?.color}`} />
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[80px] truncate">{platformCfg?.name || acc.platform}</span>
                                                <button onClick={() => handleDisconnect(acc.platform, acc.accountId)} className="ml-1 text-slate-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Add Buttons - Horizontal Scroll */}
                                <div className="relative group">
                                    <button
                                        className="text-xs font-bold text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 px-3 py-1 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                        onClick={() => setAddingToProfileId(addingToProfileId === profile.id ? null : profile.id)}
                                    >
                                        + Connect Accounts
                                    </button>

                                    {/* Dropdown for platforms */}
                                    {addingToProfileId === profile.id && (
                                        <div className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 w-48 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                                            {PLATFORMS.map(p => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => handleConnect(profile.id, p.id)}
                                                    className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md text-sm text-slate-700 dark:text-slate-300 w-full text-left"
                                                >
                                                    <p.icon className={`w-4 h-4 ${p.color}`} />
                                                    {p.name}
                                                </button>
                                            ))}
                                            <div onClick={() => setAddingToProfileId(null)} className="fixed inset-0 z-[-1]" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Whitelabel / Share */}
                            <div className="col-span-2 text-right">
                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                                    <Share2 className="w-3.5 h-3.5" /> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
