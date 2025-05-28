import React from 'react';

interface ChatMessage {
    id: number;
    sender: string;
    time: string;
    message: string;
    isSent: boolean;
}

interface ChatContentProps {
    chatData: ChatMessage[];
}

const ChatContent: React.FC<ChatContentProps> = ({ chatData }) => {
    return (
        <div
            className="flex flex-col justify-between overflow-y-auto [::-webkit-scrollbar]:hidden scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
        >
            {chatData?.map((chat) => (
                <div
                    key={chat.id}
                    className={`mb-4 flex ${chat.isSent ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[70%] px-4 py-3 rounded-lg ${chat.isSent
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-100 rounded-bl-none'
                            } text-xl max-w-xl`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">
                                {chat.sender === 'You' ? 'You' : chat.sender}
                            </div>
                            <div className="text-gray-500 text-sm">{chat.time}</div>
                        </div>
                        <div>{chat.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatContent;
