import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import Header from './components/Header'
import NavigationMenu from './components/NavigationMenu'
import ResponsiveBox from './components/ResponsiveBox'
import { FormProvider } from '@/contexts/FormContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import NextAuthProvider from '@/providers/NextAuth'
import theme from '@/styles/theme'
import '@/styles/destyle.css'

export const metadata: Metadata = {
  title: 'HOBBYLINK',
  description:
    '趣味を見つけ、必要な情報を収集し、仲間と共有するためのプラットフォーム。趣味を始めたいけれど何が必要かわからない方や、趣味を深めたい方に最適なサービスです。',
  openGraph: {
    title: 'HOBBYLINK',
    description:
      '趣味を見つけ、必要な情報を収集し、仲間と共有するためのプラットフォーム。趣味を始めたいけれど何が必要かわからない方や、趣味を深めたい方に最適なサービスです。',
    url: 'https://hobbylink.vercel.app/',
    siteName: 'HOBBYLINK',
    images: [
      {
        url: 'https://hobbylink.vercel.app/ogp-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOBBYLINK',
    description:
      '趣味を見つけ、必要な情報を収集し、仲間と共有するためのプラットフォーム。趣味を始めたいけれど何が必要かわからない方や、趣味を深めたい方に最適なサービスです。',
    images: 'https://hobbylink.vercel.app/ogp-image.png',
  },
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
              <FormProvider>
                <NotificationProvider>
                  <NavigationMenu />
                  <ResponsiveBox>
                    <Header />
                    {children}
                  </ResponsiveBox>
                </NotificationProvider>
              </FormProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
