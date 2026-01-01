import { Upload, Image as ImageIcon, Film, MoreVertical } from 'lucide-react';

const MOCK_ASSETS = [
    { id: 1, type: 'image', name: 'Product_Launch_Banner.jpg', size: '2.4 MB', date: '2 mins ago', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 2, type: 'image', name: 'Team_Meeting.png', size: '1.2 MB', date: '4 hours ago', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 3, type: 'video', name: 'Demo_Reel_FINAL.mp4', size: '45.2 MB', date: '1 day ago', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 4, type: 'image', name: 'Office_Setup.jpg', size: '3.1 MB', date: '2 days ago', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 5, type: 'image', name: 'Logo_Variant_3.png', size: '500 KB', date: '3 days ago', url: 'https://images.unsplash.com/photo-1626785774573-4b79931434c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
];

export default function MediaLibrary() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Media Library</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryHover rounded-lg text-sm font-semibold transition-colors">
                    <Upload className="w-4 h-4" /> Upload New
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_ASSETS.map((asset) => (
                    <div key={asset.id} className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="aspect-square relative bg-black/20">
                            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-xs font-medium text-white backdrop-blur-sm flex items-center gap-1">
                                {asset.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                {asset.type.toUpperCase()}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="font-medium text-sm truncate">{asset.name}</div>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                <span>{asset.size}</span>
                                <span>{asset.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
