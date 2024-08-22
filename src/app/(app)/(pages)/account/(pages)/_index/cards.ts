// TODO: i18n

import { cs } from '@/translations'
import type { ProfileCardProps } from './Grid/ProfileCard/index'

const cardsCandidate: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.candidate.cards.card01.header,
    link: '/account/jobs/saved',
  },
  {
    icon: 'history',
    header: cs.candidate.cards.card02.header,
    link: '/account/applications',
  },
  {
    icon: 'settings',
    header: cs.candidate.cards.card03.header,
    link: '/account/settings',
  },
]

const cardsOrganization: ProfileCardProps[] = [
  {
    icon: 'heart',
    header: cs.organization.cards.card01.header,
    link: '/account/jobs/create',
  },
  {
    icon: 'history',
    header: cs.organization.cards.card02.header,
    link: '/account/jobs?status=published',
  },
  {
    icon: 'pencil',
    header: cs.organization.cards.card03.header,
    link: '/account/jobs?status=unpublished',
  },
  {
    icon: 'clock',
    header: cs.organization.cards.card04.header,
    link: '/account/applications',
  },
  {
    icon: 'settings',
    header: cs.organization.cards.card05.header,
    link: '/account/jobs?status=expired',
  },
  {
    icon: 'settings',
    header: cs.organization.cards.card06.header,
    link: '/account/settings',
  },
]

export { cardsCandidate, cardsOrganization }
