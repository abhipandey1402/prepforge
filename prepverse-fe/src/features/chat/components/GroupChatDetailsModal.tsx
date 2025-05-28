import {
    PencilIcon,
    TrashIcon,
    GroupIcon,
    UserPlusIcon,
    XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "../commonComponents/Input";
import Select from "../commonComponents/Select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAddParticipantToGroup } from "../hooks/useAddParticipantToGroup";
import { useDeleteGroup } from "../hooks/useDeleteGroup";
import { useUpdateGroupName } from "../hooks/useUpdateGroupName";
import { useGetAvailableUsers } from "../hooks/useGetAvailableUsers";
import { useRemoveParticipantFromGroup } from "../hooks/useRemoveParticipantFromGroup";
import { useGetGroupInfo } from "../hooks/useGetGroupInfo";
import { toast } from "react-toastify";

const GroupChatDetailsModal: React.FC<{
    open: boolean;
    onClose: () => void;
    chatId: string;
    onGroupDelete: (chatId: string) => void;
}> = ({ open, onClose, chatId, onGroupDelete }) => {
    const user = useSelector((state: RootState) => state.auth?.userData?.user);

    const [participantToBeAdded, setParticipantToBeAdded] = useState("");
    const [newGroupName, setNewGroupName] = useState("");

    const [groupDetails, setGroupDetails] = useState<any | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    const { addParticipantToGroup, loading: addingParticipant } = useAddParticipantToGroup();
    const { removeParticipantFromGroup, loading: removingParticipant } = useRemoveParticipantFromGroup();
    const { deleteGroup, loading: deletingGroup } = useDeleteGroup();
    const { updateGroupName, loading: renamingGroup } = useUpdateGroupName();
    const { getAvailableUsers, loading: gettingUsers } = useGetAvailableUsers();
    const { getGroupInfo, loading: gettingGroupInfo } = useGetGroupInfo();

    const handleGroupNameUpdate = async () => {
        if (!newGroupName) {
            toast.warning("Group name is required");
            return;
        }
        try {
            const res = await updateGroupName(chatId, newGroupName);
            if (res) {
                const { data } = res;
                setGroupDetails(data);
                setNewGroupName(data.name);
                toast.success("Group name updated to " + data.name);
            }
        } catch (err: any) {
            toast.error("Error occured", err);
        }
    };

    const getUsers = async () => {
        try {
            const users = await getAvailableUsers();
            if (users) {
                setUsers(users || []);
            }
        } catch (err) {
            toast.error("Failed to fetch users");
        }
    };

    // Function to delete a group chat.
    const deleteGroupChat = async () => {
        // Check if the user is the admin of the group before deletion.
        if (groupDetails?.admin !== user?._id) {
            toast.warning("You are not the admin of the group");
            return;
        }

        try {
            await deleteGroup(chatId);
            onGroupDelete(chatId);
            handleClose();
            toast.success("Group deleted successfully");
        } catch (err) {
            toast.error("Error occurred while deleting the group");
        }
    };

    // Function to remove a participant.
    const removeParticipant = async (participantId: string) => {
        try {
            const res = await removeParticipantFromGroup(chatId, participantId);
            const updatedGroupDetails = {
                ...groupDetails,
                participants: groupDetails?.participants?.filter((p: any) => p._id !== participantId) || [],
            };
            setGroupDetails(updatedGroupDetails as any);
            toast.success("Participant removed");
        } catch (err) {
            toast.error("Error occurred while removing the participant");
        }
    };

    // Function to add a participant to the group.
    const addParticipant = async () => {
        if (!participantToBeAdded) {
            toast.warning("Please select a participant to add.");
            return;
        }

        try {
            const res = await addParticipantToGroup(chatId, participantToBeAdded);
            const { data } = res;
            const updatedGroupDetails = {
                ...groupDetails,
                participants: data?.participants || [],
            };
            setGroupDetails(updatedGroupDetails as any);
            toast.success("Participant added");
        } catch (err) {
            toast.error("Error occurred while adding the participant");
        }
    };

    // Function to fetch group information.
    const fetchGroupInformation = async () => {
        try {
            const groupInfo = await getGroupInfo(chatId);
            if (groupInfo) {
                setGroupDetails(groupInfo);
                setNewGroupName(groupInfo && groupInfo?.name || "");
            }
        } catch (err) {
            toast.error("Error occurred while fetching group details");
        }
    };

    // Function to handle modal or component closure
    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (!open) return;

        fetchGroupInformation();
        getUsers();
    }, [open]);

    return (
        <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClose}
        >
            <div
                className={`fixed inset-0 flex items-center justify-center transition-transform duration-300 ${open ? 'transform-none' : 'transform translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the modal
            >
                <div className="w-full max-w-2xl bg-secondary py-6 shadow-xl px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-secondary text-zinc-400 hover:text-zinc-500 focus:outline-none"
                                onClick={handleClose}
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="text-center">
                            {renamingGroup ? (
                                <div className="flex justify-center gap-2">
                                    <Input
                                        placeholder="Enter new group name..."
                                        value={newGroupName}
                                        onChange={(e: any) => setNewGroupName(e.target.value)}
                                    />
                                    <Button onClick={handleGroupNameUpdate}>Save</Button>
                                    <Button>
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-2xl font-semibold truncate-1">
                                        {groupDetails?.name}
                                    </h1>
                                    {groupDetails?.admin === user?._id && (
                                        <button>
                                            <PencilIcon className="w-5 h-5 ml-4" />
                                        </button>
                                    )}
                                </div>
                            )}
                            <p className="mt-2 text-zinc-400 text-sm">
                                Group · {groupDetails?.participants.length} participants
                            </p>
                        </div>
                        <div className="mt-5">
                            <p className="inline-flex items-center">
                                <GroupIcon className="h-6 w-6 mr-2" />
                                {groupDetails?.participants.length} Participants
                            </p>
                            <div>
                                {groupDetails?.participants?.map((part: any) => (
                                    <div className="flex justify-between items-center py-4" key={part._id}>
                                        <div className="flex items-start gap-3 w-full">
                                            <img className="h-12 w-12 rounded-full" src={part?.avatarUrl} />
                                            <div>
                                                <p className="text-white font-semibold text-sm inline-flex items-center w-full">
                                                    {part.username}
                                                    {part._id === groupDetails.admin && (
                                                        <span className="ml-2 text-[10px] px-4 bg-success/10 border-[0.1px] border-success rounded-full text-success">
                                                            admin
                                                        </span>
                                                    )}
                                                </p>
                                                <small className="text-zinc-400">{part.email}</small>
                                            </div>
                                        </div>
                                        {groupDetails.admin === user?._id && (
                                            <div>
                                                <Button
                                                    onClick={() => {
                                                        const ok = confirm(
                                                            `Are you sure you want to remove ${part.username}?`
                                                        );
                                                        if (ok) {
                                                            removeParticipant(part._id || "");
                                                        }
                                                    }}
                                                    size="lg"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {groupDetails?.admin === user?._id && (
                                    <div className="mt-5 flex flex-col gap-4">
                                        {!addingParticipant ? (
                                            <Button
                                            >
                                                <UserPlusIcon className="w-5 h-5 mr-1" /> Add participant
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Select
                                                    placeholder="Select a user to add..."
                                                    value={participantToBeAdded}
                                                    options={users.map((user) => ({
                                                        label: user.username,
                                                        value: user._id,
                                                    }))}
                                                    onChange={({ value }: any) => setParticipantToBeAdded(value)}
                                                />
                                                <Button onClick={addParticipant}>+ Add</Button>
                                                <Button
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        )}
                                        <Button
                                            onClick={() => {
                                                const ok = confirm("Are you sure you want to delete this group?");
                                                if (ok) {
                                                    deleteGroupChat();
                                                }
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5 mr-1" /> Delete group
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupChatDetailsModal;
