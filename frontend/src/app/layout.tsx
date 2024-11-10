import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import Footer from './components/Footer'
import Header from './components/Header'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { ProductProvider } from '@/contexts/ProductContext'
import NextAuthProvider from '@/providers/NextAuth'
import theme from '@/styles/theme'
import '@/styles/destyle.css'

export const metadata: Metadata = {
  title: 'Hobby Link',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ProductProvider>
                <NotificationProvider>
                  <Header />
                  {children}
                  <Footer />
                </NotificationProvider>
              </ProductProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
