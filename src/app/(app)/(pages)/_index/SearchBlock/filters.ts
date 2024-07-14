import { type Filter } from '@/components'
import { educationOptions, employmentTypeOptions, experienceOptions, languageOptions, locationTypeOptions, salaryTypeOptions } from '@/payload/data'

const filters: Filter[] = [
    {
        slug: 'salary',
        text: 'Salary',
        options: salaryTypeOptions,
    },
    {
        slug: 'employmentType',
        text: 'Employment type',
        options: employmentTypeOptions,
    },
    {
        slug: 'education',
        text: 'Education',
        options: educationOptions,
    },
    {
        slug: 'experience',
        text: 'Experience',
        options: experienceOptions,
    },
    {
        slug: 'language',
        text: 'Language',
        options: languageOptions,
    },
    {
        slug: 'locationType',
        text: 'Location',
        options: locationTypeOptions,
    },
    {
        slug: 'suitableFor',
        text: 'Suitable for',
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