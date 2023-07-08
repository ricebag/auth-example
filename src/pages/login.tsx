import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { LoginForm, } from '../components'

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      void router.push('/')
    }
  });

  return (
    <div className="bg-slate-100 pt-14">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
