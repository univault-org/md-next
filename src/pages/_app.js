import '../styles/global.css'
import { IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Navigation from '../components/layout/Navigation' 
import Footer from '../components/layout/Footer' 
import { useRouter } from 'next/router'
// Initialize IBM Plex Mono
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isDeclarationRoute = router.pathname.startsWith('/declaration')

  return (
    <ThemeProvider attribute="class">
      <Head>
        {/* Default meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Default SEO */}
        <meta name="description" content={pageProps.description || "Univault - Personal Data Sovereignty in the AI Era"} />
        <meta name="keywords" content="personal data, digital identity, AI, data sovereignty" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Univault" />
        <meta property="og:title" content={pageProps.title || "Univault"} />
        <meta property="og:description" content={pageProps.description || "Personal Data Sovereignty in the AI Era"} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageProps.title || "Univault"} />
        <meta name="twitter:description" content={pageProps.description || "Personal Data Sovereignty in the AI Era"} />
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