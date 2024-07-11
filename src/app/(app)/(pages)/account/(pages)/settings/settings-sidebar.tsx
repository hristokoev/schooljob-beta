'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="no-scrollbar flex min-w-[15rem] flex-nowrap overflow-x-scroll border-b border-slate-200 px-3 py-6 md:block md:space-y-3 md:overflow-auto md:border-b-0 md:border-r">
      <div>
        <div className="mb-3 text-xs font-semibold uppercase text-slate-400">Business settings</div>
        <ul className="mr-3 flex flex-nowrap md:mr-0 md:block">
          <li className="mr-0.5 md:mb-0.5 md:mr-0">
            <Link
              href="/account/settings"
              className={`flex items-center whitespace-nowrap rounded px-2.5 py-2 ${/\/account\/settings$/.test(pathname) && 'bg-royal-blue-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`mr-2 h-6 w-6 shrink-0 ${/\/account\/settings$/.test(pathname) ? 'text-white' : 'text-slate-400'}`}
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span
                className={`text-sm font-medium ${/\/account\/settings$/.test(pathname) ? 'text-white' : 'hover:text-slate-700:text-slate-200 text-slate-600'}`}
              >
                Account
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mb-0.5 md:mr-0">
            <Link
              href="/account/settings/profile"
              className={`flex items-center whitespace-nowrap rounded px-2.5 py-2 ${pathname.includes('/account/settings/profile') && 'bg-royal-blue-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`mr-2 h-6 w-6 shrink-0 ${pathname.includes('/account/settings/profile') ? 'text-white' : 'text-slate-400'}`}
              >
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                <path d="M22 10v6" />
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
              </svg>
              <span
                className={`text-sm font-medium ${pathname.includes('/account/settings/profile') ? 'text-white' : 'hover:text-slate-700:text-slate-200 text-slate-600'}`}
              >
                Profile
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mb-0.5 md:mr-0">
            <Link
              href="/account/settings/notifications"
              className={`flex items-center whitespace-nowrap rounded px-2.5 py-2 ${pathname.includes('/account/settings/notifications') && 'bg-royal-blue-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`mr-2 h-6 w-6 shrink-0 ${pathname.includes('/account/settings/notifications') ? 'text-white' : 'text-slate-400'}`}
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span
                className={`text-sm font-medium ${pathname.includes('/account/settings/notifications') ? 'text-white' : 'hover:text-slate-700:text-slate-200 text-slate-600'}`}
              >
                Notifications
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="mb-3 text-xs font-semibold uppercase text-slate-400">Experience</div>
        <ul className="mr-3 flex flex-nowrap md:mr-0 md:block">
          <li className="mr-0.5 md:mb-0.5 md:mr-0">
            <Link
              href="/account/settings/feedback"
              className={`flex items-center whitespace-nowrap rounded px-2.5 py-2 ${pathname.includes('/account/settings/feedback') && 'bg-royal-blue-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`mr-2 h-6 w-6 shrink-0 ${pathname.includes('/account/settings/feedback') ? 'text-white' : 'text-slate-400'}`}
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7" />
              </svg>
              <span
                className={`text-sm font-medium ${pathname.includes('/account/settings/feedback') ? 'text-white' : 'hover:text-slate-700:text-slate-200 text-slate-600'}`}
              >
                Give Feedback
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
