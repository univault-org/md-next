import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Copyright */}
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Univault Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}