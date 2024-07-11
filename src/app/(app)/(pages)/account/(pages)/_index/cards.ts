import type { ProfileCardProps } from './Grid/ProfileCard/index'

const cardsCandidate: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: 'Saved Jobs',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/jobs/saved',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'history',
    header: 'Applications',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/applications',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'settings',
    header: 'Account Settings',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/settings',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
]

const cardsOrganization: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: 'Create a Job',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/jobs/create',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'history',
    header: 'Active Jobs',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/jobs?status=published',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'pencil',
    header: 'Drafts',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/jobs?status=unpublished',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'history',
    header: 'Applications',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/applications',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'settings',
    header: 'Account Settings',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/settings',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
  {
    icon: 'account',
    header: 'Profile Settings',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/settings/profile',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
  },
]

export { cardsCandidate, cardsOrganization }