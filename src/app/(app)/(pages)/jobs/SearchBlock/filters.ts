import { type Filter } from '@/components'
import { educationOptions, employmentTypeOptions, experienceOptions, languageOptions, locationTypeOptions, salaryTypeOptions } from '@/payload/data'

const filters: Filter[] = [
    {
        slug: 'salary',
        text: 'Salary',
        searchable: false,
        options: salaryTypeOptions,
    },
    {
        slug: 'employmentType',
        text: 'Employment type',
        searchable: false,
        options: employmentTypeOptions,
    },
    {
        slug: 'education',
        text: 'Education',
        searchable: false,
        options: educationOptions,
    },
    {
        slug: 'experience',
        text: 'Experience',
        searchable: false,
        options: experienceOptions,
    },
    {
        slug: 'language',
        text: 'Language',
        searchable: false,
        options: languageOptions,
    },
    {
        slug: 'locationType',
        text: 'Location',
        searchable: false,
        options: locationTypeOptions,
    },
    {
        slug: 'suitableFor',
        text: 'Suitable for',
        searchable: false,
        options: [
            {
                label: 'Students',
                value: 'students',
            },
            {
                label: 'Mothers on maternity leave',
                value: 'mothersOnMaternityLeave',
            },
            {
                label: 'Disabled people',
                value: 'disabledPeople',
            },
            {
                label: 'Retirees',
                value: 'retirees',
            },
        ],
    },
]

export { filters }