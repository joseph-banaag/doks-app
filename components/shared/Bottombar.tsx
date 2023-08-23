"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export default function Bottombar() {

    const pathname = usePathname() // this will display the current active link
    return (
        <section className="bottombar ">
            <div className="bottombar_container ">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="text-subtle-medium text-light-1 block text-center max-sm:hidden">
                                {link.label.split(/\s+/)[0]}
                                {/* split() method with regex will display the first word only */}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
