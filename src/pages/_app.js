import '../styles/global.css'
import { IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Navigation from '../components/layout/Navigation' 
import Footer from '../components/layout/Footer' 
import { useRouter } from 'next/router'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isDeclarationRoute = router.pathname.startsWith('/declaration')
  const isWhiteboardRoute = router.pathname === '/whiteboard'
  const canonicalUrl = `https://univault.org${router.asPath}`

  // For whiteboard, render without layout
  if (isWhiteboardRoute) {
    return (
      <ThemeProvider attribute="class">
        <Head>
          {/* Basic Meta */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta name="theme-color" content="#6366F1" />
        </Head>
        <div className={`${ibmPlexMono.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class">
      <Head>
        {/* Basic Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Enhanced SEO Meta */}
        <meta name="description" content={pageProps.description || "Univault empowers individual data sovereignty through digital organization, AI data protection, and quantum-safe privacy solutions."} />
        <meta name="keywords" content="data sovereignty, personal AI, digital identity, quantum privacy, SRPT protocol, digital organization, data protection, digital legacy" />
        <meta name="author" content="Univault Technologies" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Univault" />
        <meta property="og:title" content={pageProps.title || "Univault - Universal Personal Data Vault"} />
        <meta property="og:description" content={pageProps.description || "Empowering individual data sovereignty through advanced AI and quantum-safe technology."} />
        <meta property="og:image" content="https://univault.org/og-image.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@univault" />
        <meta name="twitter:title" content={pageProps.title || "Univault - Universal Personal Data Vault"} />
        <meta name="twitter:description" content={pageProps.description || "Empowering individual data sovereignty through advanced AI and quantum-safe technology."} />
        <meta name="twitter:image" content="https://univault.org/og-image.jpg" />
        
        {/* Additional Meta */}
        <meta name="theme-color" content="#6366F1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>

      <div className={`min-h-screen flex flex-col ${ibmPlexMono.variable}`}>
        <Navigation />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {!isDeclarationRoute && <Footer />}
      </div>
    </ThemeProvider>
  )
}