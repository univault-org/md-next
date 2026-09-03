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

const SITE_URL = 'https://univault.org'
// PAI-era residue: kept for history, taken out of the index (entity plan 2026-09-03).
const NOINDEX_PREFIXES = ['/paiTraining', '/declaration', '/northStar', '/projects', '/whiteboard', '/code-editor-demo'];
const DEFAULT_DESCRIPTION = 'Univault Technologies is an AI research company in Salt Lake City, Utah. We build AI infrastructure that asks instead of guesses, and help teams apply it to work where "probably" is not good enough.'
const DEFAULT_IMAGE = `${SITE_URL}/images/paragon-reflex-bench.jpg`

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isDeclarationRoute = router.pathname.startsWith('/declaration')
  const isWhiteboardRoute = router.pathname === '/whiteboard'
  const canonicalUrl = `${SITE_URL}${router.asPath === '/' ? '/' : router.asPath}`

  // For whiteboard, render without layout
  if (isWhiteboardRoute) {
    return (
      <ThemeProvider attribute="class">
        <Head>
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href={canonicalUrl} />

        {NOINDEX_PREFIXES.some((x) => (router.pathname || "").startsWith(x)) && <meta name="robots" content="noindex,nofollow" />}
        {/* Default SEO */}
        <meta name="description" content={pageProps.description || DEFAULT_DESCRIPTION} />
        <meta name="keywords" content="AI research, AI infrastructure, calibrated abstention, AI evaluation, expense automation, hiring evidence, agent workloads, Salt Lake City, Utah" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Univault Technologies" />
        <meta property="og:title" content={pageProps.title || "Univault Technologies LLC | Builders of Paragon Reflex"} />
        <meta property="og:description" content={pageProps.description || DEFAULT_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageProps.title || "Univault Technologies"} />
        <meta name="twitter:description" content={pageProps.description || DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_IMAGE} />

        {/* Analytics */}
        <script defer src="https://mirrorai-api.amitacompany.workers.dev/t.js" data-site="sb_univault_org_01" />
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
