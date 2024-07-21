import { type Filter } from '@/components'
import { categoriesOptions } from '@/payload/data'

const filters: Filter[] = [
    {
        slug: 'categories',
        text: 'Category',
        searchable: true,
        options: categoriesOptions,
    },
]

export { filters }