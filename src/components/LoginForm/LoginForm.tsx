import React, { useState } from "react";
import Router from "next/router";

import { loginFields } from "../../constants/FormFields";
import { DiscordLogin, Input, FormAction, FormExtra, LoginFormHeader } from "..";
import type { Event } from "../../types/event";

const fields = loginFields;
const fieldsState: {
  [key: string]: string | boolean
} = {};
fields.forEach((field) => fieldsState[field.id] = '');

const LoginPage = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: Event) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await authenticateUser();
  }

  // TODO: Handle Login API Integration here
  const authenticateUser = async () => {
    console.log('log user in')
    await Router.push('/')
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <LoginFormHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />

      <form className="space-y-6">
        <div className="-space-y-px">
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />

            )
          }
        </div>

        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />

      </form>

      <DiscordLogin />
    </div>
  );
};

export default LoginPage;
