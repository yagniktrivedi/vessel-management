import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'