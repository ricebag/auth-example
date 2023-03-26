import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const DiscordLogin = () => (
  <button
    onClick={() => void signIn('discord', { callbackUrl: '/' })}
    className="inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 hover:cursor-pointer"
  >
    <span className="sr-only">Sign in with Discord</span>
    <Image
      className="h-5 w-5 rounded-full"
      alt=""
      width='50'
      height='50'
      src={'/discord_logo.svg'}
    />
  </button>
)

export default DiscordLogin
