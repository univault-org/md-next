import Head from "next/head";
// Retired route (2026-09-03). Univault Technologies builds Paragon Reflex; the PAI-era pages are off the live site.
export default function Retired() {
  return (
    <>
      <Head>
        <title>Retired | Univault Technologies</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta httpEquiv="refresh" content="0; url=/paragon-reflex/" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-20 text-lg text-neutral-600 dark:text-neutral-300">
        This page was retired. Univault Technologies builds <a href="https://paragonreflex.com" className="underline">Paragon Reflex</a>. <a href="/" className="underline">Continue to the home page.</a>
      </main>
    </>
  );
}
