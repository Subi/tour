import './globals.css'

import type { Metadata } from 'next'
import { Inter,  Press_Start_2P , Montserrat } from 'next/font/google'
import { NextAuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

const pressStart =  Press_Start_2P({ subsets: ["latin"] , weight: "400" , variable: '--font-press-start'})
const montserrat =  Montserrat({subsets: ["latin"] , weight: ["400" , "500" ] , variable: '--font-montserrat'})

export const metadata: Metadata = {
  title: '50 States Tour',
  description: 'A collection of patches from 2023 50 States tour 🌟️',
  themeColor: "white"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pressStart.variable} ${montserrat.variable}`}>
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        </body>
    </html>
  )
}
