import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/system'

import AppContainer from 'layout/app-container/app-container'

import theme from '../../theme'
import '../globals.scss'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AppContainer>{children}</AppContainer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
