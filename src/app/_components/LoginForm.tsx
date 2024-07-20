import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleUserName = () => {};

  const handleCreateAccount = () => {};
  return (
    <form>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex min-h-[70vh] min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1]">
          <h1>Login</h1>
          <h2>Welcome back to ECOMMERCE</h2>
          <h4>The next gen business marketplace</h4>

          <div className="w-4/5">
            <Input
              type="email"
              value="dcsd"
              onChangeHandler={handleUserName}
              label={"Email"}
              placeholder={"Enter your email id"}
            />
          </div>
          <div className="w-4/5 relative">
            {/* handle show btn for password */}
            <Input
              type={showPassword ? "text" : "password"}
              value="dcsd"
              onChangeHandler={handleUserName}
              label={"Password"}
              placeholder={"Enter your name"}
              // style = "relative"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-[20px]">{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          
          <div className="h-[3rem] w-4/5">
            <Button
              text={"LOGIN"}
              onClickHandler={handleCreateAccount}
            ></Button>
          </div>
          <div>
            Have an Account? <span>SIGN UP</span>
          </div>
        </div>
      </div>
    </form>
  );
};
