import type { ProfileCardProps } from './Grid/ProfileCard/index'

import { cs } from '@/translations'

const cardsCandidate: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.profile.candidate.cards.card01.header,
    title: cs.profile.candidate.cards.card01.title,
    link: '/account/jobs/saved',
    content: cs.profile.candidate.cards.card01.content,
  },
  {
    icon: 'history',
    header: 'Applications',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/applications',
    content: cs.profile.candidate.cards.card02.content,
  },
  {
    icon: 'settings',
    header: 'Account Settings',
    title: 'Lorem ipsum dolor sit.',
    link: '/account/settings',
    content: cs.profile.candidate.cards.card03.content,
  },
]

const cardsOrganization: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.profile.organization.cards.card01.header,
    title: cs.profile.organization.cards.card01.title,
    link: '/account/jobs/create',
    content: cs.profile.organization.cards.card01.content,
  },
  {
    icon: 'history',
    header: cs.profile.organization.cards.card02.header,
    title: cs.profile.organization.cards.card02.title,
    link: '/account/jobs?status=published',
    content: cs.profile.organization.cards.card02.content,
  },
  {
    icon: 'pencil',
    header: cs.profile.organization.cards.card03.header,
    title: cs.profile.organization.cards.card03.title,
    link: '/account/jobs?status=unpublished',
    content: cs.profile.organization.cards.card03.content,
  },
  {
    icon: 'history',
    header: cs.profile.organization.cards.card04.header,
    title: cs.profile.organization.cards.card04.title,
    link: '/account/applications',
    content: cs.profile.organization.cards.card04.content,
  },
  {
    icon: 'settings',
    header: cs.profile.organization.cards.card05.header,
    title: cs.profile.organization.cards.card05.title,
    link: '/account/settings',
    content: cs.profile.organization.cards.card05.content,
  },
  {
    icon: 'account',
    header: cs.profile.organization.cards.card06.header,
    title: cs.profile.organization.cards.card06.title,
    link: '/account/settings/profile',
    content: cs.profile.organization.cards.card06.content,
  },
]

export { cardsCandidate, cardsOrganization }