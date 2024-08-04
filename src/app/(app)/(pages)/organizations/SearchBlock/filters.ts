import { useTranslations } from 'next-intl'

import { type Filter } from '@/components'
import { categoriesOptions } from '@/payload/data'

const useFilters = (): Filter[] => {
    const t = useTranslations()

    return [{
        slug: 'categories',
        text: 'Category',
        searchable: true,
        options: categoriesOptions.map(option => ({
            label: t(`search.options.${option}` as 'search.category'),
            value: option,
        }))
    }]
}

export { useFilters }