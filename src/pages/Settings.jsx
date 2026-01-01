import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <div>
                <h1 className="text-3xl font-bold mb-1">Settings</h1>
                <p className="text-gray-400">Manage your workspace preferences</p>
            </div>

            <div className="glass-card rounded-3xl p-6 min-h-[600px] flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                            ${activeTab === tab.id
                                    ? 'bg-primary/20 text-white shadow-lg shadow-primary/5'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 rounded-2xl p-8 border border-white/5">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 max-w-lg">
                            <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-2xl font-bold">
                                    ME
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold">Change Avatar</button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                    <input type="text" defaultValue="Demo User" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:border-primary/50 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <input type="email" defaultValue="user@example.com" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:border-primary/50 outline-none transition-all" />
                                </div>
                            </div>

                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primaryHover font-bold shadow-lg shadow-primary/20 w-fit mt-4">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="text-center py-20">
                            <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">Billing Portal</h3>
                            <p className="text-gray-400 max-w-sm mx-auto mt-2 mb-6">Manage your subscription, payment methods, and invoices via Stripe.</p>
                            <button className="px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200">Open Customer Portal</button>
                        </div>
                    )}

                    {/* Placeholders for others */}
                    {(activeTab !== 'profile' && activeTab !== 'billing') && (
                        <div className="text-center py-20 opacity-50">
                            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p>This section is under construction.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
