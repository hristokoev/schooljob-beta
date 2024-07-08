import { MEDIA_FIELDS } from "./media"
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
  $salary: Float
  $employmentType: [Job_employmentType_Input]
  $education: [Job_education_Input]
  $language: [Job_language_Input]
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
        { locationType: { equals: $locationType } }
        { suitableFor__students: { equals: $students } }
        { suitableFor__mothersOnMaternityLeave: { equals: $mothersOnMaternityLeave } }
        { suitableFor__disabledPeople: { equals: $disabledPeople } }
        { suitableFor__retirees: { equals: $retirees } }
      ]
    }) {
    docs {
      id
      publicId
      slug
      status
      title
      ${SALARY}
      employmentType
      location
      createdAt
      featured
      applications {
        id
      }
      organization {
        slug
        title
        logo {
          ${MEDIA_FIELDS}
        }
        imageCover {
          ${MEDIA_FIELDS}
        }
      }
    }
  }
}
`

export const JOB = `
query Job($id: String, $slug: String, $publicId: Float, $status: String) {
  Jobs(
    limit: 1
    where: {
      id: { equals: $id }
      slug: { equals: $slug }
      publicId: { equals: $publicId }
      status: { equals: $status }
    }
  ) {
    docs {
      id
      publicId
      slug
			title
      salary {
        enabled
        range
        base
        minSalary
        maxSalary
        currency
        salaryType
      }
      employmentType
      locationType
      location
      education
      experience
      language
      suitableFor {
        students
        mothersOnMaternityLeave
        disabledPeople
        retirees
      }
      richText
      createdAt
      featured
      categories {
        id
        title
      }
      organization {
        id
        slug
        title
        logo {
          ${MEDIA_FIELDS}
        }
        imageCover {
          ${MEDIA_FIELDS}
        }
        description
        jobsPublished {
          id
        }
        location
      }
      skills
      certifications
      responsibilities
      benefits
    }
  }
}
`
