import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
    weight: "400",
    subsets: ['latin'
    ]
})

export const metadata: Metadata = {
    title: 'doks',
    description: 'doks - is a social media application like; facebook, instagram, tiktok, x',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={ubuntu.className}>

                    {children}

                </body>
            </ClerkProvider>
        </html>

    )
}
