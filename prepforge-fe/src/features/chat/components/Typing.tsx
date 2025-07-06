import { classNames } from "../utils/index";

const Typing = () => {
    return (
        <>
            <div
                className={classNames(
                    "p-2 rounded-2xl bg-orange-600 w-fit inline-flex gap-1 items-center"
                )}
            >
                <span className="typing-dot-1 h-1.5 w-1.5 bg-zinc-100 rounded-full animate-bounce"></span>
                <span className="typing-dot-2 h-1.5 w-1.5 bg-zinc-100 rounded-full animate-bounce"></span>
                <span className="typing-dot-3 h-1.5 w-1.5 bg-zinc-100 rounded-full animate-bounce"></span>
            </div>
            
            <style>{`
                .typing-dot-1 {
                    animation: typing-bounce 1.4s ease-in-out infinite;
                    animation-delay: 0s;
                    opacity: 0.4;
                }
                
                .typing-dot-2 {
                    animation: typing-bounce 1.4s ease-in-out infinite;
                    animation-delay: 0.2s;
                    opacity: 0.4;
                }
                
                .typing-dot-3 {
                    animation: typing-bounce 1.4s ease-in-out infinite;
                    animation-delay: 0.4s;
                    opacity: 0.4;
                }
                
                @keyframes typing-bounce {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
                        scale: 1;
                    }
                    30% {
                        transform: translateY(-6px);
                        opacity: 1;
                        scale: 1.1;
                    }
                }
            `}</style>
        </>
    );
};

export default Typing;