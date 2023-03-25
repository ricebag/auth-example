import type { Friendship, User, } from "@prisma/client";
import Image from "next/image"
import { useState } from "react";
import type { FormEvent } from 'react';

import { api } from "../utils/api";
import { Input } from "./LoginForm";

type RefetchData = () => void

type FriendsProps = {
  userId: string;
  friendships?: Friendship[];
  refetchData: RefetchData;
}

type PendingProps = {
  userId: string;
  friendships?: Friendship[];
  refetchData: RefetchData;
}

type ContactProps = {
  users?: User[];
  refetchData: RefetchData;
}

const PendingFriendRequests = ({ userId, friendships, refetchData }: PendingProps) => {
  const { mutateAsync: decFriendReq, isLoading: isLoadingAcc } = api.users.declineFriendRequest.useMutation()
  const { mutateAsync: accFriendReq, isLoading: isLoadingDec } = api.users.acceptFriendRequest.useMutation()
  const isLoading = isLoadingAcc || isLoadingDec

  const acceptFriendRequest = async (id: string) => {
    await accFriendReq({ id })
    refetchData()
  }

  const declineFriendRequest = async (id: string) => {
    await decFriendReq({ id })
    refetchData()
  }

  const friends = friendships?.map((friendship: Friendship, key: number) => {
    if (friendship.status === 'REJECTED' || friendship.status === 'ACCEPTED') return null

    const sentByUser = friendship.requestSentById === userId
    const profilePicture = sentByUser ? friendship.user2ProfilePicture : friendship.user1ProfilePicture
    const name = sentByUser ? friendship.user2 : friendship.user1
    const email = sentByUser ? friendship.user2Email : friendship.user1Email

    return (
      <div key={key} className="flex p-5 border-2 cursor-pointer my-1 hover:bg-blue-lightest rounded min-w-full">
        <Image
          className="rounded-full"
          alt=""
          width='80'
          height='80'
          src={profilePicture ? profilePicture : 'https://cdn.discordapp.com/embed/avatars/0.png'}
        />
        <div className="w-4/5 h-10 py-3 px-3">
          <h2 className="hover:text-blue-dark text-xl font-medium">{name}</h2>
          <p className="hover:text-blue-dark">{email}</p>
        </div>

        {
          sentByUser
            ? <button disabled className="py-2 px-4 text-lg bg-slate-300 text-white rounded-3xl font-medium">Pending...</button>
            : <>
              <button
                disabled={isLoading}
                onClick={() => void acceptFriendRequest(friendship.id)}
                className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium"
              >Accept</button>
              <button
                disabled={isLoading}
                onClick={() => void declineFriendRequest(friendship.id)}
                className="py-2 px-4 text-lg bg-slate-300 text-white rounded-3xl font-medium"
              >Decline</button>
            </>}
      </div>
    )
  })

  return (
    <>
      <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
        < div className="w-full" >
          Pending Friend Requests
          {friends}
        </div >
      </div>
    </>
  )
}

const Friends = ({ userId, friendships, refetchData }: FriendsProps) => {
  const [userInput, updateUserInput] = useState('')
  const { mutateAsync, isLoading } = api.users.declineFriendRequest.useMutation()

  const removeFriend = async (id: string) => {
    await mutateAsync({ id })
    refetchData()
  }

  const filteredFriendships = friendships?.filter((friendship) =>
    friendship.user1.toLowerCase().includes(userInput.toLowerCase().trim()) ||
    friendship.user2.toLowerCase().includes(userInput.toLowerCase().trim()) ||
    friendship.user1Email.toLowerCase().includes(userInput.toLowerCase().trim()) ||
    friendship.user2Email.toLowerCase().includes(userInput.toLowerCase().trim()))
  const friends = filteredFriendships?.map((friendship: Friendship, key: number) => {
    if (friendship.status === 'REJECTED' || friendship.status === 'PENDING') return null

    const sentByUser = friendship.requestSentById === userId
    const profilePicture = sentByUser ? friendship.user2ProfilePicture : friendship.user1ProfilePicture
    const name = sentByUser ? friendship.user2 : friendship.user1
    const email = sentByUser ? friendship.user2Email : friendship.user1Email

    return (
      <div key={key} className="flex p-5 border-2 cursor-pointer my-1 hover:bg-blue-lightest rounded min-w-full">
        <Image
          className="rounded-full"
          alt=""
          width='80'
          height='80'
          src={profilePicture ? profilePicture : 'https://cdn.discordapp.com/embed/avatars/0.png'}
        />
        <div className="w-4/5 h-10 py-3 px-3">
          <h2 className="hover:text-blue-dark text-xl font-medium">{name}</h2>
          <p className="hover:text-blue-dark">{email}</p>
        </div>

        <button
          disabled={isLoading}
          onClick={() => void removeFriend(friendship.id)}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >Remove</button>
      </div>
    )
  })

  return (
    <>
      <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
        <Input
          labelFor={userInput}
          id={userInput}
          name={userInput}
          value={userInput}
          labelText='Name'
          placeholder="Search friends"
          handleChange={(e: FormEvent<HTMLInputElement>): void => updateUserInput(e.currentTarget.value)}
          type='text'
          isRequired={true}
        />


        < div className="w-full" >
          {friends}
        </div >
      </div>
    </>
  )
}

const Contacts = ({ users, refetchData }: ContactProps) => {
  const [userInput, updateUserInput] = useState('')
  const { mutateAsync, isLoading } = api.users.addFriend.useMutation()

  const addFriend = async (userDetails: User) => {
    await mutateAsync({
      userId: userDetails.id,
      name: userDetails.name as string,
      email: userDetails.email as string,
      profilePicture: userDetails.image as string,
    })
    refetchData()
  }

  const filteredUsers = users?.filter((user: User) =>
    user?.name?.toLowerCase().includes(userInput.toLowerCase().trim()) ||
    user?.email?.toLowerCase().includes(userInput.toLowerCase().trim()))

  const friends = filteredUsers?.map((user: User, key: number) => {
    return (
      <div key={key} className="flex p-5 border-2 cursor-pointer my-1 hover:bg-blue-lightest rounded min-w-full">
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

        <button
          disabled={isLoading}
          onClick={() => void addFriend(user)}
          className="py-2 px-4 text-lg bg-teal-500 text-white rounded-3xl font-medium"
        >Add Friend</button>
      </div>
    )
  })

  return (
    <>
      <div className="shadow-lg rounded-lg w-4/5 max-w-screen-xl mx-auto p-6">
        <Input
          labelFor={userInput}
          id={userInput}
          name={userInput}
          value={userInput}
          labelText='Name'
          placeholder="Search Contacts"
          handleChange={(e: FormEvent<HTMLInputElement>): void => updateUserInput(e.currentTarget.value)}
          type='text'
          isRequired={true}
        />


        < div className="w-full" >
          {friends}
        </div >
      </div>
    </>
  )
}

export { PendingFriendRequests, Contacts, Friends }
