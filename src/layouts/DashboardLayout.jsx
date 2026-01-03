import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAccounts } from '../services/api';
import { User, ChevronDown, LogOut, Menu, Settings } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            const data = await getAccounts();
            if (data && data.accounts && data.accounts.length > 0) {
                const firstAccount = data.accounts[0];
                setUser({
                    name: firstAccount.displayName || firstAccount.username || 'Ghost Admin',
                    email: firstAccount.rawProfile?.email || null,
                    avatar: firstAccount.rawProfile?.data?.profile_image_url || null,
                    initials: (firstAccount.displayName || firstAccount.username || 'G').substring(0, 2).toUpperCase()
                });
            } else {
                setUser({ name: 'Ghost Admin', initials: 'GA' });
            }
        } catch (err) {
            console.error('Failed to load user info:', err);
            setUser({ name: 'Ghost Admin', initials: 'GA' });
        }
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('social_api_key');
            window.location.href = '/login';
        }
    };

    // Get theme colors based on route - matching highshift.cloud premium vibes
    const getPageTheme = () => {
        const path = location.pathname;
        if (path.includes('/schedule') || path.includes('/calendar')) return 'from-emerald-600/10 via-slate-950 to-slate-950';
        if (path.includes('/analytics')) return 'from-blue-600/10 via-slate-950 to-slate-950';
        if (path.includes('/media')) return 'from-cyan-600/10 via-slate-950 to-slate-950';
        if (path.includes('/ai')) return 'from-violet-600/10 via-slate-950 to-slate-950';
        if (path.includes('/brand')) return 'from-rose-600/10 via-slate-950 to-slate-950';
        if (path.includes('/history')) return 'from-slate-600/10 via-slate-950 to-slate-950';
        if (path.includes('/apikeys')) return 'from-amber-600/05 via-slate-950 to-slate-950';
        return 'from-primary/10 via-slate-950 to-slate-950'; // Default Dashboard
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans flex relative overflow-hidden">
            {/* Ambient Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br transition-all duration-1000 ease-in-out ${getPageTheme()}`} />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Sidebar Component */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-500 relative z-10
                ${sidebarOpen ? 'ml-80' : 'ml-20'}`}>

                {/* Top Bar - Glassmorphism Refined */}
                <header className="sticky top-0 z-40 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
                    <div className="container mx-auto px-8 h-20 flex items-center justify-between">
                        {/* Top Left: Context Indicator */}
                        <div className="flex items-center gap-6">
                            <div className={`flex items-center gap-4 transition-all duration-500 ${sidebarOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-2xl">
                                    <span className="font-bold text-white text-xl">H</span>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Console</span>
                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                <h1 className="text-sm font-bold text-slate-200 tracking-tight">
                                    {location.pathname.split('/').pop()?.toUpperCase() || 'DASHBOARD'}
                                </h1>
                            </div>
                        </div>

                        {/* Top Right: System status & Profile */}
                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Systems Nominal</span>
                            </div>

                            <ThemeToggle />

                            <div className="h-8 w-px bg-white/5" />

                            <div className="relative group p-1">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-3 p-1 pr-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-[1.25rem] transition-all"
                                >
                                    {user?.avatar ? (
                                        <img src={user.avatar} className="w-9 h-9 rounded-xl object-cover border border-white/10 shadow-lg" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-bold text-white border border-white/10 shadow-lg">
                                            {user?.initials || 'G'}
                                        </div>
                                    )}
                                    <div className="text-left hidden lg:block">
                                        <p className="text-xs font-bold text-white leading-none">{user?.name || 'Ghost Admin'}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1">Identity Verified</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 top-full mt-3 w-64 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden py-2 animate-fade-in z-50">
                                        <div className="px-5 py-4 border-b border-white/5 mb-2 bg-white/5">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">User Identity</p>
                                            <p className="text-sm font-bold text-white">{user?.name}</p>
                                            <p className="text-[11px] text-slate-500 font-medium truncate">{user?.email || 'ghost@highshift.cloud'}</p>
                                        </div>

                                        <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                                            <User className="w-4 h-4 opacity-50" /> Profile Settings
                                        </Link>
                                        <Link to="/settings" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                                            <Settings className="w-4 h-4 opacity-50" /> Preferences
                                        </Link>

                                        <div className="h-px bg-white/5 my-2" />

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" /> Revoke Session
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto scrollbar-hide" onClick={() => setShowDropdown(false)}>
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-white/5">
                    <p className="text-center text-slate-400 dark:text-gray-500 text-xs">
                        © {new Date().getFullYear()} HighShift Cloud. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

