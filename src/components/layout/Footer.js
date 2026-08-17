import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="https://bees.riif.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Bees (partner access)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">About</Link></li>
              <li><Link href="/research" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Research</Link></li>
              <li><Link href="/updates" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Updates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Research</h3>
            <ul className="space-y-2">
              <li><Link href="/research" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Research areas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/univault-org" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">GitHub</a></li>
              <li><a href="mailto:phil@univault.org" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/nvidia-inception-program-badge.svg"
              alt="NVIDIA Inception Program"
              width={500}
              height={216}
              className="block w-[140px] h-auto"
              style={{ margin: '6px 0' }}
            />
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 text-center">
              Univault Technologies LLC is a member of the NVIDIA Inception program.
            </p>
            <p className="mt-2 max-w-2xl text-center text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              &copy; 2025 NVIDIA, the NVIDIA logo, and Jetson are trademarks and/or registered
              trademarks of NVIDIA Corporation in the U.S. and other countries.
            </p>
          </div>
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Univault Technologies LLC. All rights reserved. Salt Lake City, Utah.
          </p>
        </div>
      </div>
    </footer>
  )
}
