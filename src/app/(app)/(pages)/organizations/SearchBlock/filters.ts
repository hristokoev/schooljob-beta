import { useTranslations } from 'next-intl'

import { categoriesOptions, cz } from '@/payload/data'
import { type Filter } from '@/components'

const useFilters = (): Filter[] => {
    const t = useTranslations()

    return [
        {
            slug: 'categories',
            text: t('search.category'),
            searchable: true,
            options: categoriesOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.category'),
                value: option,
            }))
        },
        {
            slug: 'location',
            text: t('search.location'),
            searchable: true,
            options: cz,
        }

    ]
}

export { useFilters }
