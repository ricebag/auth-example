import type { User } from "@prisma/client";
import Image from "next/image"

type Props = {
  users: User[]
  onClick: (user: User) => void
}

const FriendCard = ({ users, onClick }: Props) => {
  console.log(users[0]?.image)
  const userDetails = users.map((user: User, key: number) => (
    <div key={key} className="shadow-lg flex p-5 border-8 cursor-pointer my-1 hover:bg-blue-lightest rounded min-w-full">
      <Image
        className="rounded-full"
        alt=""
        width='80'
        height='80'
        src={user.image ? user.image : 'https://cdn.discordapp.com/embed/avatars/0.png'}
      />
      <div className="w-4/5 h-10 py-3 px-3">
        <h2 className="hover:text-blue-dark text-xl font-medium">{user.name}</h2>
        <p className="hover:text-blue-dark">{user.email}</p>
      </div>

      <button onClick={() => onClick(user)} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium">Add Friend</button>
    </div>
  ))


  return (
    <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
      <h3 className="font-normal px-2 py-3 leading-tight">Contacts</h3>

      {/*
      // add ability to search users
      <input type="text" placeholder="Search teams or members"
        className="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none" /> */}

      <div className="w-full">

        {userDetails}

      </div>
    </div>
  )
}

export default FriendCard
