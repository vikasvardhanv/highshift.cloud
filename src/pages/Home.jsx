import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-4xl"
            >
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20 mb-6 inline-block">
                    The Unified Social OS
                </span>
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 leading-tight">
                    Manage Everything. <br /> <span className="text-primary">Without the Clutter.</span>
                </h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    The power of Sprout's analytics, the speed of Planable's collaboration, and the agency tools of SocialPilot.
                    All in one beautiful, developer-friendly platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/pricing" className="px-8 py-4 rounded-full bg-primary hover:bg-primaryHover text-white font-semibold text-lg transition-all shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center gap-2">
                        Start Building <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a href="#" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-all border border-white/10 flex items-center gap-2">
                        View Documentation
                    </a>
                </div>
            </motion.div>

            {/* Code Snippet */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-20 w-full max-w-3xl glass-card rounded-xl overflow-hidden shadow-2xl"
            >
                <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500">upload.js</span>
                </div>
                <div className="p-6 bg-[#0d0d0d] font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> axios.<span className="text-blue-400">post</span>(
                        <span className="text-green-400">'https://api.socialapi.com/post/multi'</span>,
                        {'{'}
                        <span className="text-orange-300">accounts</span>: [<span className="text-green-400">'twitter'</span>, <span className="text-green-400">'instagram'</span>, <span className="text-green-400">'youtube'</span>],
                        <span className="text-orange-300">content</span>: <span className="text-green-400">"Check out our new feature! 🚀"</span>
                        {'}'},
                        {'{'}
                        <span className="text-orange-300">headers</span>: {'{'} <span className="text-green-400">'X-API-Key'</span>: <span className="text-green-400">'YOUR_KEY_HERE'</span> {'}'}
                        {'}'}
                        );
                    </pre>
                </div>
            </motion.div>

            {/* Comparison / Superiority Section */}
            <div className="mt-32 w-full max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">The Best of All Worlds</h2>
                    <p className="text-gray-400">We took the pros from every platform and fixed the cons.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<CheckCircle className="text-green-400 w-6 h-6" />}
                        title="Unified Inbox"
                        desc="Manage comments, DMs, and mentions from one single stream. No more tab switching."
                    />
                    <FeatureCard
                        icon={<Terminal className="text-blue-400 w-6 h-6" />}
                        title="Agency Power"
                        desc="White label reporting and client portals built-in. Scale without the enterprise price tag."
                    />
                    <FeatureCard
                        icon={<Code className="text-purple-400 w-6 h-6" />}
                        title="Seamless Collab"
                        desc="Approval workflows and team seats included. Works just like Planable, but integrated."
                    />
                </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl w-full">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                    <h3 className="font-bold mb-2 text-lg">Visual Planner</h3>
                    <p className="text-sm text-gray-400">Drag-and-drop calendar for easy scheduling across 7+ platforms.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                    <h3 className="font-bold mb-2 text-lg">Smart Analytics</h3>
                    <p className="text-sm text-gray-400">Deep insights without the 'add-on' fees. Know what works instantly.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                    <h3 className="font-bold mb-2 text-lg">Developer API</h3>
                    <p className="text-sm text-gray-400">Built via API first. Automate your workflow with code if you prefer.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                    <h3 className="font-bold mb-2 text-lg">Fair Pricing</h3>
                    <p className="text-sm text-gray-400">No hidden fees. Enterprise features at startup friendly prices.</p>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{desc}</p>
        </div>
    );
}
