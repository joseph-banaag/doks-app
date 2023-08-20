import { SignOutButton, OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Topbar() {


  return (
    <nav className='topbar'>
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/assets/logo.png"
          alt="doks logo"
          width={32}
          height={32}
        />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'> | doks</p>
      </Link>

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
