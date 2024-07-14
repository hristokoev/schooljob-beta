/*
  TODO: Reuse data from ./src/app/(payload)/_data/ instead of duplicating it here.
*/

const convertValue = (type: string): string => {
  const typeMapping: { [key: string]: string } = {
    // categories
    'category-1': 'Category 1',
    'category-2': 'Category 2',
    'category-3': 'Category 3',
    // employmentType
    fulltime: 'Full Time',
    parttime: 'Part Time',
    contract: 'Contract',
    temporary: 'Temporary',
    internship: 'Internship',
    volunteer: 'Volunteer',
    apprenticeship: 'Apprenticeship',
    seasonal: 'Seasonal',
    freelance: 'Freelance',
    // locationType
    remote: 'Remote',
    onsite: 'Onsite',
    hybrid: 'Hybrid',
    // education
    highSchool: 'High School',
    associateDegree: 'Associate Degree',
    bachelorsDegree: "Bachelor's Degree",
    mastersDegree: "Master's Degree",
    doctoralDegree: 'Doctoral Degree',
    professionalDegree: 'Professional Degree',
    noEducation: 'No education',
    // experience
    noExperience: 'No experience',
    lessThanOneYear: 'Less than 1 year',
    oneTwoYears: '1-2 years',
    twoThreeYears: '2-3 years',
    threeFiveYears: '3-5 years',
    fiveTenYears: '5-10 years',
    tenPlusYears: '10+ years',
    // salaryType
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    monthly: 'Monthly',
    annually: 'Annually',
    // currency
    czk: 'CZK',
    eur: 'EUR',
    // status
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    published: 'Published',
    unpublished: 'Unpublished',
    // language
    sq: 'Albanian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    fi: 'Finnish',
    fr: 'French',
    de: 'German',
    el: 'Greek',
    hu: 'Hungarian',
    it: 'Italian',
    no: 'Norwegian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sr: 'Serbian',
    sk: 'Slovak',
    es: 'Spanish',
    sv: 'Swedish',
    tr: 'Turkish',
    uk: 'Ukrainian',
    // suitableFor
    students: 'Students',
    mothersOnMaternityLeave: 'Mothers on Maternity Leave',
    disabledPeople: 'Disabled People',
    retirees: 'Retirees',
  };

  return typeMapping[type] || 'Unknown';
};

export { convertValue };
