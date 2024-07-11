'use client'

import React, { useEffect, useState } from 'react'

import { cardsCandidate, cardsOrganization } from '../cards'
import { ProfileCard, ProfileCardProps } from './ProfileCard'
import { useAuth } from '@/providers'
import { ProfileCardSkeleton } from './ProfileCard/Skeleton'

const Grid: React.FC = () => {
  const { user } = useAuth()
  const [cards, setCards] = useState<ProfileCardProps[]>([])

  useEffect(() => {
    if (user?.role === 'candidate') {
      setCards(cardsCandidate)
    } else if (user?.role === 'organization') {
      setCards(cardsOrganization)
    }
  }, [user])

  return (
    <div className="grid grid-cols-12 gap-4">
      {user
        ? cards.map((card, index) => (
            <ProfileCard
              key={index}
              icon={card.icon}
              header={card.header}
              title={card.title}
              link={card.link}
              content={card.content}
            />
          ))
        : Array.from({ length: 3 }).map((_, index) => <ProfileCardSkeleton key={index} />)}
    </div>
  )
}

export { Grid }
