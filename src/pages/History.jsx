import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, Loader2, FileX } from 'lucide-react';
import { getScheduledPosts } from '../services/api';

export default function History() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await getScheduledPosts();
                setPosts(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, []);

    // Filter posts based on search
    const filteredPosts = posts.filter(post =>
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginate
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

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
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/5">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                {filteredPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <FileX className="w-12 h-12 mb-4 text-gray-500" />
                        <p className="text-lg font-medium">No posts found</p>
                        <p className="text-sm">Schedule your first post from the Dashboard</p>
                    </div>
                ) : (
                    <>
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
                                    {paginatedPosts.map((post) => (
                                        <tr key={post.id || post._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="p-6 max-w-sm truncate text-sm font-medium">
                                                {post.content}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex -space-x-2">
                                                    {(post.target_accounts || []).map(acc => (
                                                        <div key={acc.accountId} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-background flex items-center justify-center text-[10px] capitalize text-gray-400">
                                                            {(acc.platform || 'social')[0]}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-6 text-sm text-gray-400">
                                                {new Date(post.scheduled_time || post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                                    ${post.status === 'published'
                                                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                        : post.status === 'failed'
                                                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                                    {post.status === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {post.status?.charAt(0).toUpperCase() + post.status?.slice(1)}
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

                        {/* Dynamic Pagination */}
                        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                            <div>
                                Showing {((page - 1) * itemsPerPage) + 1}-{Math.min(page * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} results
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

