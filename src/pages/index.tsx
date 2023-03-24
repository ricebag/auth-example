import { type NextPage } from "next";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

// import { default as Layout } from '../components/Layout';
import { api } from "../utils/api";
import { PendingFriendRequests, Friends, Contacts } from "../components";
import { Friendship, User } from "@prisma/client";

const Home: NextPage = () => {
  // const router = useRouter();
  const { status, data: session } = useSession();

  // if (!session) {
  //   router.push('/login')
  // }

  if (status === "loading") {
    // TODO: create a loading component
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>
      <div className="w-full">
        <Users userId={session?.user.id} />
      </div>
    </main>
  );
};

export default Home;

const Users = ({ userId }: { userId: string | undefined }) => {
  console.log({ userId })
  if (!userId) return <></>

  const { data: users, isLoading: loadingUsers } = api.users.getAll.useQuery();
  const { data: friendships, isLoading: loadingFriends } = api.users.getFriends.useQuery();
  const createFriendRequest = api.users.addFriend.useMutation()
  const accFriendRequest = api.users.acceptFriendRequest.useMutation()
  const decFriendRequest = api.users.declineFriendRequest.useMutation()

  const addFriend = (userDetails: User) => createFriendRequest.mutate({
    userId: userDetails.id,
    name: userDetails.name as string,
    email: userDetails.email as string,
    profilePicture: userDetails.image as string,
  })

  const acceptFriendRequest = (id: string) => accFriendRequest.mutate({ id })
  const declineFriendRequest = (id: string) => decFriendRequest.mutate({ id })

  if (loadingFriends) return <div>Fetching Friends...</div>;
  if (loadingUsers) return <div>Fetching Users...</div>;
  if (!friendships?.length) return <></>

  const usersNotFriends = users?.filter((user: User) => {
    if (user.id === userId) return false

    return !friendships.filter(
      (friendship: Friendship) =>
        friendship.requestSentById === user.id ||
        friendship.requestSentToId === user.id
    ).length
  })

  return (
    <div className="flex flex-col gap-2 mt-5">
      <Friends
        userId={userId}
        friendships={friendships}
        removeFriend={declineFriendRequest}
      />

      <PendingFriendRequests
        userId={userId}
        friendships={friendships}
        acceptFriendRequest={acceptFriendRequest}
        declineFriendRequest={declineFriendRequest}
      />

      <Contacts
        userId={userId}
        users={usersNotFriends}
        addFriend={addFriend}
      />
    </div>
  );
};
