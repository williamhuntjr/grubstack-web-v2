import type { Metadata } from 'next'
import { Open_Sans, Bebas_Neue } from 'next/font/google'

import { cls } from 'common/utils/utils'

import AppContainer from 'layout/app-container/app-container'

import '../globals.scss'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

const open_sans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"]
})

const bebas_neue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: "400"
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cls(open_sans.variable, bebas_neue.variable)}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  )
}
