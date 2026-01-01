import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAccounts } from '../services/api';
import { User, ChevronDown, LogOut } from 'lucide-react';

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
            // Try to get user from connected accounts
            const data = await getAccounts();
            if (data && data.accounts && data.accounts.length > 0) {
                const firstAccount = data.accounts[0];
                setUser({
                    name: firstAccount.displayName || firstAccount.username || 'User',
                    email: firstAccount.rawProfile?.email || null,
                    avatar: firstAccount.rawProfile?.data?.profile_image_url || null,
                    initials: (firstAccount.displayName || firstAccount.username || 'U').substring(0, 2).toUpperCase()
                });
            } else {
                // Fallback to basic user display
                setUser({ name: 'User', initials: 'U' });
            }
        } catch (err) {
            console.error('Failed to load user info:', err);
            setUser({ name: 'User', initials: 'U' });
        }
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('social_api_key');
            window.location.href = '/login';
        }
    };

    // Get page title from current route
    const getPageTitle = () => {
        const path = location.pathname;
        const titles = {
            '/dashboard': 'Dashboard',
            '/analytics': 'Analytics',
            '/schedule': 'Schedule',
            '/calendar': 'Calendar View',
            '/media': 'Media Library',
            '/ai': 'Ghostwriter',
            '/brand': 'Brand Kit',
            '/history': 'History',
            '/api-keys': 'API Keys',
            '/settings': 'Settings',
        };
        return titles[path] || 'Dashboard';
    };

    return (
        <div className="min-h-screen bg-background text-white font-sans flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
                ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

                {/* Top Bar */}
                <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-400">
                            HighShift Cloud &gt; <span className="text-white font-medium">{getPageTitle()}</span>
                        </div>

                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                            >
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full border border-primary/30"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                                        {user?.initials || 'U'}
                                    </div>
                                )}
                                <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 animate-fade-in">
                                    <div className="px-4 py-2 border-b border-white/5">
                                        <p className="text-sm font-medium">{user?.name}</p>
                                        {user?.email && <p className="text-xs text-gray-400">{user.email}</p>}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-x-hidden" onClick={() => setShowDropdown(false)}>
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <div className="p-6 border-t border-white/5">
                    <p className="text-center text-gray-500 text-xs">
                        © {new Date().getFullYear()} HighShift Cloud. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

