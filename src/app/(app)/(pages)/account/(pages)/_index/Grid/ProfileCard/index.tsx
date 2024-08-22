import {
  ArrowRightIcon,
  BookmarkSquareIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HeartIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

interface ProfileCardProps {
  icon: 'account' | 'chat' | 'clock' | 'envelope' | 'heart' | 'history' | 'pencil' | 'settings'
  header: string
  link: string
}

const Icon = ({ icon }: { icon: string }) => {
  const className = 'size-6'

  switch (icon) {
    case 'account':
      return <UserIcon className={className} />
    case 'chat':
      return <ChatBubbleLeftRightIcon className={className} />
    case 'clock':
      return <ClockIcon className={className} />
    case 'envelope':
      return <EnvelopeIcon className={className} />
    case 'heart':
      return <HeartIcon className={className} />
    case 'history':
      return <BookmarkSquareIcon className={className} />
    case 'pencil':
      return <PencilIcon className={className} />
    case 'settings':
      return <Cog6ToothIcon className={className} />
    default:
      return null
  }
}

const ProfileCard = ({ icon, header, link }: ProfileCardProps) => {
  return (
    <div className="group col-span-full rounded-md sm:col-span-6 xl:col-span-4">
      <Link className="flex h-full flex-col" href={link}>
        <header>
          <div className="flex items-center rounded-md bg-royal-blue-500 px-4 py-6 text-royal-blue-50 transition duration-100 ease-in-out group-hover:bg-white group-hover:text-slate-800 group-hover:shadow-sm">
            <Icon icon={icon} />
            <h3 className="text-md ml-3 font-semibold leading-snug">{header}</h3>
            <ArrowRightIcon className="ml-auto size-6 stroke-2 text-white transition duration-100 ease-in-out group-hover:text-slate-800" />
          </div>
        </header>
      </Link>
    </div>
  )
}

export { ProfileCard, type ProfileCardProps }
