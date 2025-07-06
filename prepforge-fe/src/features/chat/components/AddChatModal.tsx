import { useEffect, useState } from "react";
import { X, UserPlus, XCircle } from "lucide-react";
import Input from "../commonComponents/Input";
import Select from "../commonComponents/Select";
import { useGetAvailableUsers } from "../hooks/useGetAvailableUsers";
import { useCreateGroupChat } from "../hooks/useCreateGroupChat";
import { useCreateUserChat } from "../hooks/useCreateUserChat";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const AddChatModal: React.FC<{
    open: boolean;
    onClose: () => void;
    onSuccess: (chat: any) => void;
}> = ({ open, onClose, onSuccess }) => {
    const [users, setUsers] = useState<any[]>([]);
    const [groupName, setGroupName] = useState("");
    const [isGroupChat, setIsGroupChat] = useState(false);
    const [groupParticipants, setGroupParticipants] = useState<string[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<null | string>(null);
    const [creatingChat] = useState(false);

    const { getAvailableUsers } = useGetAvailableUsers();
    const { createGroupChat } = useCreateGroupChat();
    const { createUserChat } = useCreateUserChat();

    const getUsers = async () => {
        try {
            const res = await getAvailableUsers();
            if (res) {
                setUsers(res || []);
            }
        } catch (err) {
            toast.error("Failed to fetch users");
        }
    };

    const createNewChat = async () => {
        if (!selectedUserId) {
            toast.warning("Please select a user");
            return;
        }
        try {
            const res = await createUserChat(selectedUserId || "");
            if (res) {
                const { data } = res;
                if (res.statusCode === 200) {
                    toast.warning("Chat with selected user already exists");
                    return;
                }
                onSuccess(data);
                handleClose();
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const createNewGroupChat = async () => {
        if (!groupName) {
            toast.warning("Group name is required");
            return;
        }
        if (groupParticipants.length < 2) {
            toast.warning("There must be at least 2 group participants");
            return
        }

        try {
            const res = await createGroupChat({ name: groupName, participants: groupParticipants });
            if (res) {
                const { data } = res;
                onSuccess(data);
                handleClose();
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const handleClose = () => {
        setUsers([]);
        setSelectedUserId("");
        setGroupName("");
        setGroupParticipants([]);
        setIsGroupChat(false);
        onClose();
    };

    useEffect(() => {
        if(open){
            getUsers();
        }
    }, [open]);

    return (
        <div
            className={`fixed inset-0 z-10 overflow-y-auto ${open ? "block" : "hidden"
                }`}
        >
            <div className="flex items-center justify-center min-h-screen bg-black/50">
                <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full text-white">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Create Chat</h3>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-200">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                className="toggle-checkbox"
                                checked={isGroupChat}
                                onChange={(e) => setIsGroupChat(e.target.checked)}
                            />
                            <span>Is it a group chat?</span>
                        </label>
                    </div>
                    {isGroupChat && (
                        <Input
                            className="mt-4"
                            placeholder="Enter a group name..."
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    )}
                    <Select
                        className="mt-4"
                        placeholder={
                            isGroupChat
                                ? "Select group participants..."
                                : "Select a user to chat..."
                        }
                        value={isGroupChat ? "" : selectedUserId || ""}
                        options={users?.map((user) => ({
                            label: user.username,
                            value: user._id,
                        }))}
                        onChange={({ value }: any) => {
                            if (isGroupChat && !groupParticipants.includes(value)) {
                                setGroupParticipants([...groupParticipants, value]);
                            } else {
                                setSelectedUserId(value);
                            }
                        }}
                    />
                    {isGroupChat && (
                        <div className="mt-4">
                            <div className="font-medium text-white flex items-center mb-2">
                                <UserPlus className="w-5 h-5 mr-2" />
                                Selected participants
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {users
                                    .filter((user) => groupParticipants.includes(user._id))
                                    .map((participant) => (
                                        <div
                                            key={participant._id}
                                            className="flex items-center bg-gray-700 p-2 rounded-full space-x-2"
                                        >
                                            <img
                                                src={participant.avatarUrl}
                                                alt={participant.username}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span>{participant.username}</span>
                                            <XCircle
                                                className="w-5 h-5 text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    setGroupParticipants(
                                                        groupParticipants.filter((id) => id !== participant._id)
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button
                            disabled={creatingChat}
                            onClick={isGroupChat ? createNewGroupChat : createNewChat}
                        >
                            {isGroupChat ? "Create Group Chat" : "Create Chat"}
                        </Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddChatModal;
