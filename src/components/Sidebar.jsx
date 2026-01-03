import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart2,
    Calendar,
    CalendarDays,
    Image,
    PenTool,
    MessageSquare,
    History,
    Palette,
    LogOut,
    Settings,
    ChevronLeft,
    ChevronRight,
    Key,
    Radio,
    Megaphone,
    Send
} from 'lucide-react';
import { useState } from 'react';

const APPS = [
    {
        id: 'publishing',
        label: 'Publishing',
        icon: Send,
        paths: ['/publishing', '/dashboard', '/schedule', '/media', '/ai', '/brand', '/history', '/apikeys'],
        mainPath: '/publishing',
        items: [
            { label: 'Command Center', path: '/publishing', icon: LayoutDashboard },
            { label: 'Calendar', path: '/schedule', icon: Calendar },
            { label: 'Media Library', path: '/media', icon: Image },
            { label: 'Ghostwriter', path: '/ai', icon: PenTool },
            { label: 'Brand Kit', path: '/brand', icon: Palette },
            { label: 'History', path: '/history', icon: History },
            { label: 'API Keys', path: '/apikeys', icon: Key },
        ]
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart2,
        paths: ['/analytics'],
        mainPath: '/analytics',
        items: [
            { label: 'Overview', path: '/analytics', icon: BarChart2 },
        ]
    },
    {
        id: 'engagement',
        label: 'Engagement',
        icon: MessageSquare,
        paths: ['/inbox', '/listening', '/ads'],
        mainPath: '/inbox',
        items: [
            { label: 'Inbox', path: '/inbox', icon: MessageSquare },
            { label: 'Listening', path: '/listening', icon: Radio },
            { label: 'Ads', path: '/ads', icon: Megaphone },
        ]
    }
];

export default function Sidebar({ isOpen, onToggle }) {
    const location = useLocation();

    // Determine current app
    const currentApp = APPS.find(app => app.paths.some(p => location.pathname.startsWith(p))) || APPS[0];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-slate-950 border-r border-white/5 transition-all duration-500 z-50 flex
            ${isOpen ? 'w-80 shadow-[20px_0_50px_rgba(0,0,0,0.3)]' : 'w-20'}`}
        >
            {/* Primary Rail (App Switcher) */}
            <div className="w-20 h-full flex flex-col items-center py-8 border-r border-white/5 bg-black/40 backdrop-blur-3xl z-20">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0 mb-10 shadow-2xl relative group">
                    <span className="font-extrabold text-white text-xl">H</span>
                    <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                </div>

                <div className="flex-1 flex flex-col gap-5 w-full px-3">
                    {APPS.map(app => {
                        const isActive = currentApp.id === app.id;
                        return (
                            <Link
                                key={app.id}
                                to={app.mainPath}
                                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group
                                ${isActive
                                        ? 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                        : 'text-slate-500 hover:bg-white/5 hover:text-white border border-transparent'}`}
                            >
                                <app.icon className={`w-6 h-6 mb-1 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                                <span className={`text-[8px] font-extrabold uppercase tracking-widest transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{app.label}</span>

                                {/* Tooltip (Only if collapsed) */}
                                {!isOpen && (
                                    <div className="absolute left-full ml-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50 pointer-events-none border border-white/10 shadow-2xl translate-x-1 group-hover:translate-x-2">
                                        {app.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="w-full px-3 mt-auto space-y-5">
                    <Link
                        to="/settings"
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all text-slate-500 hover:bg-white/5 hover:text-white border border-transparent ${location.pathname === '/settings' ? 'bg-white/10 text-white' : ''}`}
                    >
                        <Settings className="w-6 h-6" />
                    </Link>
                    <button
                        onClick={onToggle}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-white transition-all bg-white/5 border border-white/5"
                    >
                        {isOpen ? <ChevronLeft className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-primary" />}
                    </button>
                </div>
            </div>

            {/* Secondary Panel (Context Navigation) */}
            <div className={`flex-1 flex flex-col bg-slate-950/50 backdrop-blur-2xl transition-all duration-500 overflow-hidden ${!isOpen ? 'w-0 opacity-0 pointer-events-none' : 'w-60 opacity-100'}`}>
                {/* Header */}
                <div className="h-20 flex items-center px-8 border-b border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Active App</span>
                        <h2 className="text-sm font-extrabold flex items-center gap-2.5 text-white tracking-tight">
                            <currentApp.icon className="w-4 h-4 text-primary" />
                            {currentApp.label}
                        </h2>
                    </div>
                </div>

                {/* Sub Menu */}
                <div className="p-6 space-y-2 overflow-y-auto flex-1 scrollbar-hide">
                    <div className="px-2 mb-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] opacity-80">Navigation</div>
                    {currentApp.items.map(item => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-xs tracking-tight relative
                                ${isActive
                                        ? 'bg-white/5 text-white shadow-2xl border border-white/10'
                                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border border-transparent'}`}
                            >
                                {isActive && <div className="absolute left-0 w-1 h-4 bg-primary rounded-full" />}
                                <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'opacity-40 group-hover:opacity-100'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="p-8 mt-auto">
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-primary/10 via-slate-900 to-slate-950 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
                        <h4 className="font-extrabold text-[10px] mb-2 text-white uppercase tracking-widest">HighShift Pro</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Solo Access Active • Verified Identity</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
