import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ['latin'
  ]
})

export const metadata: Metadata = {
  title: 'doks',
  description: 'doks application is a social media application',
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
          <Topbar />

          <main className='flex'>
            <LeftSidebar />


            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>


            <RightSidebar />
          </main>

          <Bottombar />

        </body>
      </ClerkProvider>
    </html>

  )
}
