import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Copyright, SignUp, } from "../components";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.log({ status })
    if (status === 'authenticated') {
      void router.push('/')
    }
  });

  return (
    <div className="bg-slate-100 flex flex-col items-center gap-2">
      <SignUp />

      <Copyright />
    </div>
  )
}

export default RegisterPage
