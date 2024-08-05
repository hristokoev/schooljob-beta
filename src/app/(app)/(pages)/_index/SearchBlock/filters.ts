import { useTranslations } from 'next-intl'

import { categoriesOptions, cz, educationOptions, employmentTypeOptions, experienceOptions, languageOptions, locationTypeOptions } from '@/payload/data'
import { type Filter } from '@/components'

const useFilters = (): Filter[] => {
    const t = useTranslations()

    return [
        {
            slug: 'location',
            text: t('search.location'),
            searchable: false,
            options: cz
        },
        {
            slug: 'categories',
            text: t('search.category'),
            searchable: false,
            options: categoriesOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.category'),
                value: option,
            }))
        },
        {
            slug: 'employmentType',
            text: t('search.employmentType'),
            searchable: false,
            options: employmentTypeOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.employmentType'),
                value: option,
            }))
        },
        {
            slug: 'education',
            text: t('search.education'),
            searchable: false,
            options: educationOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.education'),
                value: option,
            }))
        },
        {
            slug: 'experience',
            text: t('search.experience'),
            searchable: false,
            options: experienceOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.experience'),
                value: option,
            }))
        },
        {
            slug: 'language',
            text: t('search.language'),
            searchable: false,
            options: languageOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.language'),
                value: option,
            }))
        },
        {
            slug: 'locationType',
            text: t('search.locationType'),
            searchable: false,
            options: locationTypeOptions.map(option => ({
                label: t(`search.options.${option}` as 'search.locationType'),
                value: option,
            }))
        },
        {
            slug: 'suitableFor',
            text: t('search.suitableFor'),
            searchable: false,
            options: [
                {
                    label: t('search.options.students'),
                    value: 'students',
                },
                {
                    label: t('search.options.mothersOnMaternityLeave'),
                    value: 'mothersOnMaternityLeave',
                },
                {
                    label: t('search.options.disabledPeople'),
                    value: 'disabledPeople',
                },
                {
                    label: t('search.options.retirees'),
                    value: 'retirees',
                },
            ],
        },
    ]
}

export { useFilters }
