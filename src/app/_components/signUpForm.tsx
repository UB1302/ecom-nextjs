"use client";
import { Input } from "./input";
import { Button } from "./button";
// import { api } from "~/trpc/server";
// import { handleCreateAccount } from "~/server/queries";
import { createUserAccount, createVerificationCode } from "../action";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Loader } from "./loader";

export const SignUpForm = (props: {
  setEmailId: (input: any) => void;
  setShowLoginForm: (input: any) => void;
  setShowVerificationForm: (input: any) => void;
  setUserName: (input: any) => void;
  setPassword: (input: any) => void;
  userName: string;
  password: string;
  emailId: string;
}) => {
  // const [userName, setUserName] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserName = (e: any) => {
    props.setUserName(e.target.value);
  };

  const handleEmailId = (e: any) => {
    // props.setEmailId(e.target.value);
    props.setEmailId(e.target.value);
  };
  const handlePassword = (e: any) => {
    props.setPassword(e.target.value);
  };

  const generateVerificationCode = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (props.password.length < 8) {
      toast.error("Password length should be grater than equal to 8");
      return;
    }
    console.log("generateVerificationCode");
    console.log("generateVerificationCode");
    await createVerificationCode({ emailId: props.emailId });

    props.setShowVerificationForm(true);
    setIsLoading(false);
  };

  const handleLoginClick = () => {
    props.setShowLoginForm(true);
    props.setEmailId("");
    props.setPassword("");
  };

  return (
    <form onSubmit={(e) => generateVerificationCode(e)}>
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="flex min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1] px-[60px] py-10">
          <h1 className="text-[32px] font-semibold">Create your account</h1>
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
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                text={"CREATE ACCOUNT"}
                // onClickHandler={generateVerificationCode}
              ></Button>
            )}
          </div>
          <div>
            <span className="text-base font-normal">Have an Account?</span>{" "}
            <span className="text-base font-medium" onClick={handleLoginClick}>
              LOGIN
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
