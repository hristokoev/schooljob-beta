'use client'

import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'
import { toast } from 'sonner'

import { Button } from '@/components'

const Favorite: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    /*
    TODO: Implement handleFavoriteClick for Favorite
    */
    e.preventDefault()

    if (isFavorite) {
      toast.success('Removed from favorites!')
    } else {
      toast.success('Added to favorites!')
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`p-2 ${
        isFavorite ? 'text-rose-500' : 'text-slate-500'
      } transition-colors duration-150 ease-in-out`}
      onClick={handleFavoriteClick}
    >
      <HeartIcon className="size-6" />
    </Button>
  )
}

export { Favorite }
