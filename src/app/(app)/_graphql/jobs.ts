import { SALARY } from "./salary"

export const JOBS_STATIC_PARAMS = `
query Jobs {
  Jobs(limit: 300) {
    docs {
      publicId
      slug
    }
  }
}
`

export const JOBS = `
query Jobs(
  $limit: Int
  $page: Int
  $sort: String
  $status: String
  $featured: Boolean
  $createdAt: DateTime
  $title: String
  $organization: JSON
  $categories: [Job_categories_Input]
  $salary: Float
  $employmentType: [Job_employmentType_Input]
  $education: [Job_education_Input]
  $language: [Job_language_Input]
  $location: [Job_location_Input]
  $locationType: Job_locationType_Input
  $students: Boolean
  $mothersOnMaternityLeave: Boolean
  $disabledPeople: Boolean
  $retirees: Boolean
) {
  Jobs(
    limit: $limit
    page: $page
    sort: $sort
    where: {
      AND: [
        { status: { equals: $status } }
        { featured: { equals: $featured } }
        { createdAt: { greater_than: $createdAt } }
        { title: { contains: $title } }
        { organization: { equals: $organization } }
        { categories: { all: $categories } }
        {
          OR: [
            {
              AND: [
                { salary__enabled: { equals: true } }
                { salary__range: { equals: false } }
                { salary__base: { greater_than_equal: $salary } }
              ]
            }
            {
              AND: [
                { salary__enabled: { equals: true } }
                { salary__range: { equals: true } }
                { salary__minSalary: { greater_than_equal: $salary } }
              ]
            }
          ]
        }
        { employmentType: { all: $employmentType } }
        { education: { all: $education } }
        { language: { all: $language } }
        { location: { all: $location } }
        { locationType: { equals: $locationType } }
        { suitableFor__students: { equals: $students } }
        { suitableFor__mothersOnMaternityLeave: { equals: $mothersOnMaternityLeave } }
        { suitableFor__disabledPeople: { equals: $disabledPeople } }
        { suitableFor__retirees: { equals: $retirees } }
      ]
    }) {
    docs {
      publicId
      slug
      title
      ${SALARY}
      employmentType
      createdAt
      featured
      organization {
        title
      }
    }
  }
}
`
