import React from "react";

import { Copyright, SignUp, } from "../components";

const SignupPage: React.FC = () => {
  return (
    <div className="bg-slate-100 flex flex-col items-center gap-2">
      <SignUp />

      <Copyright />
    </div>
  )
}

export default SignupPage
