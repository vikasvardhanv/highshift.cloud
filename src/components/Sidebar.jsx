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
            className={`fixed left-0 top-0 h-screen bg-background border-r border-white/5 transition-all duration-300 z-50 flex
            ${isOpen ? 'w-80' : 'w-20'}`}
        >
            {/* Primary Rail (App Switcher) */}
            <div className="w-20 h-full flex flex-col items-center py-6 border-r border-white/5 bg-black/20 backdrop-blur-xl z-20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 mb-8 shadow-lg shadow-primary/20">
                    <span className="font-bold text-white text-lg">H</span>
                </div>

                <div className="flex-1 flex flex-col gap-4 w-full px-3">
                    {APPS.map(app => {
                        const isActive = currentApp.id === app.id;
                        return (
                            <Link
                                key={app.id}
                                to={app.mainPath}
                                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all relative group
                                ${isActive
                                        ? 'bg-primary/20 text-primary border border-primary/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                            >
                                <app.icon className="w-6 h-6 mb-1" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">{app.label}</span>

                                {/* Tooltip */}
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-white/10 shadow-xl translate-x-1 group-hover:translate-x-2">
                                    {app.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="w-full px-3 mt-auto space-y-4">
                    <Link
                        to="/settings"
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all text-gray-400 hover:bg-white/5 hover:text-white border border-transparent ${location.pathname === '/settings' ? 'bg-white/10 text-white' : ''}`}
                    >
                        <Settings className="w-6 h-6" />
                    </Link>
                    <button
                        onClick={onToggle}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Secondary Panel (Context Navigation) */}
            <div className={`flex-1 flex flex-col bg-background/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${!isOpen ? 'w-0 opacity-0 pointer-events-none' : 'w-60 opacity-100'}`}>
                {/* Header */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-3 animate-fade-in">
                        <currentApp.icon className="w-5 h-5 text-primary" />
                        {currentApp.label}
                    </h2>
                </div>

                {/* Sub Menu */}
                <div className="p-4 space-y-1 overflow-y-auto flex-1">
                    <div className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest opacity-50">Menu</div>
                    {currentApp.items.map(item => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm
                                ${isActive
                                        ? 'bg-white/10 text-white shadow-lg shadow-black/5'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="p-6 border-t border-white/5">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-white/5">
                        <h4 className="font-bold text-xs mb-1 text-white">HighShift Pro</h4>
                        <p className="text-[10px] text-gray-400">Your workspace is active</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
