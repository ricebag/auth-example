import React from "react";

import { Copyright, LoginForm, } from '../components'

const LoginPage: React.FC = () => (
  <div className="bg-slate-100">
    <LoginForm />

    <Copyright />
  </div>
);

export default LoginPage;
