import { useEffect, useState } from 'react';
import { getScheduleCalendar, cancelScheduledPost } from '../services/api';
import { Calendar, Clock, Loader2, Trash2, ChevronLeft, ChevronRight, Twitter, Facebook, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';

const PLATFORM_ICONS = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
};

export default function ScheduleCalendar() {
    const [calendarData, setCalendarData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        loadCalendar();
    }, []);

    const loadCalendar = async () => {
        try {
            const data = await getScheduleCalendar();
            setCalendarData(data || {});
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (postId) => {
        if (!confirm("Cancel this scheduled post?")) return;
        try {
            await cancelScheduledPost(postId);
            await loadCalendar();
        } catch (err) {
            alert("Failed to cancel post");
        }
    };

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const formatDateKey = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-24 gap-4">
            <Loader2 className="animate-spin text-primary w-12 h-12" />
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Synchronizing Temporal Grid...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Temporal Command</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        Orchestrate your future transmissions across the global network with precision timing.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Calendar Grid */}
                <div className="lg:col-span-8 glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>

                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tighter uppercase">{monthNames[month]} <span className="text-slate-700">{year}</span></h2>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 transition-all flex items-center justify-center">
                                <ChevronLeft className="w-5 h-5 text-slate-400" />
                            </button>
                            <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 transition-all flex items-center justify-center">
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-4 mb-6">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                            <div key={day} className={`text-center text-[10px] font-black uppercase tracking-[0.2em] ${idx === 0 || idx === 6 ? 'text-slate-700' : 'text-slate-500'}`}>{day}</div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-4">
                        {Array.from({ length: startingDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square opacity-20 bg-slate-900/40 rounded-2xl" />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateKey = formatDateKey(year, month, day);
                            const posts = calendarData[dateKey] || [];
                            const hasItems = posts.length > 0;
                            const isSelected = selectedDate === dateKey;
                            const today = new Date();
                            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(dateKey)}
                                    className={`
                                        aspect-square rounded-[1.25rem] flex flex-col items-center justify-center transition-all duration-300 relative group/day
                                        ${isSelected
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10 border border-primary/50'
                                            : hasItems
                                                ? 'bg-white/5 border border-white/10 hover:border-white/30 text-slate-200'
                                                : 'bg-white/[0.02] border border-transparent hover:border-white/5 text-slate-600 hover:text-slate-400'}
                                        ${isToday && !isSelected ? 'ring-2 ring-primary ring-offset-4 ring-offset-slate-950' : ''}
                                    `}
                                >
                                    <span className="text-sm font-black">{day}</span>
                                    {hasItems && (
                                        <div className="flex gap-1 mt-2">
                                            {posts.slice(0, 3).map((_, idx) => (
                                                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                                            ))}
                                            {posts.length > 3 && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/40' : 'bg-primary/40'}`} />}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Day Details */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 flex-1 shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mb-20 -mr-20"></div>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg">
                                <Clock className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold uppercase tracking-tight">Timeline Detail</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Temporal Select'}
                                </p>
                            </div>
                        </div>

                        {selectedDate && calendarData[selectedDate] ? (
                            <div className="space-y-6">
                                {calendarData[selectedDate].map(post => (
                                    <div key={post.id} className="relative p-6 rounded-[1.5rem] bg-black/40 border border-white/5 hover:border-white/10 transition-all group/post shadow-xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="px-3 py-1 bg-primary/10 rounded-lg text-[9px] font-black text-primary uppercase tracking-widest">
                                                {post.time}
                                            </div>
                                            <button
                                                onClick={() => handleCancel(post.id)}
                                                className="opacity-0 group-hover/post:opacity-100 p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6 line-clamp-3">{post.content}</p>
                                        <div className="flex gap-2">
                                            {post.platforms?.map(p => {
                                                const Icon = PLATFORM_ICONS[p] || Calendar;
                                                return (
                                                    <div key={p} className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center" title={p}>
                                                        <Icon className="w-4 h-4 text-slate-500" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                                <div className="w-16 h-16 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center mb-4">
                                    <Zap className="w-8 h-8 text-slate-700" />
                                </div>
                                <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest leading-loose">
                                    {selectedDate ? 'Temporal Void: No Events' : 'Activate a node on the grid to inspect details'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
