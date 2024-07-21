"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  // const [userAuth, setUserAuth] = useState(null)
  const [userAuth, setUserAuth] = useState({
    userId: "",
    name: "",
  })

  useEffect(() => {
    let userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      userAuth = JSON.parse(userAuth);
      // let parsedUserAuth: { userId?: string } | null = JSON.parse(userAuth);
      setUserAuth(userAuth);
    }
  }, []);

  return (
    <nav>
      <div className="flex justify-end px-[40px] py-3 text-xs font-normal">
        <div className="px-[20px]">Help</div>
        <div className="px-[20px]">Orders & Returns</div>
        <div className="px-[20px]">
          {/* {userAuth
            ? (userAuth as { name?: string }).name || "username"
            : "username"} */}
            {userAuth
            ? userAuth.name
            : "username"}
        </div>
      </div>
      <div className="flex justify-between px-[40px] pb-[22px]">
        <h1 className="text-2xl font-bold">ECOMMERCE</h1>
        <div className="flex text-base font-semibold">
          <div className="pe-8">Categories</div>
          <div className="pe-8">Sale</div>
          <div className="pe-8">Clearance</div>
          <div className="pe-8">New stock</div>
          <div className="pe-8">Trending</div>
        </div>
        <div className="flex">
          <div className="pe-8">
            <Image src="/Search.svg" width={32} height={32} alt="search" />
          </div>
          <div>
            <Image src="/Cart.svg" width={32} height={32} alt="cart" />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-[#F4F4F4] py-2.5">
        <div className="flex">
          <Image
            src="/left-arrow.svg"
            width={16}
            height={16}
            alt="left arrow"
          />
          <div className="px-6">Get 10% off on business sign up</div>
          <Image
            src="/right-arrow.svg"
            width={16}
            height={16}
            alt="right arrow"
          />
        </div>
      </div>
    </nav>
  );
}
