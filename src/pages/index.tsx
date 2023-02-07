import { type NextPage } from "next";
import { useSession } from "next-auth/react";

// import { default as Layout } from '../components/Layout';
import type { User } from "@prisma/client";
import { api } from "../utils/api";
import { Contacts } from "../components";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { status } = useSession();

  if (status === "loading") {
    // TODO: create a loading component
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>
      <div className="w-full">
        <Users />
      </div>
    </main>
  );
};

export default Home;

const Users = () => {
  const { data: users, isLoading } = api.users.getAll.useQuery();
  const { data: userData, isLoading: loadingUserData } = api.users.getFriends.useQuery();
  const createFriendRequest = api.users.addFriend.useMutation()

  const addFriend = (userDetails: User) => createFriendRequest.mutate({
    userId: userDetails.id,
    name: userDetails.name as string,
    email: userDetails.email as string,
    profilePicture: userDetails.image as string,
  })

  console.log({ userData, loadingUserData })

  if (loadingUserData) return <div>Fetching Users Data...</div>;
  if (isLoading) return <div>Fetching Users...</div>;

  return (
    <div className="flex flex-col gap-2 mt-5">
      {
        users ? <Contacts users={users} sentFriendRequests={userData?.friendshipRequestsSent} onClick={addFriend} /> : <></>
      }


      <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
        <h3 className="font-normal px-2 py-3 leading-tight">Friend Requests Received</h3>
        {userData?.friendshipRequestsReceived?.map((friend, index) => (
          <div key={index}>
            <p>{friend.user1}</p>
            <p>{friend.user1Email}</p>
            <p>{friend.requestSentById}</p>
            <p>{friend.user1ProfilePicture}</p>
          </div>
        ))}
      </div>

      {/* <h2>friendshipRequestsReceived</h2>
      {userData?.friendshipRequestsReceived?.map((friend, index) => (
        <div key={index}>
          <p>{friend.user1} - {friend.user1Email} - {friend.requestSentById} - {friend.user1ProfilePicture}</p>
        </div>
      ))} */}

      {/* <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
        <h3 className="font-normal px-2 py-3 leading-tight">Current Friend Requests</h3>
        {userData?.friendshipRequestsSent?.map((friend, index) => (
          <div key={index}>
            <p>{friend.user2}</p>
            <p>{friend.user2Email}</p>
            <p>{friend.requestSentToId}</p>
            <p>{friend.user2ProfilePicture}</p>
          </div>
        ))}
      </div> */}


      {/* <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
        {users?.map((userDetails, index) => (
          <div className="bg-blue relative w-full max-w-lg" key={index} onClick={() => createFriendRequest.mutate({
            userId: userDetails.id,
            name: userDetails.name as string,
            email: userDetails.email as string,
            profilePicture: userDetails.image as string,
          })}>
            <p>{userDetails.name} - {userDetails.email} - {userDetails.id}</p>
          </div>
        ))}
      </div> */}

      {/* <h2>Friends</h2>
      {userData?.friends?.map((friend, index) => (
        <div key={index}>
          <p>{friend.id}</p>
        </div>
      ))}

      <h2>friendshipRequestsReceived</h2>
      {userData?.friendshipRequestsReceived?.map((friend, index) => (
        <div key={index}>
          <p>{friend.user1} - {friend.user1Email} - {friend.requestSentById} - {friend.user1ProfilePicture}</p>
        </div>
      ))} */}
    </div>
  );
};
