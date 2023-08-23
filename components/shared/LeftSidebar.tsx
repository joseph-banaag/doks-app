"use client"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, useAuth } from "@clerk/nextjs"



export default function LeftSidebar() {
  const pathname = usePathname() // this will display the current active link
  const router = useRouter() // this will redirect the page to the specified page(/sign-in) which will be called by callback function once a signed-out action is successful. 
  const { userId } = useAuth();


  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col flex-1 w-full gap-6 px-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route

          if (link.route === '/profile') link.route = `${link.route}/${userId}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link group relative flex  justify-center  ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={28}
                height={28}
              />
              <p className="text-light-1 max-lg:hidden">
                {link.label}
              </p>

              <span className="absolute -bottom-8 scale-0 rounded bg-primary-500 p-1 text-[11px] transition-all ease-in-out duration-300 text-white group-hover:scale-100 max-lg:flex hidden">
                <p>{link.label.split(/\s+/)[0]}</p>

              </span>
            </Link>
          )
        })}
      </div>
      <div className="mt-10 px-6">
        <SignOutButton signOutCallback={() => router.push('/sign-in')}>
          <div className="flex cursor-pointer gap-4 p-2">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
            <p className="text-light-2 max-lg:hidden p-2 text-center">Logout</p>
          </div>
        </SignOutButton>
      </div>
    </section>
  )
}
