import React from "react";
import { signIn } from "next-auth/react";

const GoogleLogin = () => (
  <div className="flex flex-col items-center gap-2 max-w-md">
    <button
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
      onClick={() => { void signIn('google', { callbackUrl: '/' }) }}
    >
      Sign in with Google
    </button>
  </div >
)

export default GoogleLogin
