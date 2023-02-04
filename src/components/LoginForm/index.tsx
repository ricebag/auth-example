import React, { useState } from "react";
import Router from "next/router";

import { loginFields } from "../../constants/FormFields"
import { LoginFormHeader, Input, FormAction, FormExtra } from "..";

const fields = loginFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

const LoginPage = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  }

  //Handle Login API Integration here
  const authenticateUser = () => {
    console.log('log user in')
    Router.push('/')
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
    </div>
  );
};

export default LoginPage;
