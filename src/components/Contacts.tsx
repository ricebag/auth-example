import type { Friendship, User } from "@prisma/client";
import Image from "next/image"

type Props = {
  users: User[];
  sentFriendRequests?: Friendship[];
  recievedFriendRequests?: Friendship[];
  onClick: (user: User) => void;
}

const Contacts = ({ users, sentFriendRequests, recievedFriendRequests, onClick }: Props) => {
  const userDetails = users.map((user: User, key: number) => {
    const existingRequest = sentFriendRequests?.filter(({ requestSentToId }: Friendship) => requestSentToId === user.id) || []
    const awaitingResponse = recievedFriendRequests?.filter(({ requestSentById }: Friendship) => requestSentById === user.id) || []

    // console.log({ user, existingRequest, awaitingResponse })
    
    // const Button = existingRequest.length && awaitingResponse.length
    //   ? (api.users.acceptFriendRequest({ id: existingRequest[0]?.id }))
    //   : existingRequest.length


    const newButtons = awaitingResponse.length
      ? <>
        <button disabled className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium">Accept</button>
        <button disabled className="py-2 px-4 text-lg bg-slate-300 text-white rounded-3xl font-medium">Decline</button>
      </>
      : <button onClick={() => onClick(user)} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium">Add Friend</button>

    // if both awaiting & existing friend request update tables to be in friend request
    // existing friendship show remove option
    // existing friend request sent show pending
    // await friend request response show accept/decline
    // if none of the above show add friend button

    const Button = existingRequest.length
      ? <button disabled className="py-2 px-4 text-lg bg-slate-300 text-white rounded-3xl font-medium">Pending...</button>
      : <button onClick={() => onClick(user)} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium">Add Friend</button>

    return (
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

        {newButtons}
        {Button}
        {/* <button onClick={() => onClick(user)} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium">Add Friend</button> */}
      </div>
    )
  })

  return (
    <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
      <h3 className="font-normal px-2 py-3 leading-tight">Contacts</h3>

      {/* add ability to search users
    <input type="text" placeholder="Search teams or members"
    className="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none" /> */}

      < div className="w-full" >

        {userDetails}

      </div >
    </div>
  )
}

export default Contacts
