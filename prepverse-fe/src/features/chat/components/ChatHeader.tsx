import { EllipsisVertical, Phone, SearchIcon } from 'lucide-react'

const ChatHeader = () => {
    return (
        <header className="bg-transparent p-2 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-400 mr-3"></div>
                <div className='flex flex-col gap-1'>
                    <h2 className="text-3xl font-bold">Design chat</h2>
                    <div className="text-gray-500 font-semibold text-xl">23 members, 10 online</div>
                </div>
            </div>
            <div className='flex gap-10 text-gray-400'>
                <SearchIcon className='cursor-pointer' />
                <Phone className='cursor-pointer' />
                <EllipsisVertical className='cursor-pointer' />
            </div>
        </header>
    )
}

export default ChatHeader