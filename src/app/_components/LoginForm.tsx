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

  const [showPassword, setshowPassword] = useState(false)
  
  const handleEmailId = (e: any) => {
    props.setEmailId(e.target.value)
  }

  const handlePassword = (e: any) => {
    props.setPassword(e.target.value);
  };

  const handleSignUp = () => {
    props.setShowLoginForm(false);
    props.setShowVerificationForm(false);
  };


  const handleLogin = async (e:any) => {
    e.preventDefault();
    let data = await loginUser({emailId: props.emailId, password: props.password})
    console.log(data)
    if(data){
      // redirect to product page
      props.setShowProductCategories(true)
    }else{
      // show error toast of wrong credentials
    }
  };

  return (
    <form onSubmit={(e)=>handleLogin(e)}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex min-h-[70vh] min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1]">
          <h1>Login</h1>
          <h2>Welcome back to ECOMMERCE</h2>
          <h4>The next gen business marketplace</h4>

          <div className="w-4/5">
            <Input
              type="email"
              value={props.emailId}
              onChangeHandler={handleEmailId}
              label={"Email"}
              placeholder={"Enter your email id"}
            />
          </div>
          <div className="relative w-4/5">
            {/* handle show btn for password */}
            <Input
              type={showPassword ? "text" : "password"}
              value={props.password}
              onChangeHandler={handlePassword}
              label={"Password"}
              placeholder={"Enter your name"}
              // style = "relative"
            />
            <button className="absolute right-[20px] top-1/2 -translate-y-1/2">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="h-[3rem] w-4/5">
            <Button
              text={"LOGIN"}
              // onClickHandler={handleLogin}
            ></Button>
          </div>
          <div>
            Have an Account? <span onClick={handleSignUp}>SIGN UP</span>
          </div>
        </div>
      </div>
    </form>
  );
};
