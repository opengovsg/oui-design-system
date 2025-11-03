import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import "./shiki.css"

import { cookies } from "next/headers"
import { docsConfig } from "@/config/docs.config"

import { I18nProvider } from "./providers/i18n"

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
    template: docsConfig.titleTemplate,
    default: docsConfig.title,
  },
  description: docsConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
