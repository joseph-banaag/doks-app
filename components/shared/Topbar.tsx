import { SignOutButton, OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Topbar() {


  return (
    <nav className='topbar'>
      <div className="group relative flex justify-center">
        <Link href="/" className="flex items-center gap-4">

          <Image
            src="/assets/logo.png"
            alt="doks logo"
            width={32}
            height={32}
          />
          <p className='text-heading3-bold text-light-1 max-xs:hidden'> | doks</p>
        </Link>
        <span className="absolute top-10 scale-0 rounded bg-gray-800 p-1 text-[11px] transition-all ease-in-out duration-300 text-white group-hover:scale-100 flex justify-center">
          Home
        </span>
      </div>


      {/* clerk components */}
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignOutButton>
            <div className="flex cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout button"
                width={24}
                height={24}
              />
            </div>
          </SignOutButton>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              avatarBox: "rounded-full",
              userPreviewTextContainer: "hidden md:block ",
              organizationSwitcherTriggerIcon: "hidden md:block",
              organizationSwitcherTrigger: "pt-2 ml-1"
            }

          }}
        />
      </div>
    </nav>
  )
}
