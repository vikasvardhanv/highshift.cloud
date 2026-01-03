import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
            {/* Onboarding Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10 p-12 md:p-16">

                {/* Progress Bar Container */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 1: Connect Profiles</span>
                        <span className="text-xs font-bold text-primary">50% Complete</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-1.5 flex-1 bg-primary rounded-full" />
                        ))}
                        {[4, 5, 6].map(i => (
                            <div key={i} className="h-1.5 flex-1 bg-slate-100 dark:bg-white/10 rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Connect a profile
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-gray-400 mb-10 leading-relaxed">
                        Attach a profile to see how HighShift can help grow your business.
                        You'll be able to unify your inbox, automate scheduling, and track performance.
                    </p>

                    {/* Platform Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        <ConnectButton
                            platform="Facebook"
                            icon={Facebook}
                            color="bg-[#1877F2]"
                            hoverColor="hover:bg-[#166fe5]"
                            onClick={() => handleConnect('facebook')}
                        />
                        <ConnectButton
                            platform="Instagram"
                            icon={Instagram}
                            color="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                            hoverColor="hover:opacity-90"
                            onClick={() => handleConnect('instagram')}
                        />
                        <ConnectButton
                            platform="LinkedIn"
                            icon={Linkedin}
                            color="bg-[#0A66C2]"
                            hoverColor="hover:bg-[#004182]"
                            onClick={() => handleConnect('linkedin')}
                        />
                        <ConnectButton
                            platform="X Profile"
                            icon={Twitter}
                            color="bg-black"
                            hoverColor="hover:bg-slate-900"
                            onClick={() => handleConnect('twitter')}
                        />
                    </div>

                    <p className="text-center text-slate-400 text-sm">
                        You can connect more profiles and networks later.
                    </p>
                </div>
            </div>

            {/* Support/Info below */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-8 opacity-60">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Safe & Secure with Enterprise OAuth 2.0</p>
                </div>
                <div className="flex gap-6">
                    <span className="text-xs uppercase tracking-widest font-bold">Privacy Policy</span>
                    <span className="text-xs uppercase tracking-widest font-bold">Terms of Service</span>
                </div>
            </div>
        </div>
    );
}

function ConnectButton({ platform, icon: Icon, color, hoverColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-3 px-6 py-4 ${color} ${hoverColor} text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95`}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{platform} {platform !== 'X Profile' ? 'Page' : ''}</span>
        </button>
    );
}
