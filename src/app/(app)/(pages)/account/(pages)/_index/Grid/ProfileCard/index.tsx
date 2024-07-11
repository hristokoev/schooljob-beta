import {
  ArrowRightIcon,
  BookmarkSquareIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HeartIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

interface ProfileCardProps {
  icon: 'account' | 'chat' | 'envelope' | 'heart' | 'history' | 'pencil' | 'settings'
  header: string
  title: string
  link: string
  content: string
}

const Icon = ({ icon }: { icon: string }) => {
  const className = 'size-6'

  switch (icon) {
    case 'account':
      return <UserIcon className={className} />
    case 'chat':
      return <ChatBubbleLeftRightIcon className={className} />
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

const ProfileCard = ({ icon, header, title, link, content }: ProfileCardProps) => {
  return (
    <div className="group col-span-full rounded-md border border-slate-300 bg-white transition duration-100 ease-in-out hover:border-royal-blue-300 hover:bg-slate-50 sm:col-span-6 xl:col-span-4">
      <Link className="flex h-full flex-col p-5" href={link}>
        <header>
          <div className="flex items-center rounded-md bg-royal-blue-500 px-4 py-3 text-royal-blue-50">
            <Icon icon={icon} />
            <h3 className="text-md ml-3 font-semibold leading-snug">{header}</h3>
            <ArrowRightIcon className="ml-auto size-5 text-white duration-150 ease-in-out group-hover:translate-x-1" />
          </div>
        </header>
        <div className="mt-4 grow">
          <div className="mb-1 inline-flex text-slate-800 hover:text-slate-900">
            <h4 className="font-semibold leading-snug">{title}</h4>
          </div>
          <div className="text-sm">{content}</div>
        </div>
      </Link>
    </div>
  )
}

export { ProfileCard, type ProfileCardProps }
