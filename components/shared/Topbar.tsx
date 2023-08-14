import { SignOutButton, OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Topbar() {

  // topbar logo
  const logo = {
    src: "/assets/logo.png",
    name: "logo",
    src2: "/assets/logout.svg",
    name2: "logout",
  }

  return (
    <nav className='topbar'>
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={logo.src}
          alt={logo.name}
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
                src={logo.src2}
                alt={logo.name2}
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
