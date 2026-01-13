import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { getScheduleCalendar } from '../services/api';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ScheduleCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [posts, setPosts] = useState({}); // { "YYYY-MM-DD": [post, post] }
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null); // For modal
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        try {
            const data = await getScheduleCalendar();
            setPosts(data || {});
        } catch (err) {
            console.error("Failed to load schedule", err);
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    const handleDateClick = (day) => {
        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const daysPosts = posts[dateKey];
        if (daysPosts && daysPosts.length > 0) {
            setSelectedDate(dateKey);
            // Just selecting date for now, could show sidebar list
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50"></div>);
        }

        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayPosts = posts[dateKey] || [];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`h-32 border border-slate-100 dark:border-slate-800 p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 relative group ${isToday ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : 'bg-white dark:bg-slate-900'}`}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                            {day}
                        </span>
                        {dayPosts.length > 0 && (
                            <span className="text-xs font-bold text-slate-400">{dayPosts.length} posts</span>
                        )}
                    </div>

                    <div className="mt-2 space-y-1 overflow-y-auto max-h-[calc(100%-2rem)] custom-scrollbar">
                        {dayPosts.map((post) => (
                            <div
                                key={post.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }}
                                className="text-xs p-1.5 rounded bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors cursor-pointer truncate"
                            >
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{post.time}</span>
                                    <span className="text-slate-600 dark:text-slate-400 truncate">{post.platforms.join(', ')}</span>
                                </div>
                                <div className="text-slate-500 dark:text-slate-500 truncate mt-0.5">{post.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Schedule</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Orchestrate your future transmissions across the global network.</p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-slate-900 dark:text-white min-w-[140px] text-center">
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    {DAYS.map(day => (
                        <div key={day} className="py-3 text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {renderCalendar()}
                </div>
            </div>

            {/* Post Detail Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scheduled Post</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {selectedPost.time} on {Object.keys(posts).find(key => posts[key].includes(selectedPost))}
                                </p>
                            </div>
                            <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                {selectedPost.content}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {selectedPost.platforms.map((p, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-500/30">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                            <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors">
                                <Trash2 className="w-4 h-4" /> Cancel Post
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center gap-2 transition-colors">
                                <Edit2 className="w-4 h-4" /> Edit Content
                            </button>
                            <button onClick={() => setSelectedPost(null)} className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
