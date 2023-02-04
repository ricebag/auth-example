import React from "react";

import { Copyright, LoginForm, } from '../components'

const LoginPage: React.FC = () => (
  <div className="bg-slate-100">
    <LoginForm />

    <Copyright className="mt-20" />
  </div>
);

export default LoginPage;
