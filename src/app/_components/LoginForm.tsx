"use client";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { loginUser } from "../action";

export const LoginForm = (props: {
  setShowLoginForm: (input: any) => void;
  setShowVerificationForm: (input: any) => void;
  setEmailId: (input: any) => void;
  setPassword: (input: any) => void;
  setShowProductCategories: (input: any) => void;
  password: string;
  emailId: string;
}) => {
  const [showPassword, setshowPassword] = useState(false);

  const handleEmailId = (e: any) => {
    props.setEmailId(e.target.value);
  };

  const handlePassword = (e: any) => {
    props.setPassword(e.target.value);
  };

  const handleSignUp = () => {
    props.setShowLoginForm(false);
    props.setShowVerificationForm(false);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    let data = await loginUser({
      emailId: props.emailId,
      password: props.password,
    });
    console.log(data);
    if (data) {
      localStorage.setItem("userAuth", JSON.stringify(data));
      // redirect to product page
      props.setShowProductCategories(true);
    } else {
      // show error toast of wrong credentials
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="flex min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1] px-[60px] py-10">
          <div className="text-center">
            <h1 className="text-[32px] font-semibold pb-[36px]">Login</h1>

            <h2 className="text-2xl font-medium">Welcome back to ECOMMERCE</h2>
            <h4 className="text-base font-normal">
              The next gen business marketplace
            </h4>
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
          <div className="relative w-full">
            {/* handle show btn for password */}
            <Input
              type={showPassword ? "text" : "password"}
              value={props.password}
              onChangeHandler={handlePassword}
              label={"Password"}
              placeholder={"Enter your name"}
              // style = "relative"
            />
            <button className="absolute right-[20px] top-[46px] -translate-y-1/2 underline">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="h-[3rem] w-full">
            <Button
              text={"LOGIN"}
              // onClickHandler={handleLogin}
            ></Button>
          </div>
          <div>
            <span className="text-base font-normal">Have an Account?</span>{" "}
            <span className="text-base font-medium" onClick={handleSignUp}>
              SIGN UP
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
