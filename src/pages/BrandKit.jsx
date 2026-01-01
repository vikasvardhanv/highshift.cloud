import { useState, useEffect } from 'react';
import { Save, Globe, Hash, Smile, Loader2 } from 'lucide-react';
import { getBrandKit, updateBrandKit } from '../services/api';

export default function BrandKit() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        industry: '',
        website: '',
        tone: 'Professional',
        description: '',
        keywords: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getBrandKit();
            if (data) {
                setFormData({
                    ...data,
                    keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...formData,
                keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k)
            };
            await updateBrandKit(payload);
            alert('Brand Settings Saved!');
        } catch (err) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Brand Kit Settings</h1>
                    <p className="text-gray-400 text-sm mt-1">Define your brand's voice and personality for the AI Ghostwriter.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primaryHover rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Brand Voice Card */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Smile className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Tone of Voice</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {['Professional', 'Friendly', 'Witty', 'Inspirational'].map((tone) => (
                            <label key={tone} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors
                                ${formData.tone === tone ? 'bg-primary/20 border-primary text-white' : 'border-white/10 hover:bg-white/5'}`}>
                                <input
                                    type="radio"
                                    name="tone"
                                    className="hidden"
                                    checked={formData.tone === tone}
                                    onChange={() => setFormData({ ...formData, tone })}
                                />
                                <span className="text-sm font-medium">{tone}</span>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Custom Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                            placeholder="Describe your brand's personality in detail..."
                        ></textarea>
                    </div>
                </div>

                {/* Company Info */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Globe className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Brand Identity</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Company Name</label>
                            <input
                                value={formData.company_name}
                                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                                placeholder="e.g. HighShift Cloud"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Industry</label>
                            <input
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                                placeholder="e.g. SaaS"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Website / Links</label>
                            <input
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                                placeholder="https://highshift.cloud"
                            />
                        </div>
                    </div>
                </div>

                {/* Keywords */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                            <Hash className="w-5 h-5 text-pink-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Keywords & Topics</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Core Topics</label>
                        <textarea
                            className="w-full h-24 bg-black/20 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                            placeholder="Enter keywords separated by commas (e.g. AI, Automation, Social Media, Growth, Marketing)"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
