import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import LiveBackground from "@/components/live-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sam McAnelly - Full Stack Developer",
  description: "Full stack developer portfolio showcasing projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", inter.className)}>
        <LiveBackground />
        {children}
      </body>
    </html>
  )
}

