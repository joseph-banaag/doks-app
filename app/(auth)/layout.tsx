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
    description: 'This is a clone of threads application',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={`${ubuntu.className} bg-dark-1`}>

                    {children}

                </body>
            </ClerkProvider>
        </html>

    )
}
