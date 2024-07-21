'use client'
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { getVerificationCodeAndVerify } from "../action";
import { Toaster, toast } from 'sonner'

export const VerificationForm = (props: {emailId: string, handleReset: (input: any) => void, setShowProductCategories: (input: any) => void, handleSignUp: () => void}) => {
  
  const [verificationCode, setVerificationCode] = useState(0) 

  const verifyCode = async (e:any) => {
    e.preventDefault();
    console.log("verifyCode")
    console.log(typeof verificationCode)
    let code = Number(verificationCode)
    console.log(typeof code, code)
    // get verification code using email id and match
    let isValid =  await getVerificationCodeAndVerify({emailId: props.emailId, verificationCode: code})
    console.log(isValid)
    if(isValid){
        // sign up user
        await props.handleSignUp()
        // redirect to category page
        props.setShowProductCategories(true)
    }else{
        // redirect to sign form and throw an error toast
        alert("Wrong verification code")
        toast.error('Please enter correct verification code')

    }
  }

  const handleVerificationCode = (e: any) => {
    setVerificationCode(e.target.value)
  }


  return (
    <form onSubmit={(e)=> verifyCode(e)}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex min-h-[70vh] min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1]">
          <h1>Verify your email</h1>          
          <h4>Enter the 8 digit code you have received on 
          swa***@gmail.com</h4>

          <div className="w-4/5">
            <Input
              type="number"
              value={verificationCode}
              onChangeHandler={handleVerificationCode}
              label={"Code"}
              placeholder={""}
            />
          </div>
          
          
          <div className="h-[3rem] w-4/5">
            <Button
              text={"Verify"}
            //   onClickHandler={verifyCode}
            ></Button>
          </div>
          <div>
            {/* Have an Account? <span>SIGN UP</span> */}
          </div>
        </div>
      </div>
    </form>
  );
};
