import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Calendar, Clock, Layers, Image as ImageIcon, CheckCircle, Repeat } from 'lucide-react';

export default function Publishing() {
    const features = [
        {
            title: "Visual Calendar",
            description: "Drag-and-drop your posts to reschedule instantly. View your content strategy by day, week, or month.",
            icon: Calendar
        },
        {
            title: "Best Time to Post",
            description: "Let our AI analyze your audience engagement capability to suggest the perfect publish times.",
            icon: Clock
        },
        {
            title: "Multi-Platform Scheduling",
            description: "Write once, publish everywhere. Customize captions and media for LinkedIn, X, and Instagram in one go.",
            icon: Layers
        },
        {
            title: "Asset Library",
            description: "Store, organize, and edit your images and videos directly within HighShift. No more Google Drive chaos.",
            icon: ImageIcon
        },
        {
            title: "Approval Workflows",
            description: "Set up team permissions. Drafts must be approved by a manager before going live.",
            icon: CheckCircle
        },
        {
            title: "Evergreen Recycling",
            description: "Automatically re-queue your best performing evergreen content to fill gaps in your schedule.",
            icon: Repeat
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Media Publishing"
            subtitle="Plan, collaborate, and publish content that drives meaningful engagement. All from one intuitive calendar."
            heroGradient="from-blue-500 to-cyan-500"
            features={features}
        />
    );
}
