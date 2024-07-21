"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
// import { Header } from "./_components/header";
import { Input } from "./_components/input";
import { Button } from "./_components/button";
import { SignUpForm } from "./_components/signUpForm";
import { LoginForm } from "./_components/LoginForm";
import { VerificationForm } from "./_components/verificationForm";
import { useEffect, useState } from "react";
import { ProductCategory } from "./_components/productCategory";
import { createUserAccount } from "./action";

export default function Home() {
  
  useEffect(()=>{
    let userAuth = localStorage.getItem("userAuth")
    console.log(userAuth)
  },[])

  // void api.post.getLatest.prefetch();
  const [emailId, setEmailId] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showProductCategories, setShowProductCategories] = useState(true);
  const [userName, setUserName] = useState("");
  // const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await createUserAccount({name: userName, emailId: emailId, password: password})
  }

  const handleReset = () => {
    setShowLoginForm(false);
    setShowVerificationForm(false);
    setEmailId("");
  };

  if (showProductCategories) {
    return <ProductCategory />;
  } else {
    return (
      // <HydrateClient>

      // {/* </HydrateClient> */}
      <>
        {showVerificationForm ? (
          <VerificationForm
            emailId={emailId}
            handleReset={handleReset}
            setShowProductCategories={setShowProductCategories}
            handleSignUp = {handleSignUp}
          />
        ) : showLoginForm ? (
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            setShowVerificationForm={setShowVerificationForm}
            setEmailId={setEmailId}
            setPassword={setPassword}
            password={password}
            emailId={emailId}
            setShowProductCategories = {setShowProductCategories}
          />
        ) : (
          <SignUpForm
            setEmailId={setEmailId}
            setShowLoginForm={setShowLoginForm}
            setShowVerificationForm={setShowVerificationForm}
            setUserName={setUserName}
            setPassword={setPassword}
            userName={userName}
            password={password}
            emailId={emailId}
          />
        )}
      </>
    );
  }
}
