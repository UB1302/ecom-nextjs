import { Input } from "./input";
import { Button } from "./button";

export const LoginForm = () => {
  const handleUserName = () => {};

  const handleCreateAccount = () => {};
  return (
    <form>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex min-h-[70vh] min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1]">
          <h1>Create your account</h1>
          <div className="w-4/5">
            <Input
              type="text"
              value="dcsd"
              onChangeHandler={handleUserName}
              label={"Name"}
              placeholder={"Enter your name"}
            />
          </div>
          <div className="w-4/5">
            <Input
              type="email"
              value="dcsd"
              onChangeHandler={handleUserName}
              label={"Email"}
              placeholder={"Enter your email id"}
            />
          </div>
          <div className="w-4/5">
            <Input
              type="password"
              value="dcsd"
              onChangeHandler={handleUserName}
              label={"Password"}
              placeholder={"Enter your name"}
            />
          </div>
          <div className="h-[3rem] w-4/5">
            <Button
              text={"CREATE ACCOUNT"}
              onClickHandler={handleCreateAccount}
            ></Button>
          </div>
          <div>
            Have an Account? <span>LOGIN</span>
          </div>
        </div>
      </div>
    </form>
  );
};
