import { useState } from 'react';
import { PenTool, Inbox, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

// Tab Components
import Publisher from '../components/dashboard/Publisher';
import MediaFeed from '../components/dashboard/MediaFeed';
import ApiKeys from './ApiKeys';

const TABS = [
    { id: 'publishing', label: 'Publishing', icon: PenTool },
    { id: 'inbox', label: 'Smart Inbox', icon: Inbox },
    { id: 'api', label: 'Developer API', icon: Terminal },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('publishing');

    return (
        <div className="h-full flex flex-col max-w-[1800px] mx-auto">

            {/* Tab Navigation Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all z-10
                                    ${isActive
                                        ? 'text-indigo-600 dark:text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 -z-10"
                                    />
                                )}
                                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : ''}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0">
                {activeTab === 'publishing' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                        <Publisher />
                    </motion.div>
                )}
                {activeTab === 'inbox' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                        <MediaFeed />
                    </motion.div>
                )}
                {activeTab === 'api' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto custom-scrollbar">
                        <ApiKeys />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

