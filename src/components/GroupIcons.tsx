import { type User } from "@prisma/client"
import Image from "next/image"

const GroupIcons = ({ users }: { users: User[] }) => (
    <div className="flex -space-x-1 overflow-hidden">
        {users?.map((user, key) => {
            if (key > 4) return (<></>)

            return (
                <Image
                    key={`image-${user.id}`}
                    width='8'
                    height='8'
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src={user.image ? user.image : '/avatar.svg'}
                    alt="" />
            )
        })}
        {/* <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
    </div>
)

export default GroupIcons
