import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart2,
    Calendar,
    Image,
    PenTool,
    MessageSquare,
    History,
    Palette,
    Settings,
    LogOut,
    Network,
    Zap
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Overview', path: '/publishing', icon: LayoutDashboard },
    { label: 'Connections', path: '/connections', icon: Network },
    { label: 'Schedule', path: '/schedule', icon: Calendar },
    { label: 'Media Library', path: '/media', icon: Image },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { label: 'Engagement', path: '/inbox', icon: MessageSquare },
    { label: 'Brand Kit', path: '/brand', icon: Palette },
    { label: 'AI Studio', path: '/ai', icon: Zap },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }) {
    const location = useLocation();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 flex flex-col
            ${isOpen ? 'w-64' : 'w-20'}`}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/50">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/20">
                    <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className={`ml-3 font-bold text-lg text-slate-800 dark:text-white tracking-tight transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                    HighShift
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                            ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} strokeWidth={2} />
                            <span className={`whitespace-nowrap transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                                {item.label}
                            </span>

                            {/* Active Indicator (Right side) */}
                            {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
                {/* Could put user here or collapse toggle */}
            </div>
        </aside>
    );
}
