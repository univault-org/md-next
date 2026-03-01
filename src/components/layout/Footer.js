import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="https://bagle.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">BAGLE Encoder</a></li>
              <li><a href="https://paragondao.org" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">ParagonDAO Network</a></li>
              <li><a href="https://paragondao.org/verify" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Verification Hub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">About</Link></li>
              <li><Link href="/research" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Research</Link></li>
              <li><Link href="/updates" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Publications</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Research</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/paragon-dao/eeg-foundation-challenge-2025" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">EEG Challenge 2025</a></li>
              <li><a href="https://paragondao.org/docs/THE_HEALTH_ECONOMY.html" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Whitepaper</a></li>
              <li><a href="https://paragondao.org/learn" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Learn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/univault-org" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">GitHub</a></li>
              <li><a href="mailto:contact@univault.org" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Univault Technologies LLC. All rights reserved. Salt Lake City, Utah.
          </p>
        </div>
      </div>
    </footer>
  )
}
