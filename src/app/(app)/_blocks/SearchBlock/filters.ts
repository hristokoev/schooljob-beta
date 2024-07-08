import { type Filter } from '@/components'

const filters: Filter[] = [
    {
        slug: 'salary',
        text: 'Salary',
        options: [
            {
                label: '15 000+ CZK',
                value: '15000',
            },
            {
                label: '20 000+ CZK',
                value: '20000',
            },
            {
                label: '25 000+ CZK',
                value: '25000',
            },
            {
                label: '30 000+ CZK',
                value: '30000',
            },
            {
                label: '40 000+ CZK',
                value: '40000',
            },
            {
                label: '50 000+ CZK',
                value: '50000',
            },
        ],
    },
    {
        slug: 'employmentType',
        text: 'Employment type',
        options: [
            {
                label: 'Full-time',
                value: 'fulltime',
            },
            {
                label: 'Part-time',
                value: 'parttime',
            },
            {
                label: 'Contract',
                value: 'contract',
            },
            {
                label: 'Temporary',
                value: 'temporary',
            },
            {
                label: 'Internship',
                value: 'internship',
            },
            {
                label: 'Volunteer',
                value: 'volunteer',
            },
            {
                label: 'Apprenticeship',
                value: 'apprenticeship',
            },
            {
                label: 'Seasonal',
                value: 'seasonal',
            },
            {
                label: 'Freelance',
                value: 'freelance',
            },
        ],
    },
    {
        slug: 'education',
        text: 'Education',
        options: [
            {
                label: 'High School',
                value: 'highSchool',
            },
            {
                label: 'Associate Degree',
                value: 'associateDegree',
            },
            {
                label: "Bachelor's Degree",
                value: 'bachelorsDegree',
            },
            {
                label: "Master's Degree",
                value: 'mastersDegree',
            },
            {
                label: 'Doctoral Degree',
                value: 'doctoralDegree',
            },
            {
                label: 'Professional Degree',
                value: 'professionalDegree',
            },
        ],
    },
    {
        slug: 'experience',
        text: 'Experience',
        options: [
            {
                label: 'No experience',
                value: 'noExperience',
            },
            {
                label: 'Less than 1 year',
                value: 'lessThanOneYear',
            },
            {
                label: '1-2 years',
                value: 'oneTwoYears',
            },
            {
                label: '2-3 years',
                value: 'twoThreeYears',
            },
            {
                label: '3-5 years',
                value: 'threeFiveYears',
            },
            {
                label: '5-10 years',
                value: 'fiveTenYears',
            },
            {
                label: '10+ years',
                value: 'tenPlusYears',
            },
        ],
    },
    {
        slug: 'language',
        text: 'Language',
        options: [
            {
                label: 'Czech',
                value: 'cs',
            },
            {
                label: 'English',
                value: 'en',
            },
            {
                label: 'German',
                value: 'de',
            },
        ],
    },
    {
        slug: 'locationType',
        text: 'Location',
        options: [
            {
                label: 'Remote',
                value: 'remote',
            },
            {
                label: 'Onsite',
                value: 'onsite',
            },
            {
                label: 'Hybrid',
                value: 'hybrid',
            },
        ],
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