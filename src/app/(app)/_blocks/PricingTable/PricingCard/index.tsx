'use client'

import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Membership } from '@payload-types'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { CardOptions } from './CardOptions'
import { createOrder } from '@/actions'
import { formatCurrency } from '@/utilities/formatSalary'
import { useAuth } from '@/providers'

const PricingCard: React.FC<Membership> = membership => {
  const t = useTranslations()
  const { id, title, price, currency, description, features, featured, discount } = membership
  const { user } = useAuth()
  const [selected, setSelected] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const getPriceFromSelected = (price: number): string => {
    if (!selected || !discount) {
      return formatCurrency({ currency, value: price })
    }

    const selectedDiscount = discount.find(item => item.id === selected)

    if (!selectedDiscount) {
      return formatCurrency({ currency, value: price })
    }

    const discountedPrice = price * (1 - selectedDiscount.discount / 100)
    const totalPrice = discountedPrice * selectedDiscount.count

    return formatCurrency({ currency, value: totalPrice })
  }

  const onSubmit = useCallback(() => {
    toast.promise(
      createOrder(
        {
          membership: id,
          quantity,
        },
        user,
      ),
      {
        loading: t('membership.loading'),
        success: t('membership.success'),
        error: t('membership.error'),
      },
    )
  }, [selected, quantity])

  useEffect(() => {
    if (discount) {
      setQuantity(discount.find(item => item.id === selected)?.count || 1)
    }
  }, [discount, selected])

  return (
    <div
      className={`relative flex h-full flex-col rounded-lg border border-slate-200 bg-white/70 p-6 shadow-lg shadow-black/[0.05] backdrop-blur-sm ${
        featured ? 'bg-gradient-to-tr from-gray-900 to-gray-700' : 'bg-white/70'
      }`}
    >
      <div className="mb-4">
        <div
          className={`mb-1 font-medium ${
            featured
              ? 'text-gray-200 underline decoration-gray-600 underline-offset-4'
              : 'underline decoration-gray-300 underline-offset-4'
          }`}
        >
          {title}
        </div>
        <div
          className={`mb-4 flex items-baseline border-b border-dashed ${featured ? 'border-gray-600' : 'border-gray-300'} pb-4`}
        >
          <span className={`text-4xl font-bold tabular-nums ${featured ? 'text-gray-200' : ''}`}>
            {price}
          </span>
          <span className={`text-xl font-bold uppercase ${featured ? 'text-gray-200' : ''}`}>
            {currency}
          </span>
        </div>
        <div className={`grow text-sm ${featured ? 'text-gray-300' : 'text-gray-700'}`}>
          {description}
        </div>
      </div>
      <ul className="mb-4 grow space-y-2 text-sm">
        {features.map(feature => (
          <li
            key={feature}
            className={`flex items-center ${featured ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <svg
              className="mr-2 h-3 w-3 shrink-0 fill-current text-emerald-500"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {discount && (
        <Fragment>
          <div
            className={`mb-3 text-sm font-semibold ${featured ? 'text-slate-100' : 'text-slate-800'}`}
          >
            {t('membership.selectPackage')}
          </div>
          <CardOptions membership={membership} selected={selected} setSelected={setSelected} />
        </Fragment>
      )}
      <div className="mb-4">
        <Button variant={featured ? 'secondary' : 'default'} className="w-full" onClick={onSubmit}>
          {t('membership.getNow')} - {getPriceFromSelected(price)}
        </Button>
      </div>
      <div className="text-center text-xs italic text-slate-500">{t('membership.footer')}</div>
    </div>
  )
}

export { PricingCard }
