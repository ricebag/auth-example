import React, { useState } from "react";
import Router from "next/router";

import { signupFields } from "../../constants/FormFields"
import { DiscordLogin, LoginFormHeader, Input, FormAction, } from '..'

const fields = signupFields;
const fieldsState: any = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: any) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  // TODO: handle Signup API Integration here
  const createAccount = async () => {
    console.log('log user in')
    await Router.push('/')
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <LoginFormHeader
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
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

          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>



      </form>

      <DiscordLogin />
    </div>
  )
}