"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
// import { Header } from "./_components/header";
import { Input } from "./_components/input";
import { Button } from "./_components/button";
import { LoginForm } from "./_components/signUpForm";
import { SignUpForm } from "./_components/LoginForm";

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const data = await api.post.getProductCategories()
  // console.log(data)

  // void api.post.getLatest.prefetch();

  const handleUserName = () => {};

  const handleCreateAccount = () => {};

  return (
    // <HydrateClient>

    // {/* </HydrateClient> */}
    <>
      <LoginForm />
      <SignUpForm />
    </>
  );
}
