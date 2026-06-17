import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { RootProvider } from "fumadocs-ui/provider/next"

import "./globals.css"

import { siteConfig } from "@/config/site"

import { I18nProvider } from "./providers/i18n"
import { RouterProvider } from "./providers/router"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: siteConfig.titleTemplate,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        {/*
          RootProvider supplies Fumadocs' theme + search context. The OUI
          react-aria providers (router navigation + i18n) are nested inside so
          live component demos rendered in MDX behave correctly.
        */}
        <RootProvider>
          <RouterProvider>
            <I18nProvider>{children}</I18nProvider>
          </RouterProvider>
        </RootProvider>
      </body>
    </html>
  )
}
