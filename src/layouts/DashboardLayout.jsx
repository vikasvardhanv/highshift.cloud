import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background text-white font-sans flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
                ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

                {/* Navbar (Top Bar) */}
                {/* Note: We might want a simplified TopBar here instead of the full public Navbar later */}
                <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        {/* Breadcrumbs or Title could go here */}
                        <div className="text-sm text-gray-400">HighShift Cloud &gt; Dashboard</div>

                        {/* User Profile / Actions could go here */}
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                            ME
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-x-hidden">
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
