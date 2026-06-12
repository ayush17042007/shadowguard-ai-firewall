import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Shadow Guard — The Cognitive Firewall',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description:
    'Mathematical certainty for Generative AI. Stop prompt injections, eliminate confident lies, and prevent catastrophic enterprise AI failures.',
  keywords: ['AI Security', 'LLM Firewall', 'Enterprise AI', 'Prompt Injection', 'AI Governance'],
  themeColor: '#060a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-[#060a0f]`}>
      <body className="font-sans antialiased bg-[#060a0f] text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
