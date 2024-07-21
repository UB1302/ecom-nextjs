"use client";
import { Input } from "./input";
import { Button } from "./button";
// import { api } from "~/trpc/server";
// import { handleCreateAccount } from "~/server/queries";
import { createUserAccount, createVerificationCode } from "../action";
import { useState } from "react";
import { Toaster, toast } from 'sonner'

export const SignUpForm = (props: {setEmailId: (input: any)=> void, setShowLoginForm: (input: any)=> void, setShowVerificationForm:(input: any)=> void,  setUserName: (input: any)=> void, setPassword: (input: any)=> void, userName: string, password: string, emailId: string}) => {
  // const [userName, setUserName] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");

  const handleUserName = (e: any) => {
    props.setUserName(e.target.value);
  };

  const handleEmailId = (e: any) => {
    // props.setEmailId(e.target.value);
    props.setEmailId(e.target.value)
  };
  const handlePassword = (e: any) => {
    props.setPassword(e.target.value);
  };

  const handleAccountCreation = async () => {
    // sent a otp and store it in db
    // on verification call check if the same otp is present against the email id
    // if yes create account
    // createVerificationCode({emailId})
    
    // createUserAccount({
    //   name: userName,
    //   emailId: emailId,
    //   password: password,
    //   authToken: "uygcd768tcdugciyds",
    //   verificationCode: 234567,
    // });
    // console.log("yo");
    
  };


  const generateVerificationCode = async (e: any) => {
    e.preventDefault();
    if(props.password.length < 8){
      toast.error('My first toast')
      return
    }
    console.log("generateVerificationCode")
    console.log("generateVerificationCode")
    await createVerificationCode({emailId: props.emailId})
    
    props.setShowVerificationForm(true)
  }




  return (
    <form onSubmit={(e) =>generateVerificationCode(e)}>
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="flex min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1] py-10 px-[60px]">
          <h1 className="font-semibold text-[32px]">Create your account</h1>
          <div className="w-full">
            <Input
              type="text"
              value={props.userName}
              onChangeHandler={handleUserName}
              label={"Name"}
              placeholder={"Enter your name"}
            />
          </div>
          <div className="w-full">
            <Input
              type="email"
              value={props.emailId}
              onChangeHandler={handleEmailId}
              label={"Email"}
              placeholder={"Enter your email id"}
            />
          </div>
          <div className="w-full">
            <Input
              type="password"
              value={props.password}
              onChangeHandler={handlePassword}
              label={"Password"}
              placeholder={"Enter your name"}
            />
          </div>
          <div className="w-full">
            <Button
              text={"CREATE ACCOUNT"}
              // onClickHandler={generateVerificationCode}
            ></Button>
          </div>
          <div>
            <span className="font-normal text-base">Have an Account?</span> <span className="text-base font-medium" onClick={()=> props.setShowLoginForm(true)}>LOGIN</span>
          </div>
        </div>
      </div>
    </form>
  );
};
