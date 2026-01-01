import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointer } from 'lucide-react';

const MOCK_DATA = [
    { name: 'Mon', views: 4000, likes: 2400, amt: 2400 },
    { name: 'Tue', views: 3000, likes: 1398, amt: 2210 },
    { name: 'Wed', views: 2000, likes: 9800, amt: 2290 },
    { name: 'Thu', views: 2780, likes: 3908, amt: 2000 },
    { name: 'Fri', views: 1890, likes: 4800, amt: 2181 },
    { name: 'Sat', views: 2390, likes: 3800, amt: 2500 },
    { name: 'Sun', views: 3490, likes: 4300, amt: 2100 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
    <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/5 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}%
            </div>
        </div>
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{value}</div>
        <div className="text-sm text-gray-400">{title}</div>
    </div>
);

export default function Analytics() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Impressions" value="2.4M" change={12.5} isPositive={true} icon={Eye} />
                <StatCard title="Total Engagement" value="45.2K" change={8.2} isPositive={true} icon={MousePointer} />
                <StatCard title="New Followers" value="1,204" change={-2.4} isPositive={false} icon={Users} />
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6">Growth Trends</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_DATA}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Engagement Chart */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6">Engagement Source</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="likes" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
