import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PackPal',
  description: 'Seamless tracking and efficient delivery across all transport modes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
