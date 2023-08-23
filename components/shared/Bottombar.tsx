"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useAuth } from "@clerk/nextjs"


export default function Bottombar() {
    const { userId } = useAuth();


    const pathname = usePathname() // this will display the current active link
    return (
        <section className="bottombar ">
            <div className="bottombar_container ">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route

                    if (link.route === '/profile') link.route = `${link.route}/${userId}`

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link group relative flex flex-col ${isActive && 'bg-primary-500'}`}
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

                                <span className="absolute bottom-12 scale-0 rounded bg-primary-500 p-1 text-[11px] transition-all ease-in-out duration-300 text-white group-hover:scale-100 max-sm:flex hidden">
                                    <p>{link.label.split(/\s+/)[0]}</p>
                                </span>

                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
