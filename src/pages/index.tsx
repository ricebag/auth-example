import { type NextPage } from "next";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

// import { default as Layout } from '../components/Layout';
import { api } from "../utils/api";
import { Contacts } from "../components";
import { PendingFriendRequests } from "../components/Contacts";

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
  if (!userId) return <></>

  const { data: userData, isLoading: loadingUserData } = api.users.getFriends.useQuery();
  const accFriendRequest = api.users.acceptFriendRequest.useMutation()
  const decFriendRequest = api.users.declineFriendRequest.useMutation()

  const acceptFriendRequest = (id: string) => accFriendRequest.mutate({ id })
  const declineFriendRequest = (id: string) => decFriendRequest.mutate({ id })

  if (loadingUserData) return <div>Fetching Users Data...</div>;
  if (!userData?.length) return <></>

  return (
    <div className="flex flex-col gap-2 mt-5">
      <Contacts
        userId={userId}
        friendships={userData}
        removeFriend={declineFriendRequest}
      />

      <PendingFriendRequests
        userId={userId}
        friendships={userData}
        acceptFriendRequest={acceptFriendRequest}
        declineFriendRequest={declineFriendRequest}
      />
    </div>
  );
};
