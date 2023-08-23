"use client"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton } from "@clerk/nextjs"



export default function LeftSidebar() {
  const pathname = usePathname() // this will display the current active link
  const router = useRouter() // this will redirect the page to the specified page(/sign-in) which will be called by callback function once a signed-out action is successful. 

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col flex-1 w-full gap-6 px-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
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
