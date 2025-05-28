import { ChevronDown, List, Search, UserCircle } from "lucide-react";

export interface User {
    id: number;
    name: string;
    image: string;
    status: 'Online' | 'Offline' | 'Busy';
}

export interface Channel {
    id: number;
    name: string;
    members: number;
}

export const usersData: User[] = [
    {
        id: 1,
        name: 'Jasmin Lowery',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        status: 'Online',
    },
    {
        id: 2,
        name: 'Alex Hunt',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        status: 'Offline',
    },
    {
        id: 3,
        name: 'Jayden Hurch',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        status: 'Online',
    },
    {
        id: 4,
        name: 'Lara Cook',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        status: 'Busy',
    },
];

export const channelsData: Channel[] = [
    { id: 1, name: 'General', members: 23 },
    { id: 2, name: 'Design', members: 10 },
    { id: 3, name: 'Development', members: 18 },
    { id: 4, name: 'Announcements', members: 8 },
];

const ChatSidebar = () => {
    return (
        <div className="bg-transparent w-1/4 border-r border-gray-200 p-4 hidden md:block">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-fit flex-1 bg-gray-200 rounded-md px-4 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="text-gray-500 text-2xl ml-4 cursor-pointer" />
            </div>
            <div className='mb-6'>
                <div className="flex items-center justify-between text-gray-500 text-2xl mb-4 mt-10">
                    <div className="flex items-center">
                        <List className="mr-2" />
                        <span className='font-semibold'>Channels</span>
                    </div>
                    <ChevronDown />
                </div>
                <ul>
                    {channelsData.map((channel) => (
                        <li
                            key={channel.id}
                            className="mb-3 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 text-2xl font-medium">{channel.name}</span>
                                <span className="text-gray-500 text-lg">
                                    {channel.members} members
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center justify-between text-gray-500 text-2xl mb-4">
                    <div className="flex items-center">
                        <UserCircle className="mr-2" />
                        <span className='font-semibold'>Direct Chats</span>
                    </div>
                    <ChevronDown />
                </div>
                <ul>
                    {usersData.map((user) => (
                        <li
                            key={user.id}
                            className="mb-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-16 h-16 rounded-xl mr-6"
                            />
                            <div>
                                <div className="text-gray-700 font-medium text-2xl">{user.name}</div>
                                <div
                                    className={`text-sm ${user.status === 'Online'
                                        ? 'text-green-500'
                                        : user.status === 'Busy'
                                            ? 'text-yellow-500'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {user.status}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatSidebar