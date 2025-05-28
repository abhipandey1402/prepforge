import { Plane } from 'lucide-react';
import React from 'react';

interface ChatFooterProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ newMessage, setNewMessage, handleSendMessage }) => {
    return (
        <div className="bg-white p-4 flex items-center gap-6">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-200 rounded-lg px-4 py-4 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 py-2 rounded-lg flex items-center"
                onClick={handleSendMessage}
            >
                <Plane className="mr-4" />
                Send
            </button>
        </div>
    );
};

export default ChatFooter;