import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResumeATS - Get Past the Robots, Land the Interview',
  description: 'ResumeATS uses AI to optimize your resume for Applicant Tracking Systems. Beat the bots and get 3x more interviews.',
  keywords: 'ResumeATS, resume, ATS, applicant tracking system, job search, resume optimization, AI resume',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

