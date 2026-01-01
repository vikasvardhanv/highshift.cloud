import { Search, Filter, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

const MOCK_HISTORY = [
    { id: 1, content: "🚀 Launching our new feature today! Check it out.", platforms: ['twitter', 'linkedin'], date: "Oct 24, 2024", time: "10:00 AM", status: "published" },
    { id: 2, content: "Behind the scenes at our annual retreat 📸", platforms: ['instagram'], date: "Oct 23, 2024", time: "2:30 PM", status: "published" },
    { id: 3, content: "5 Tips for better productivity (Thread) 🧵", platforms: ['twitter'], date: "Oct 25, 2024", time: "9:00 AM", status: "scheduled" },
    { id: 4, content: "We are hiring! Join our team.", platforms: ['linkedin', 'facebook'], date: "Oct 22, 2024", time: "11:15 AM", status: "published" },
    { id: 5, content: "New blog post is live: The Future of AI.", platforms: ['facebook', 'twitter'], date: "Oct 20, 2024", time: "4:45 PM", status: "published" },
];

export default function History() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Post History</h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/5">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5 text-xs text-gray-400 uppercase tracking-wider">
                                <th className="p-6 font-semibold">Content</th>
                                <th className="p-6 font-semibold">Platforms</th>
                                <th className="p-6 font-semibold">Date & Time</th>
                                <th className="p-6 font-semibold">Status</th>
                                <th className="p-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_HISTORY.map((post) => (
                                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6 max-w-sm truncate text-sm font-medium">
                                        {post.content}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex -space-x-2">
                                            {post.platforms.map(p => (
                                                <div key={p} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-background flex items-center justify-center text-[10px] capitalize text-gray-400">
                                                    {p[0]}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-gray-400">
                                        {post.date} <span className="text-xs opacity-50">• {post.time}</span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                            ${post.status === 'published'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                            {post.status === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <div>Showing 1-5 of 24 results</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
