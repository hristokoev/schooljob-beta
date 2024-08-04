// TODO: i18n

import type { ProfileCardProps } from './Grid/ProfileCard/index'

import { cs } from '@/translations'

const cardsCandidate: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.candidate.cards.card01.header,
    title: cs.candidate.cards.card01.title,
    link: '/account/jobs/saved',
    content: cs.candidate.cards.card01.content,
  },
  {
    icon: 'history',
    header: cs.candidate.cards.card02.header,
    title: cs.candidate.cards.card02.title,
    link: '/account/applications',
    content: cs.candidate.cards.card02.content,
  },
  {
    icon: 'settings',
    header: cs.candidate.cards.card03.header,
    title: cs.candidate.cards.card03.title,
    link: '/account/settings',
    content: cs.candidate.cards.card03.content,
  },
]

const cardsOrganization: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.organization.cards.card01.header,
    title: cs.organization.cards.card01.title,
    link: '/account/jobs/create',
    content: cs.organization.cards.card01.content,
  },
  {
    icon: 'history',
    header: cs.organization.cards.card02.header,
    title: cs.organization.cards.card02.title,
    link: '/account/jobs?status=published',
    content: cs.organization.cards.card02.content,
  },
  {
    icon: 'pencil',
    header: cs.organization.cards.card03.header,
    title: cs.organization.cards.card03.title,
    link: '/account/jobs?status=unpublished',
    content: cs.organization.cards.card03.content,
  },
  {
    icon: 'history',
    header: cs.organization.cards.card04.header,
    title: cs.organization.cards.card04.title,
    link: '/account/applications',
    content: cs.organization.cards.card04.content,
  },
  {
    icon: 'settings',
    header: cs.organization.cards.card05.header,
    title: cs.organization.cards.card05.title,
    link: '/account/settings',
    content: cs.organization.cards.card05.content,
  },
  {
    icon: 'account',
    header: cs.organization.cards.card06.header,
    title: cs.organization.cards.card06.title,
    link: '/account/settings/profile',
    content: cs.organization.cards.card06.content,
  },
]

export { cardsCandidate, cardsOrganization }