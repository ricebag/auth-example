import { User } from "@prisma/client";
import Image from "next/image"
import { FC } from "react";

type Props = {
  users: User[]
  onClick: (user: User) => void
}

export default ({ users, onClick }: Props) => {

  // const users = [
  //   { name: 'Kevin Durant', id: 1, email: '1@email.com', image: 'https://cdn.discordapp.com/avatars/540091307075305483/4315396845e598da47beb6943e98b08d.png' },
  //   { name: 'James Harden', id: 2, email: '2@email.com', image: 'https://cdn.discordapp.com/avatars/540091307075305483/4315396845e598da47beb6943e98b08d.png' },
  //   { name: 'Michael Jordan', id: 3, email: '3@email.com', image: 'https://cdn.discordapp.com/avatars/540091307075305483/4315396845e598da47beb6943e98b08d.png' },
  //   { name: 'Lebron James', id: 4, email: '4@email.com', image: 'https://cdn.discordapp.com/avatars/540091307075305483/4315396845e598da47beb6943e98b08d.png' },
  // ]

  console.log({ users })
  if (!users || !users?.length) return <></>

  const userDetails = users.map((user: User, key: number) => (
    <div key={key} className="shadow-lg flex cursor-pointer my-1 hover:bg-blue-lightest rounded min-w-full">
      <Image
        className="rounded-full"
        alt=""
        width='80'
        height='80'
        src="https://cdn.discordapp.com/avatars/540091307075305483/4315396845e598da47beb6943e98b08d.png"
      />
      <div className="w-4/5 h-10 py-3 px-1">
        <p className="hover:text-blue-dark">{user.name}</p>
        <p className="hover:text-blue-dark">{user.email}</p>
      </div>

      <button onClick={() => onClick(user)}>+</button>
    </div>
  ))


  return (
    <div className="shadow-lg rounded-lg w-full max-w-screen-xl mx-auto p-6">
      <div className="flex-grow">
        <h3 className="font-normal px-2 py-3 leading-tight">Contacts</h3>

        <input type="text" placeholder="Search teams or members"
          className="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none" />

        <div className="w-full">

          {userDetails}

        </div>
      </div>
    </div>
  )
}