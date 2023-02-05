import { type NextPage } from "next";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

// import { default as Layout } from '../components/Layout';
import { api } from "../utils/api";
import { FriendCard } from "../components";
import { User } from "@prisma/client";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: session, status } = useSession();

  if (status === "loading") {
    // TODO: create a loading component
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>
      <div>
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
      {users ? <FriendCard users={users} onClick={addFriend} /> : <></>}


      <h2>friendshipRequestsSent</h2>
      {userData?.friendshipRequestsSent?.map((friend, index) => (
        <div key={index}>
          <p>{friend.user2}</p>
          <p>{friend.user2Email}</p>
          <p>{friend.requestSentToId}</p>
          <p>{friend.user2ProfilePicture}</p>
        </div>
      ))}


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

const Form = () => {
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  const postMessage = api.guestbook.postMessage.useMutation();

  if (status !== "authenticated") return null;

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={100}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};
