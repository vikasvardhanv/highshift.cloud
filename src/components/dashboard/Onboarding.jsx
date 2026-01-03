import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { getAuthUrl } from '../../services/api';

export default function Onboarding({ onComplete }) {

    const handleConnect = async (platform) => {
        try {
            const authUrl = await getAuthUrl(platform, window.location.origin + '/publishing');
            window.location.href = authUrl;
        } catch (err) {
            console.error('Failed to get auth URL:', err);
            alert('Failed to connect to ' + platform + '. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-20 px-4 animate-fade-in relative z-10">
            {/* Onboarding Card */}
            <div className="glass-card rounded-[3.5rem] bg-white/[0.02] border-white/5 shadow-2xl overflow-hidden p-12 md:p-20 relative group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-colors duration-1000 group-hover:bg-primary/15"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -ml-40 -mb-40 group-hover:bg-blue-500/10"></div>

                {/* Progress Indicators */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Link Status</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            Initialization Matrix Active
                        </span>
                    </div>
                    <div className="flex gap-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-1.5 flex-1 bg-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse" />
                        ))}
                        {[4, 5, 6].map(i => (
                            <div key={i} className="h-1.5 flex-1 bg-white/5 rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="max-w-2xl relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
                        Establish Network Node
                    </h1>
                    <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
                        Authorize a transmission vector to begin synchronizing your presence across the highshift network.
                    </p>

                    {/* Platform Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                        <ConnectButton
                            platform="Facebook"
                            icon={Facebook}
                            color="bg-[#1877F2]"
                            hoverShadow="shadow-blue-500/20"
                            onClick={() => handleConnect('facebook')}
                        />
                        <ConnectButton
                            platform="Instagram"
                            icon={Instagram}
                            color="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                            hoverShadow="shadow-rose-500/20"
                            onClick={() => handleConnect('instagram')}
                        />
                        <ConnectButton
                            platform="LinkedIn"
                            icon={Linkedin}
                            color="bg-[#0A66C2]"
                            hoverShadow="shadow-blue-700/20"
                            onClick={() => handleConnect('linkedin')}
                        />
                        <ConnectButton
                            platform="X Global"
                            icon={Twitter}
                            color="bg-black"
                            hoverShadow="shadow-white/5"
                            onClick={() => handleConnect('twitter')}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            Enterprise OAuth 2.0 Security Protocols Active
                        </div>
                    </div>
                </div>
            </div>

            {/* Support/Info below */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 px-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Synchronized Protocols</p>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">Automated Scheduling / Cross-Platform Sync</p>
                    </div>
                </div>
                <div className="flex gap-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 hover:text-primary cursor-pointer transition-colors">Digital Autonomy</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 hover:text-primary cursor-pointer transition-colors">Neural Policy</span>
                </div>
            </div>
        </div>
    );
}

function ConnectButton({ platform, icon: Icon, color, hoverShadow, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                group relative flex items-center justify-center gap-4 px-8 py-5 ${color} text-white rounded-[1.5rem] 
                text-sm font-black uppercase tracking-[0.15em] transition-all duration-500 
                hover:scale-105 active:scale-95 shadow-2xl ${hoverShadow}
                overflow-hidden
            `}
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className="w-5 h-5 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
            <span className="relative z-10">{platform}</span>
        </button>
    );
}
