import { useEffect } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { Friendship, User } from "@prisma/client";

import { api } from "../utils/api";
import { PendingFriendRequests, Friends, Contacts } from "../components";

const FriendsList: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (!session && status !== 'loading') {
      void router.push('/login')
    }
  });

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

export default FriendsList;

const Users = ({ userId }: { userId: string | undefined }) => {
  if (!userId) return <></>

  const { data: users, isLoading: loadingUsers, refetch: refetchUsers } = api.users.getAll.useQuery();
  const { data: friendships, isLoading: loadingFriends, refetch: refetchFriends } = api.users.getFriends.useQuery();

  const refetchData = () => {
    void refetchFriends()
    void refetchUsers()
  }

  if (loadingFriends) return <div>Fetching Friends...</div>;
  if (loadingUsers) return <div>Fetching Users...</div>;

  const usersNotFriends = users?.filter((user: User) => {
    if (user.id === userId) return false

    return !friendships?.filter(
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
        refetchData={refetchData}
      />

      <PendingFriendRequests
        userId={userId}
        friendships={friendships}
        refetchData={refetchData}
      />

      <Contacts
        users={usersNotFriends}
        refetchData={refetchData}
      />
    </div>
  );
};
