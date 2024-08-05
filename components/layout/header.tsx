import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-20 ">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          {/* <Link
            href={'https://github.com/Kiranism/next-shadcn-dashboard-starter'}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link> */}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
