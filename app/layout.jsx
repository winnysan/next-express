import './globals.css'
import ReduxProvider from './redux/provider'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <Link href="/upload">Upload</Link>
            </li>
          </ul>
          {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
