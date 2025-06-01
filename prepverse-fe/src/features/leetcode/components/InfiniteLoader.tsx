
const InfiniteLoader = ({ className = "" }) => {
    return (
        <div className={`relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden ${className}`}>
            {/* Primary moving bar */}
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent w-1/3 animate-pulse">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg animate-bounce"
                    style={{
                        animation: 'slide 2s ease-in-out infinite'
                    }} />
            </div>

            {/* Secondary shimmer effect */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                    animation: 'shimmer 3s ease-in-out infinite'
                }} />

            <style>{`
        @keyframes slide {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(200%); }
        100% { transform: translateX(300%); }
        }
        
        @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
        }`}</style>
        </div>
    );
};

export default InfiniteLoader;