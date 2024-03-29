import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { SignUp, } from "../components";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      void router.push('/')
    }
  });

  return (
    <div className="bg-slate-100 flex flex-col items-center gap-2 pt-14">
      <SignUp />
    </div>
  )
}

export default RegisterPage
