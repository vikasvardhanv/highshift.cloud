import { Save, Globe, Hash, Smile } from 'lucide-react';

export default function BrandKit() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Brand Kit Settings</h1>
                    <p className="text-gray-400 text-sm mt-1">Define your brand's voice and personality for the AI Ghostwriter.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primaryHover rounded-lg text-sm font-semibold transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>

            <div className="grad grid-cols-1 gap-6">
                {/* Brand Voice Card */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Smile className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Tone of Voice</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {['Professional & Authoritative', 'Friendly & Casual', 'Witty & Humorous', 'Inspirational'].map((tone) => (
                            <label key={tone} className="flex items-center gap-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                <input type="radio" name="tone" className="w-4 h-4 text-primary bg-transparent border-gray-600 focus:ring-primary" />
                                <span className="text-sm font-medium">{tone}</span>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Custom Description</label>
                        <textarea
                            className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                            placeholder="Describe your brand's personality in detail (e.g., We are a tech-forward company that speaks the language of developers...)"
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
                            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. HighShift Cloud" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Industry</label>
                            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. SaaS / Technology" />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Website / Links</label>
                            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50" placeholder="https://highshift.cloud" />
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
