import { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function Schedule() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const onDateClick = (day) => setSelectedDate(day);

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">{format(currentMonth, dateFormat)}</h2>
                    <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryHover rounded-lg text-sm font-semibold transition-colors">
                    <Plus className="w-4 h-4" /> Schedule Post
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col-span-1 text-center text-xs font-semibold text-gray-500 uppercase py-2" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`min-h-[120px] p-2 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group
                        ${!isSameMonth(day, monthStart) ? "text-gray-600 bg-transparent" : "text-gray-300"}
                        ${isSameDay(day, selectedDate) ? "ring-1 ring-primary inset-0" : ""}
                        `}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isSameDay(day, new Date()) ? "bg-primary text-white" : ""}`}>
                            {formattedDate}
                        </span>

                        {/* Mock Events */}
                        {i % 3 === 0 && isSameMonth(day, monthStart) && (
                            <div className="mt-2 p-1.5 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 truncate">
                                🐦 Product Launch
                            </div>
                        )}
                        {i % 5 === 0 && isSameMonth(day, monthStart) && (
                            <div className="mt-1 p-1.5 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 truncate">
                                📸 Behind Scenes
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-px">{rows}</div>;
    };

    return (
        <div className="glass-card p-6 rounded-2xl">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
